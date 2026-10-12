import test from "node:test";
import assert from "node:assert/strict";
import { checkout } from "../src/api/checkout.ts";

test("checkout delegates to domain pricing", () => {
  const result = checkout({itemsSubtotalCents: 5_000, shippingCents: 500, taxRate: 0.10, customerType: "STANDARD"});
  assert.equal(result.totalCents, 6_000);
});

test("checkout applies LOYALTY pricing end to end", () => {
  const result = checkout({itemsSubtotalCents: 10_000, shippingCents: 1_000, taxRate: 0.20, customerType: "LOYALTY"});
  assert.equal(result.discountCents, 1_000);
  assert.equal(result.totalCents, 11_800);
});
