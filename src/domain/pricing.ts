import type { PriceInput, PriceResult } from "./types.ts";

export function price(input: PriceInput): PriceResult {
  const totalBeforeTax = input.itemsSubtotalCents + input.shippingCents;
  const taxCents = Math.round(input.itemsSubtotalCents * input.taxRate);
  return {
    itemsSubtotalCents: input.itemsSubtotalCents,
    shippingCents: input.shippingCents,
    taxCents,
    totalCents: totalBeforeTax + taxCents,
  };
}
