import { Gpu } from "@/domain/entities/gpu";

import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

describe(Gpu.name, () => {
  it("should instance gpu entity correctly", () => {
    // given
    const gpuMock: Gpu = {
      benchmarkUrl: faker.internet.url(),
      productUrl: faker.internet.url(),
      pageId: randomUUID(),
    };

    // then
    const gpuOption = Gpu.create(gpuMock);
    const gpu = gpuOption.unwrap();

    // then
    expect(gpuOption.isOk()).toBeTruthy();
    expect(gpu).toMatchObject(gpuMock);
  });
});
