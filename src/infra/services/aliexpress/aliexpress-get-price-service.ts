import { Option, Some, None } from "oxide.ts";
import axios, { AxiosInstance } from "axios";

import { Logger } from "@/infra/settings/logger";
import { GetPriceService } from "@/domain/services/get-price-service";
import { Price } from "@/domain/entities/price";

export class AliexpressGetPriceService implements GetPriceService {
  private readonly http: AxiosInstance;

  public constructor() {
    this.http = axios.create({
      headers: {
        "accept-language": "pt-BR,pt;q=0.6",
        cookie: `aep_usuc_f=isfm=y&site=bra&c_tp=BRL&isb=y&region=BR&b_locale=pt_BR; Domain=.aliexpress.com; Expires=Sun, 05-Nov-2090 20:51:40 GMT; Path=/; Secure; SameSite=None;`,
      },
    });
  }

  public async get(url: string): Promise<Option<Price>> {
    try {
      const res = await this.http.get(url);

      const string_price = res.data
        .split('totalValue: "')[1]
        .split("R$ ")[1]
        .split('"')[0]
        .replace(".", "")
        .replace(",", ".");

      const price = Price.create({
        url,
        price: parseFloat(string_price),
      });

      if (price.isErr()) return None;

      return Some(price.unwrap());
    } catch (error: any) {
      Logger.error({
        layer: "INFRA",
        message: error.message,
        stack: AliexpressGetPriceService.name,
      });

      return None;
    }
  }
}
