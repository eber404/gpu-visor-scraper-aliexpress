import { Option } from "oxide.ts";

export interface GetBenchmarkService {
  get(url: string): Promise<Option<number>>;
}
