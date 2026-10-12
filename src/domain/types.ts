export interface PriceInput {
  itemsSubtotalCents: number;
  shippingCents: number;
  taxRate: number;
}

export interface PriceResult {
  itemsSubtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
}
