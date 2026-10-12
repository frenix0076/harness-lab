import test from "node:test";
import assert from "node:assert/strict";
import { checkout } from "../src/api/checkout.ts";

test("checkout delegates to domain pricing", () => {
  const result = checkout({itemsSubtotalCents: 5_000, shippingCents: 500, taxRate: 0.10, customerType: "STANDARD"});
  assert.equal(result.totalCents, 6_000);
});
