import { Option, Some, None } from "oxide.ts";
import axios, { AxiosInstance } from "axios";
import cheerio, { CheerioAPI } from "cheerio";

import { GetBenchmarkService } from "@/domain/services/get-benchmark-service";
import { Logger } from "@/infra/settings/logger";

export class VideoCardGetBenchmarkService implements GetBenchmarkService {
  private readonly http: AxiosInstance;
  private readonly cheerio: CheerioAPI;

  constructor() {
    this.http = axios.create();
    this.cheerio = cheerio;
  }

  public async get(url: string): Promise<Option<number>> {
    try {
      const res = await this.http.get(url);

      const $ = this.cheerio.load(res.data);

      const performance = $(".right-desc > span").text();

      return Some(parseInt(performance));
    } catch (error: any) {
      Logger.error({
        layer: "INFRA",
        message: error.message,
        stack: VideoCardGetBenchmarkService.name,
      });
      return None;
    }
  }
}
