import { spawn, spawnSync } from "node:child_process";
import { access } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ticket = process.argv[2] ?? "TCK-123";
const dryRun = process.argv.includes("--dry-run");
if (!/^[A-Z]+-\d+$/.test(ticket)) throw new Error("ticket id invalide");
const spec = resolve(`docs/stories/${ticket}/spec.md`);
await access(spec);

// The headless run may only change production code: tests and evidence stay under human control.
const EDITABLE_PREFIX = "src/";

const schema = JSON.stringify({
  type: "object",
  properties: {
    status: { enum: ["ready_for_verify", "blocked"] },
    summary: { type: "string" },
    evidence: { type: "array", items: { type: "string" } }
  },
  required: ["status", "summary", "evidence"],
  additionalProperties: false
});

const prompt = `Traite ${ticket}. La Truth est ${spec}. Respecte CLAUDE.md. Tu ne peux modifier que ${EDITABLE_PREFIX}. Ne conclus pas sur déclaration : la vérification déterministe sera exécutée après ton run.`;
const args = [
  "-p", prompt,
  "--output-format", "json",
  "--json-schema", schema,
  "--max-turns", "8",
  "--setting-sources", "project",
  "--settings", ".claude/settings.sandbox.json",
  "--permission-mode", "dontAsk",
  "--permission-prompts", "none",
  "--tools", "Read,Edit,Bash",
  "--disallowedTools", "mcp__*,Edit(./tests/**),Edit(./evidence/**),Read(./.env),Read(./.env.*)",
  "--allowedTools", `Read,Edit(./${EDITABLE_PREFIX}**),Bash(npm test),Bash(npm run verify)`
];

if (dryRun) {
  console.log(JSON.stringify({ command: "claude", args, truth: `docs/stories/${ticket}/spec.md`, verification: "npm run verify" }, null, 2));
  process.exit(0);
}

// Windows: Node cannot spawn the npm `claude.cmd` shim without a shell, so resolve the real executable.
function resolveClaude() {
  if (process.env.CLAUDE_BIN) return process.env.CLAUDE_BIN;
  if (process.platform !== "win32") return "claude";
  const found = spawnSync("where.exe", ["claude"], { encoding: "utf8" }).stdout?.split(/\r?\n/).filter(Boolean) ?? [];
  const exe = found.find((p) => p.toLowerCase().endsWith(".exe"));
  if (exe) return exe;
  for (const shim of found.filter((p) => p.toLowerCase().endsWith(".cmd"))) {
    const npmExe = join(dirname(shim), "node_modules", "@anthropic-ai", "claude-code", "bin", "claude.exe");
    if (existsSync(npmExe)) return npmExe;
  }
  throw new Error("exécutable Claude Code introuvable : installez-le ou définissez CLAUDE_BIN");
}

function changedPaths() {
  const out = spawnSync("git", ["status", "--porcelain", "--untracked-files=all"], { encoding: "utf8" }).stdout;
  return out.split("\n").filter(Boolean).map((line) => line.slice(3).replace(/^.* -> /, ""));
}

if (spawnSync("git", ["status", "--porcelain", "--untracked-files=no"], { encoding: "utf8" }).stdout.trim()) {
  console.error("arbre de travail modifié : committez ou remisez vos changements avant un run headless");
  process.exit(2);
}
const preexisting = new Set(changedPaths());

const bin = resolveClaude();
// A `.mjs` CLAUDE_BIN is a deterministic test double run with Node.
const [command, commandArgs] = bin.endsWith(".mjs") ? [process.execPath, [bin, ...args]] : [bin, args];
const result = await new Promise((resolvePromise) => {
  const child = spawn(command, commandArgs, { stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "", stderr = "";
  child.stdout.on("data", d => stdout += d);
  child.stderr.on("data", d => stderr += d);
  child.on("close", code => resolvePromise({ code, stdout, stderr }));
  child.on("error", err => resolvePromise({ code: 127, stdout, stderr: String(err) }));
});

if (result.code !== 0) {
  console.error(result.stderr || result.stdout);
  if (/sandbox/i.test(result.stderr)) console.error("Profil sandbox indisponible sur cette plateforme (voir docs/security.md) : run refusé, aucun contournement.");
  process.exit(result.code || 1);
}

let parsed;
try { parsed = JSON.parse(result.stdout); }
catch { throw new Error("sortie Claude Code non JSON"); }
if (parsed.is_error || parsed.subtype !== "success") {
  console.error(`run Claude Code en échec : ${parsed.subtype ?? "unknown"}`);
  process.exit(1);
}
if (!parsed.structured_output) throw new Error("structured_output absent");
if (parsed.structured_output.status === "blocked") {
  console.error(`run bloqué : ${parsed.structured_output.summary}`);
  process.exit(3);
}

const outOfScope = changedPaths().filter((p) => !preexisting.has(p) && !p.startsWith(EDITABLE_PREFIX));
if (outOfScope.length) {
  console.error(`modifications hors périmètre ${EDITABLE_PREFIX} : ${outOfScope.join(", ")}`);
  process.exit(4);
}

const verify = spawnSync(process.execPath, ["scripts/verify.mjs"], { stdio: "inherit" });
process.exit(verify.status ?? 1);
