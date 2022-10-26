import { UpdateGpuDto } from "@/domain/dtos/update-gpu-dto";

export interface UpdateGpuService {
  update(dto: UpdateGpuDto): Promise<void>;
}
