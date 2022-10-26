import { container } from "tsyringe";

import { UpdateGpuController } from "@/infra/controllers/update-gpu-controller";
import { NotionListUrlsService } from "@/infra/services/notion/notion-list-urls-service";
import { NotionUpdateGpuService } from "@/infra/services/notion/notion-update-gpu-service";
import { AliexpressGetPriceService } from "@/infra/services/aliexpress/aliexpress-get-price-service";
import { VideoCardGetBenchmarkService } from "@/infra/services/videocardbenchmark/videocard-get-benchmark-service";

import { UpdateGpuUseCase } from "@/application/usecases/update-gpu-usecase";

import { ListUrlsService } from "@/domain/services/list-urls-service";
import { GetPriceService } from "@/domain/services/get-price-service";
import { UpdateGpuService } from "@/domain/services/update-gpu-service";
import { GetBenchmarkService } from "@/domain/services/get-benchmark-service";

// controller
container.register<UpdateGpuController>("UpdateGpuController", {
  useClass: UpdateGpuController,
});

// usecases
container.register<UpdateGpuUseCase>("UpdateGpuUseCase", {
  useClass: UpdateGpuUseCase,
});

// services
container.register<GetBenchmarkService>("GetBenchmarkService", {
  useClass: VideoCardGetBenchmarkService,
});

container.register<ListUrlsService>("ListUrlsService", {
  useClass: NotionListUrlsService,
});

container.register<UpdateGpuService>("UpdateGpuService", {
  useClass: NotionUpdateGpuService,
});

container.register<GetPriceService>("GetPriceService", {
  useClass: AliexpressGetPriceService,
});

const updateGpuController = container.resolve(UpdateGpuController);

export { updateGpuController };
