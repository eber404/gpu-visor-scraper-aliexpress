import axios, { AxiosInstance } from "axios";
import { load } from "cheerio";
import { Option } from "oxide.ts";
import { diffArrays } from "diff";

import { Keywords, KeywordsDto } from "@/domain/dtos/get-gpu-keywords";

export class VideoCardGetBenchByKeywordsService {
  private readonly http: AxiosInstance;
  private readonly baseUrl = "https://www.videocardbenchmark.net";

  constructor() {
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async get(props: string): Promise<string> {
    const { data } = await this.http.get("/high_end_gpus.html");

    const $ = load(data);

    interface Gpu {
      keywords: string[];
      url: string;
    }

    const gpus: Gpu[] = [];
    $("ul.chartlist li").each((index, el) => {
      if (index > 0) return;

      const link = $("a", el).attr("href");

      const keywords = $("a span.prdname", el).text().split(" ");

      const gpu = {
        keywords,
        url: `${this.baseUrl}/${link}`,
      };

      gpus.push(gpu);
    });

    const gpu = gpus.filter((gpu) => {
      const sameKeywords = diffArrays(props.split(" "), gpu.keywords, {
        ignoreCase: true,
      });

      console.log(sameKeywords);
    });

    console.log("gpu found", gpu);

    return gpu[0].url;
  }
}
