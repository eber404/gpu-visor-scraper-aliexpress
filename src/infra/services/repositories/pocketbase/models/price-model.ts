import { Result } from "oxide.ts";

import { Price } from "@/domain/entities/price";

interface PriceModelProps {
  id?: string;
  price: number;
  base_url: string;
  gpu?: unknown;
  createdAt?: string;
  updatedAt?: string;
}

export class PriceModel {
  private constructor(props: PriceModelProps) {
    Object.assign(this, props);
  }

  public static toDomain(props: PriceModelProps): Result<Price, Error> {
    return Price.create({
      id: props.id,
      price: props.price,
      url: props.base_url,
      createdAt: props.createdAt ? new Date(props.createdAt) : undefined,
      updatedAt: props.updatedAt ? new Date(props.updatedAt) : undefined,
    });
  }

  public static fromDomain(props: Price): PriceModel {
    return new PriceModel({
      base_url: props.url,
      price: props.price,
      createdAt: props.createdAt?.toISOString(),
      updatedAt: props.updatedAt?.toISOString(),
      id: props.id,
    });
  }
}
