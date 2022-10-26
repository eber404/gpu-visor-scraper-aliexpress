import { Settings } from "@/infra/settings/env";
import { Client } from "@notionhq/client";

export const notion = new Client({ auth: Settings.notion.accessToken });
