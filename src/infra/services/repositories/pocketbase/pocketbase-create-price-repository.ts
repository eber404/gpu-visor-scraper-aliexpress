import PocketBase from "pocketbase/cjs";

import { Price } from "@/domain/entities/price";
import { CreatePriceRepository } from "@/domain/repositories/create-price-repository";
import { Logger } from "@/infra/settings/logger";

import { PocketBaseCollection } from "./pocketbase-collection";
import { pocketBaseClient } from "./pocketbase-client";
import { PriceModel } from "./models/price-model";

export class PocketbaseCreatePriceRepository implements CreatePriceRepository {
  private readonly client: PocketBase;

  public constructor() {
    this.client = pocketBaseClient;
  }

  public async create(price: Price): Promise<void> {
    try {
      const priceModel = PriceModel.fromDomain(price);
      await this.client.records.create(PocketBaseCollection.PRICES, priceModel);
    } catch (error) {
      Logger.error({
        layer: "INFRA",
        message: error,
        stack: PocketbaseCreatePriceRepository.name,
      });
    }
  }
}
