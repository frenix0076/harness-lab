export type CustomerType = "STANDARD" | "LOYALTY";

export interface PriceInput {
  itemsSubtotalCents: number;
  shippingCents: number;
  taxRate: number;
  customerType: CustomerType;
}

export interface PriceResult {
  itemsSubtotalCents: number;
  shippingCents: number;
  discountCents: number;
  taxCents: number;
  totalCents: number;
}
