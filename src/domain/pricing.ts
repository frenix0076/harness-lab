import type { PriceInput, PriceResult } from "./types.ts";

export function price(input: PriceInput): PriceResult {
  const taxCents = Math.round(input.itemsSubtotalCents * input.taxRate);
  return {
    itemsSubtotalCents: input.itemsSubtotalCents,
    shippingCents: input.shippingCents,
    discountCents: 0,
    taxCents,
    totalCents: input.itemsSubtotalCents + taxCents + input.shippingCents,
  };
}
