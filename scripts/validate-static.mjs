import { access, readFile, readdir } from "node:fs/promises";

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

const required = ["CLAUDE.md", ".claude/settings.json", ".claude/rules/domain.md", "docs/stories/TCK-123/spec.md", "docs/stories/TCK-123/plan.md"];

for (const path of required) {
  const value = await readFile(path, "utf8");
  if (!value.trim()) throw new Error(`${path} est vide`);
}

for (const path of [".claude/settings.json", ".claude/settings.sandbox.json", "observability/schema.json"]) {
  if (await exists(path)) JSON.parse(await readFile(path, "utf8"));
}

const conditional = [
  [".claude/skills", ".claude/skills/plan/SKILL.md"],
  [".claude/hooks", ".claude/hooks/post-edit-verify.mjs"],
  [".claude/agents", ".claude/agents/code-reviewer.md"],
  ["docs/information-model.md", "docs/stories/TCK-123/progress.md"],
  ["evidence/TCK-123", "evidence/TCK-123/README.md"],
  ["observability", "observability/events.jsonl"],
];
for (const [trigger, path] of conditional) {
  if (await exists(trigger) && !(await exists(path))) throw new Error(`${path} manque alors que ${trigger} existe`);
}

if (await exists(".claude/hooks")) {
  const settings = JSON.parse(await readFile(".claude/settings.json", "utf8"));
  if (!settings.hooks?.PostToolUse?.length) throw new Error("hook PostToolUse absent des settings");
}

console.log("static validation: PASS");
