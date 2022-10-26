import { Client } from "@notionhq/client";
import { None, Option, Some } from "oxide.ts";

import { Settings } from "@/infra/settings/env";
import { NotionTableColumn } from "@/infra/services/notion/enums/notion-table-columns";
import { Logger } from "@/infra/settings/logger";

import { ListUrlsService } from "@/domain/services/list-urls-service";
import { Gpu } from "@/domain/entities/gpu";

import { notion } from "./notion-client";

export class NotionListUrlsService implements ListUrlsService {
  private readonly notion: Client;

  public constructor() {
    this.notion = notion;
  }

  async list(): Promise<Option<Gpu[]>> {
    try {
      const data = await this.notion.databases.query({
        database_id: Settings.notion.databaseId,
      });

      const pages = data.results as any[];

      const gpus: Gpu[] = [];
      for (const page of pages) {
        const columns = page.properties;

        const pageId = page.id;
        const productUrl = columns[NotionTableColumn.PRODUCT_URL]?.url;
        const benchmarkUrl = columns[NotionTableColumn.BENCHMARK_URL].url;

        const gpu = Gpu.create({
          pageId,
          productUrl,
          benchmarkUrl,
        });

        if (gpu.isOk()) {
          gpus.push(gpu.unwrap());
        }
      }

      return gpus.length > 0 ? Some(gpus) : None;
    } catch (error) {
      Logger.error({
        layer: "INFRA",
        message: error,
        stack: NotionListUrlsService.name,
      });
      return None;
    }
  }
}
