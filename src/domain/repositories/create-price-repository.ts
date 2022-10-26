import { Price } from "@/domain/entities/price";

export interface CreatePriceRepository {
  create(price: Price): Promise<void>;
}
