import { Result, Ok, Err } from "oxide.ts";
import { z } from "zod";

const priceSchema = z.object({
  id: z.string().uuid().optional(),
  price: z.number(),
  url: z.string().url(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type PriceProps = z.infer<typeof priceSchema>;

export class Price {
  public readonly id?: string;
  public readonly price: number;
  public readonly url: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  private constructor(props: PriceProps) {
    this.id = props.id;
    this.price = props.price;
    this.url = props.url;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  public static create(props: PriceProps): Result<Price, Error> {
    const validation = priceSchema.safeParse(props);

    if (!validation.success) return Err(new Error(validation.error.toString()));

    return Ok(new Price(props));
  }
}
