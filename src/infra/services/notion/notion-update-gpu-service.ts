import { Client } from "@notionhq/client";

import { NotionTableColumn } from "@/infra/services/notion/enums/notion-table-columns";
import { Logger } from "@/infra/settings/logger";
import { UpdateGpuService } from "@/domain/services/update-gpu-service";
import { UpdateGpuDto } from "@/domain/dtos/update-gpu-dto";

import { notion } from "./notion-client";

export class NotionUpdateGpuService implements UpdateGpuService {
  private readonly notion: Client;

  public constructor() {
    this.notion = notion;
  }

  public async update({
    pageId,
    price,
    benchmark,
  }: UpdateGpuDto): Promise<void> {
    try {
      await this.notion.pages.update({
        page_id: pageId,
        properties: {
          [NotionTableColumn.PRICE]: { number: price },
          [NotionTableColumn.BENCHMARK]: { number: benchmark },
        },
      });
    } catch (error) {
      Logger.error({
        layer: "INFRA",
        message: error,
        stack: NotionUpdateGpuService.name,
      });
    }
  }
}
