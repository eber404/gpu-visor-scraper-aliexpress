import "dotenv/config";
import "reflect-metadata";
import "cross-fetch/polyfill";
import "eventsource";

import { loadSettings } from "@/infra/settings/env/settings-validation";
import { pocketBaseAuth } from "@/infra/services/repositories/pocketbase/pocketbase-client";

module.exports = async () => {
  loadSettings();
  await pocketBaseAuth();
};
