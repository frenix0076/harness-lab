import { price } from "../domain/pricing.ts";
import type { PriceInput } from "../domain/types.ts";

export function checkout(input: PriceInput) {
  return price(input);
}
