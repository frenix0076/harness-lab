import { Transform } from "node:stream";

const results = [];
export default class JsonTestReporter extends Transform {
  constructor() { super({ writableObjectMode: true }); }
  _transform(event, _encoding, callback) {
    if (event.type === "test:pass" || event.type === "test:fail") {
      results.push({ name: event.data?.name ?? "unknown", status: event.type === "test:pass" ? "PASS" : "FAIL" });
    }
    callback();
  }
  _flush(callback) {
    this.push(JSON.stringify({ generated_by: "node:test", tests: results, pass: results.filter(x => x.status === "PASS").length, fail: results.filter(x => x.status === "FAIL").length }, null, 2));
    callback();
  }
}
