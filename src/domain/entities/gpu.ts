import { Result, Ok, Err } from "oxide.ts";
import { z } from "zod";

const gpu = z.object({
  pageId: z.string().min(1),
  productUrl: z.string().url().min(1),
  benchmarkUrl: z.string().url().min(1),
});

type GpuLinsk = z.infer<typeof gpu>;

export class Gpu {
  public readonly pageId: string;
  public readonly productUrl: string;
  public readonly benchmarkUrl: string;

  private constructor(props: GpuLinsk) {
    this.pageId = props.pageId;
    this.productUrl = props.productUrl;
    this.benchmarkUrl = props.benchmarkUrl;
  }

  public static create(props: GpuLinsk): Result<Gpu, Error> {
    const validation = gpu.safeParse(props);

    if (!validation.success) return Err(new Error(validation.error.toString()));

    return Ok(new Gpu(props));
  }
}
