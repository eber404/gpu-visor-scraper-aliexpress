import { Option } from "oxide.ts";
import { Price } from "@/domain/entities/price";

export interface GetPriceService {
  get(url: string): Promise<Option<Price>>;
}
