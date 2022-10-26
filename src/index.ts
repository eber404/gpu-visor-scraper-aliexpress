import "./fix-paths";
import "dotenv/config";
import "reflect-metadata";
import "cross-fetch/polyfill";
import "eventsource";

import { Logger } from "@/infra/settings/logger";
import { loadSettings } from "@/infra/settings/env/settings-validation";
import { pocketBaseAuth } from "@/infra/services/repositories/pocketbase/pocketbase-client";

async function main() {
  try {
    loadSettings();
    await pocketBaseAuth();

    Logger.info({
      layer: "INFRA",
      message: "App started",
      stack: main.name,
    });
  } catch (error) {
    Logger.error({
      layer: "INFRA",
      message: error,
      stack: main.name,
    });

    process.exit(0);
  }
}

main();
