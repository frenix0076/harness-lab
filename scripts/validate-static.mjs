import { readFile } from "node:fs/promises";

const required = [
  "CLAUDE.md",
  ".claude/settings.json",
  ".claude/rules/domain.md",
  ".claude/skills/plan/SKILL.md",
  "docs/stories/TCK-123/spec.md",
];

for (const path of required) {
  const value = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
  if (!value.trim()) throw new Error(`${path} est vide`);
}
JSON.parse(await readFile(new URL("../.claude/settings.json", import.meta.url), "utf8"));
console.log("static validation: PASS");
