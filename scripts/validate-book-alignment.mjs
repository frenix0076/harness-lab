import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

function git(args) {
  const r = spawnSync("git", args, { encoding: "utf8" });
  if (r.error) throw r.error;
  if (r.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${r.stderr.trim()}`);
  return r.stdout;
}
const existsAt = (ref, path) => spawnSync("git", ["cat-file", "-e", `${ref}:${path}`], { encoding: "utf8" }).status === 0;
const textAt = (ref, path) => git(["show", `${ref}:${path}`]);
const blobAt = (ref, path) => git(["rev-parse", `${ref}:${path}`]).trim();
const commitOf = (ref) => git(["rev-parse", "--verify", `${ref}^{commit}`]).trim();
function assert(ok, msg) { if (!ok) throw new Error(msg); }

function checkContract(c) {
  if (c.paths) for (const p of c.paths) assert(existsAt(c.checkpoint, p), `${c.id}: missing ${p}`);
  if (c.mustNotHavePaths) for (const p of c.mustNotHavePaths) assert(!existsAt(c.checkpoint, p), `${c.id}: premature ${p}`);
  if (c.path) {
    assert(existsAt(c.checkpoint, c.path), `${c.id}: missing ${c.path}`);
    const t = textAt(c.checkpoint, c.path);
    for (const x of c.mustContain ?? []) assert(t.includes(x), `${c.id}: expected ${JSON.stringify(x)}`);
    for (const x of c.mustNotContain ?? []) assert(!t.includes(x), `${c.id}: forbidden ${JSON.stringify(x)}`);
  }
  if (c.sameAs) for (const p of c.sameAs.paths) assert(blobAt(c.checkpoint, p) === blobAt(c.sameAs.ref, p), `${c.id}: ${p} differs from ${c.sameAs.ref}`);
}

const manifest = JSON.parse(await readFile("docs/book-alignment-manifest.json", "utf8"));
const courseTags = Object.keys(manifest.v3Frozen);

// --- book-exact-v3: frozen, published references.
for (const [tag, sha] of Object.entries(manifest.v3Frozen)) assert(commitOf(tag) === sha, `V3 tag moved: ${tag}`);
for (const c of manifest.contracts) checkContract(c);
const redTest = textAt("demo-tck-123-expected-failure", "tests/pricing.test.ts");
assert(redTest.includes("11_800"), "red expected 11_800 missing");
const redPricing = textAt("demo-tck-123-expected-failure", "src/domain/pricing.ts");
assert(redPricing.includes("Math.round(totalBeforeTax * 0.10)"), "red faulty basis missing");
const greenPricing = textAt("demo-tck-123-corrected", "src/domain/pricing.ts");
assert(greenPricing.includes("input.itemsSubtotalCents * 0.10"), "green corrected basis missing");
for (const p of ["PUBLISHING_MIGRATION.md", "QA_REPO_ALIGNMENT.md", "REPO_ALIGNMENT_PLAN.md", "docs/book-alignment.md", ".checkpoints.json"]) {
  assert(!existsAt("checkpoint-08-professional", p), `course tag polluted by ${p}`);
}

// --- book-exact-v4: V3 tree of each stage plus exactly the declared patches.
const v4 = manifest.v4;
const v4Tag = (tag) => `${v4.prefix}${tag}`;
for (const tag of v4.aliases) assert(commitOf(v4Tag(tag)) === commitOf(tag), `V4 alias ${v4Tag(tag)} must equal ${tag}`);
for (const [tag, allowed] of Object.entries(v4.delta)) {
  const changed = git(["diff", "--name-only", "--no-renames", tag, v4Tag(tag)]).split("\n").filter(Boolean).sort();
  const expected = [...allowed].sort();
  assert(JSON.stringify(changed) === JSON.stringify(expected), `${v4Tag(tag)} delta vs ${tag}: got [${changed}] expected [${expected}]`);
}
for (let i = 1; i < courseTags.length; i++) {
  const parent = git(["rev-parse", `${v4Tag(courseTags[i])}^{commit}^`]).trim();
  assert(parent === commitOf(v4Tag(courseTags[i - 1])), `V4 chain broken at ${v4Tag(courseTags[i])}`);
}
for (const c of v4.contracts) checkContract(c);
for (const tag of courseTags) {
  for (const p of manifest.courseForbiddenPaths) assert(!existsAt(v4Tag(tag), p), `${v4Tag(tag)} polluted by ${p}`);
}

// --- main = final V4 course state + companion layer only.
const companion = git(["diff", "--name-only", v4Tag("checkpoint-08-professional"), "HEAD"]).split("\n").filter(Boolean);
const outside = companion.filter((p) => !manifest.companionPaths.some((c) => p === c || p.startsWith(`${c}/`)));
assert(outside.length === 0, `HEAD differs from ${manifest.courseFinalTag} outside the companion layer: ${outside.join(", ")}`);

console.log("BOOK ALIGNMENT: PASS (v3 frozen, v4 exact)");
