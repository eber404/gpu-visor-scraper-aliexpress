import { faker } from "@faker-js/faker";

import { pocketBaseClient } from "@/infra/services/repositories/pocketbase/pocketbase-client";

import { Price } from "@/domain/entities/price";
import { PocketbaseCreatePriceRepository } from "@/infra/services/repositories/pocketbase/pocketbase-create-price-repository";
import { PocketBaseCollection } from "@/infra/services/repositories/pocketbase/pocketbase-collection";

describe.only(PocketbaseCreatePriceRepository.name, () => {
  it("should create a gpu in database", async () => {
    // given
    const repository = new PocketbaseCreatePriceRepository();

    const priceResult = Price.create({
      price: faker.datatype.float(),
      url: faker.internet.url(),
    });

    // when
    const price = priceResult.unwrap();
    await repository.create(price);

    // then
    const retriviedPrice = await pocketBaseClient.records.getList(
      PocketBaseCollection.PRICES,
      1,
      1,
      {
        filter: `base_url = "${price.url}"`,
      }
    );

    expect(retriviedPrice.items[0].base_url).toEqual(price.url);
  });
});
