import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { resolve } from "node:path";

const ticket = process.argv[2] ?? "TCK-123";
const dryRun = process.argv.includes("--dry-run");
if (!/^[A-Z]+-\d+$/.test(ticket)) throw new Error("ticket id invalide");
const spec = resolve(`docs/stories/${ticket}/spec.md`);
await access(spec);

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

const prompt = `Traite ${ticket}. La Truth est ${spec}. Respecte CLAUDE.md. Ne conclus pas sur déclaration : la vérification déterministe sera exécutée après ton run.`;
const args = [
  "-p",
  prompt,
  "--output-format", "json",
  "--json-schema", schema,
  "--max-turns", "8",
  "--permission-mode", "dontAsk",
  "--permission-prompts", "none",
  "--allowedTools", "Read,Edit,Bash(npm test),Bash(npm run verify)"
];

if (dryRun) {
  console.log(JSON.stringify({ command: "claude", args }, null, 2));
  process.exit(0);
}

const result = await new Promise((resolvePromise) => {
  const child = spawn("claude", args, { stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "", stderr = "";
  child.stdout.on("data", d => stdout += d);
  child.stderr.on("data", d => stderr += d);
  child.on("close", code => resolvePromise({ code, stdout, stderr }));
  child.on("error", err => resolvePromise({ code: 127, stdout, stderr: String(err) }));
});

if (result.code !== 0) {
  console.error(result.stderr || result.stdout);
  process.exit(result.code || 1);
}

let parsed;
try { parsed = JSON.parse(result.stdout); }
catch { throw new Error("sortie Claude Code non JSON"); }
if (!parsed.structured_output) throw new Error("structured_output absent");

const verify = spawn(process.execPath, ["scripts/verify.mjs"], {
  stdio: "inherit",
});
verify.on("close", code => process.exit(code ?? 1));
