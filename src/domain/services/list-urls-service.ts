import { Option } from "oxide.ts";
import { Gpu } from "@/domain/entities/gpu";

export interface ListUrlsService {
  list(): Promise<Option<Gpu[]>>;
}
