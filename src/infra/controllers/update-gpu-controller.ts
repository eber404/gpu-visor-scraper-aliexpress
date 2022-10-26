import { injectable, inject } from "tsyringe";

import { UpdateGpuUseCase } from "@/application/usecases/update-gpu-usecase";

@injectable()
export class UpdateGpuController {
  constructor(
    @inject("UpdateGpuUseCase")
    private readonly updateGpuUseCase: UpdateGpuUseCase
  ) {}

  async handle(): Promise<void> {
    await this.updateGpuUseCase.execute();
  }
}
