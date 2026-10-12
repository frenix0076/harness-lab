import type { PriceInput, PriceResult } from "./types.ts";

export function price(input: PriceInput): PriceResult {
  // Erreur volontaire : totalBeforeTax inclut la livraison et sert à calculer la remise.
  const totalBeforeTax = input.itemsSubtotalCents + input.shippingCents;
  const discountCents = input.customerType === "LOYALTY"
    ? Math.round(totalBeforeTax * 0.10)
    : 0;

  // La taxe reste calculée sur les articles remisés ; la remise excessive produit 11 680.
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
