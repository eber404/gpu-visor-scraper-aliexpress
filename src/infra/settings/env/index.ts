import { Type } from "class-transformer";
import {
  IsNumberString,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
} from "class-validator";

import { Env } from "./env";

class NotionSettings {
  @IsNotEmpty()
  public readonly accessToken = process.env[Env.NOTION_ACCESS_TOKEN] as string;

  @IsNotEmpty()
  public readonly databaseId = process.env[Env.NOTION_DATABASE_ID] as string;
}

class PocketBaseSettings {
  @IsNotEmpty()
  public readonly baseUrl = process.env[Env.POCKETBASE_BASE_URL] as string;

  @IsNotEmpty()
  public readonly user = process.env[Env.POCKETBASE_USER] as string;

  @IsNotEmpty()
  public readonly password = process.env[Env.POCKETBASE_PASSWORD] as string;
}

class App {
  @IsNumberString()
  public readonly port = process.env[Env.PORT] as string;

  @IsNumber()
  public readonly respawnInterval: number = parseInt(
    process.env[Env.RESPAWN_INTERVAL] as string
  );
}

export class Settings {
  @ValidateNested()
  @Type(() => NotionSettings)
  public static notion = new NotionSettings();

  @ValidateNested()
  @Type(() => PocketBaseSettings)
  public static pocketBase = new PocketBaseSettings();

  @ValidateNested()
  @Type(() => App)
  public static app = new App();
}
