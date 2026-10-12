import test from "node:test";
import assert from "node:assert/strict";
import { price } from "../src/domain/pricing.ts";

test("STANDARD customer keeps baseline pricing", () => {
  assert.deepEqual(price({itemsSubtotalCents: 10_000, shippingCents: 1_000, taxRate: 0.20, customerType: "STANDARD"}), {
    itemsSubtotalCents: 10_000, shippingCents: 1_000, discountCents: 0, taxCents: 2_000, totalCents: 13_000,
  });
});

test("LOYALTY discounts items but never shipping", () => {
  assert.deepEqual(price({itemsSubtotalCents: 10_000, shippingCents: 1_000, taxRate: 0.20, customerType: "LOYALTY"}), {
    itemsSubtotalCents: 10_000,
    shippingCents: 1_000,
    discountCents: 1_000,
    taxCents: 1_800,
    totalCents: 11_800,
  });
});

test("LOYALTY discount and tax do not depend on shipping", () => {
  const base = {itemsSubtotalCents: 10_000, taxRate: 0.20, customerType: "LOYALTY"} as const;
  const free = price({...base, shippingCents: 0});
  const paid = price({...base, shippingCents: 2_500});
  assert.equal(paid.discountCents, free.discountCents);
  assert.equal(paid.taxCents, free.taxCents);
  assert.equal(paid.totalCents - free.totalCents, 2_500);
});

test("every amount stays an integer number of cents", () => {
  for (const customerType of ["STANDARD", "LOYALTY"] as const) {
    for (const itemsSubtotalCents of [0, 1, 999, 1_005, 12_345]) {
      for (const taxRate of [0, 0.055, 0.20]) {
        const result = price({itemsSubtotalCents, shippingCents: 499, taxRate, customerType});
        for (const [field, value] of Object.entries(result)) {
          assert.ok(Number.isInteger(value), `${customerType} ${itemsSubtotalCents} ${taxRate}: ${field}=${value}`);
        }
      }
    }
  }
});
