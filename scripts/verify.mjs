import { mkdir, open, readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: "inherit",
    ...options,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const testFiles = (await readdir("tests"))
  .filter((name) => name.endsWith(".test.ts"))
  .sort()
  .map((name) => join("tests", name));

if (testFiles.length === 0) {
  throw new Error("Aucun fichier *.test.ts trouvé dans tests/");
}

await mkdir("evidence/TCK-123", { recursive: true });

// 1. Validation statique du harness
run(process.execPath, ["scripts/validate-static.mjs"]);

// 2. Tests visibles dans le terminal
run(process.execPath, [
  "--experimental-strip-types",
  "--test",
  ...testFiles,
]);

// 3. Même suite avec rapport JSON destiné au paquet de preuves
const output = await open("evidence/TCK-123/tests.json", "w");

try {
  run(
    process.execPath,
    [
      "--experimental-strip-types",
      "--test",
      "--test-reporter=./scripts/json-test-reporter.mjs",
      ...testFiles,
    ],
    {
      stdio: ["inherit", output.fd, "inherit"],
    }
  );
} finally {
  await output.close();
}

console.log("verification complète : PASS");