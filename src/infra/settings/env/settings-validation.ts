import { validateSync } from "class-validator";

import { Logger } from "@/infra/settings/logger";

import { Settings } from ".";

export const loadSettings = () => {
  const errors = validateSync(Settings);

  // instanbul ignore if
  if (errors.length > 0) {
    Logger.error({
      layer: "INFRA",
      message: errors,
      stack: loadSettings.name,
    });

    process.exit(0);
  }
};
