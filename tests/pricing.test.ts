import test from "node:test";
import assert from "node:assert/strict";
import { price } from "../src/domain/pricing.ts";

test("STANDARD customer keeps baseline pricing", () => {
  assert.deepEqual(price({
    itemsSubtotalCents: 10_000,
    shippingCents: 1_000,
    taxRate: 0.20,
    customerType: "STANDARD",
  }), {
    itemsSubtotalCents: 10_000,
    shippingCents: 1_000,
    discountCents: 0,
    taxCents: 2_000,
    totalCents: 13_000,
  });
});
