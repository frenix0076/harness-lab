export default async function* reporter(source) {
  const tests = [];
  let finalSummary = null;
  for await (const event of source) {
    if (event.type === "test:pass" || event.type === "test:fail") {
      tests.push({
        name: event.data.name,
        status: event.type === "test:pass" ? "PASS" : "FAIL"
      });
    }
    if (event.type === "test:summary" && !event.data.file) {
      finalSummary = {
        tests: event.data.counts.tests,
        passed: event.data.counts.passed,
        failed: event.data.counts.failed,
        skipped: event.data.counts.skipped,
        cancelled: event.data.counts.cancelled,
        todo: event.data.counts.todo
      };
    }
  }
  const failed = tests.some((t) => t.status === "FAIL") || (finalSummary?.failed ?? 0) > 0;
  yield JSON.stringify({ status: failed ? "FAIL" : "PASS", tests, summary: finalSummary }, null, 2) + "\n";
}
