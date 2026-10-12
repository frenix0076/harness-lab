import { readFile } from "node:fs/promises";

const required = [
  "CLAUDE.md",
  ".claude/settings.json",
  ".claude/rules/domain.md",
  ".claude/skills/plan/SKILL.md",
  ".claude/agents/code-reviewer.md",
  "docs/stories/TCK-123/spec.md",
  "docs/stories/TCK-123/plan.md",
  "docs/stories/TCK-123/progress.md",
  "docs/information-model.md",
  "docs/capabilities.md"
];

for (const path of required) {
  const value = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
  if (!value.trim()) throw new Error(`${path} est vide`);
}

for (const path of [".claude/settings.json", ".claude/settings.sandbox.json"]) {
  JSON.parse(await readFile(new URL(`../${path}`, import.meta.url), "utf8"));
}
console.log("static validation: PASS");
