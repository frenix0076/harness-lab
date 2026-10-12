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
  [".claude/skills", ".claude/skills/plan-ticket/SKILL.md"],
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
  // Every hook script referenced by the settings must exist.
  for (const matchers of Object.values(settings.hooks)) {
    for (const hook of matchers.flatMap((m) => m.hooks ?? [])) {
      for (const part of [hook.command, ...(hook.args ?? [])]) {
        const script = /\.claude\/hooks\/[\w.-]+/.exec(part ?? "")?.[0];
        if (script && !(await exists(script))) throw new Error(`script de hook introuvable : ${script}`);
      }
    }
  }
}

function frontmatter(text, path) {
  const block = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1];
  if (!block) throw new Error(`${path} : frontmatter absent`);
  return Object.fromEntries(block.split(/\r?\n/).filter((l) => /^[\w-]+:/.test(l)).map((l) => {
    const i = l.indexOf(":");
    return [l.slice(0, i), l.slice(i + 1).trim()];
  }));
}

// Claude Code names a skill after its directory: the frontmatter name must match it.
if (await exists(".claude/skills")) {
  for (const entry of await readdir(".claude/skills", { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = `.claude/skills/${entry.name}/SKILL.md`;
    const meta = frontmatter(await readFile(path, "utf8"), path);
    if (meta.name && meta.name !== entry.name) throw new Error(`${path} : name "${meta.name}" ≠ dossier "${entry.name}"`);
    if (!meta.description) throw new Error(`${path} : description absente`);
  }
}

if (await exists(".claude/agents")) {
  for (const name of (await readdir(".claude/agents")).filter((n) => n.endsWith(".md"))) {
    const path = `.claude/agents/${name}`;
    const meta = frontmatter(await readFile(path, "utf8"), path);
    if (!meta.name || !meta.description) throw new Error(`${path} : name et description requis`);
  }
}

console.log("static validation: PASS");
