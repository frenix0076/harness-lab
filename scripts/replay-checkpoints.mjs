import { readFile, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

// Replays every book-exact-v4 course tag in a throwaway worktree and checks its expected behaviour.
const manifest = JSON.parse(await readFile("docs/book-alignment-manifest.json", "utf8"));
const { prefix, replay } = manifest.v4;

function sh(command, cwd) {
  // Constant commands only: shell is needed to run npm on Windows.
  const r = spawnSync(command, { cwd, shell: true, encoding: "utf8" });
  return { ok: r.status === 0, out: `${r.stdout}${r.stderr}` };
}

let failures = 0;
for (const [tag, expected] of Object.entries(replay)) {
  const ref = `${prefix}${tag}`;
  const dir = await mkdtemp(join(tmpdir(), "harness-replay-"));
  const add = spawnSync("git", ["worktree", "add", "--detach", dir, ref], { encoding: "utf8" });
  if (add.status !== 0) throw new Error(`worktree ${ref}: ${add.stderr}`);
  try {
    const install = sh("npm ci --silent", dir);
    const test = sh("npm test", dir);
    const verify = sh("npm run verify", dir);
    const problems = [];
    if (!install.ok) problems.push("npm ci");
    if (test.ok !== (expected.test === "pass")) problems.push(`npm test ${test.ok ? "pass" : "fail"} (attendu ${expected.test})`);
    if (verify.ok !== (expected.verify === "pass")) problems.push(`npm run verify ${verify.ok ? "pass" : "fail"} (attendu ${expected.verify})`);
    for (const text of expected.output ?? []) if (!test.out.includes(text)) problems.push(`sortie sans ${text}`);
    if (expected.dryRun && !sh("node scripts/run-ticket.mjs TCK-123 --dry-run", dir).ok) problems.push("dry-run");
    console.log(`${problems.length ? "FAIL" : "PASS"}  ${ref}${problems.length ? ` — ${problems.join("; ")}` : ""}`);
    failures += problems.length ? 1 : 0;
  } finally {
    spawnSync("git", ["worktree", "remove", "--force", dir]);
    await rm(dir, { recursive: true, force: true });
  }
}
console.log(failures ? `REPLAY: ${failures} FAIL` : "REPLAY: PASS");
process.exit(failures ? 1 : 0);
