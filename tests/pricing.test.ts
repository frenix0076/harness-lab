import test from "node:test";
import assert from "node:assert/strict";
import { price } from "../src/domain/pricing.ts";

test("baseline pricing keeps shipping outside the tax base", () => {
  assert.deepEqual(price({
    itemsSubtotalCents: 10_000,
    shippingCents: 1_000,
    taxRate: 0.20,
  }), {
    itemsSubtotalCents: 10_000,
    shippingCents: 1_000,
    taxCents: 2_000,
    totalCents: 13_000,
  });
});
