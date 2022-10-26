import { inject, injectable } from "tsyringe";

import { UpdateGpuService } from "@/domain/services/update-gpu-service";
import { ListUrlsService } from "@/domain/services/list-urls-service";
import { GetPriceService } from "@/domain/services/get-price-service";
import { GetBenchmarkService } from "@/domain/services/get-benchmark-service";

@injectable()
export class UpdateGpuUseCase {
  public constructor(
    @inject("ListUrlsService")
    private readonly listUrlsService: ListUrlsService,
    @inject("UpdateGpuService")
    private readonly updateGpuService: UpdateGpuService,
    @inject("GetPriceService")
    private readonly getPriceService: GetPriceService,
    @inject("GetBenchmarkService")
    private readonly getBenchmarkService: GetBenchmarkService
  ) {}

  public async execute(): Promise<void> {
    const gpu_urls_option_list = await this.listUrlsService.list();

    if (gpu_urls_option_list.isNone()) return;

    const gpu_urls = gpu_urls_option_list.unwrap();

    for (const gpu_url of gpu_urls) {
      const price_option = await this.getPriceService.get(gpu_url.productUrl);
      const benchmark_option = await this.getBenchmarkService.get(
        gpu_url.benchmarkUrl
      );

      if (price_option.isSome() && benchmark_option.isSome()) {
        await this.updateGpuService.update({
          pageId: gpu_url.pageId,
          benchmark: benchmark_option.unwrap(),
          price: price_option.unwrap(),
        });
      }
    }
  }
}
