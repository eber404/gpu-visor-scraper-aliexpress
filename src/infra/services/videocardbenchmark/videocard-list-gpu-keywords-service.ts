import axios, { AxiosInstance } from "axios";
import { load } from "cheerio";
import { Option } from "oxide.ts";
import fs from "fs";

import { Keywords, KeywordsDto } from "@/domain/dtos/get-gpu-keywords";

export class VideoCardListGpuKeywordsService {
  private readonly http: AxiosInstance;
  private readonly baseUrl = "https://www.videocardbenchmark.net";

  constructor() {
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }

  public async get() {
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

    const path = gpus[0].keywords.join("-");
    const params = gpus[0].keywords.join(" ");

    const { data: aliexData } = await this.http.get(
      `https://a.aliexpress.com/_mrtLXSo`,
      {}
    );

    console.log("aliexData", aliexData);

    const $$ = load(aliexData);

    fs.writeFileSync("aliex-search.html", aliexData);

    return;
  }
}
