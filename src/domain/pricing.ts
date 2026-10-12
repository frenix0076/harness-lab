import type { PriceInput, PriceResult } from "./types.ts";

export function price(input: PriceInput): PriceResult {
  const discountCents = input.customerType === "LOYALTY"
    ? Math.round(input.itemsSubtotalCents * 0.10)
    : 0;
  const discountedItemsCents = input.itemsSubtotalCents - discountCents;
  const taxCents = Math.round(discountedItemsCents * input.taxRate);
  return {
    itemsSubtotalCents: input.itemsSubtotalCents,
    shippingCents: input.shippingCents,
    discountCents,
    taxCents,
    totalCents: discountedItemsCents + taxCents + input.shippingCents,
  };
}
