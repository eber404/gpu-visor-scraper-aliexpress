import PocketBase from "pocketbase/cjs";

import { Settings } from "@/infra/settings/env";

const client = new PocketBase(Settings.pocketBase.baseUrl);

async function auth(): Promise<void> {
  if (!client.authStore.isValid) {
    await client.admins.authViaEmail(
      Settings.pocketBase.user,
      Settings.pocketBase.password
    );
  }
}

export { auth as pocketBaseAuth, client as pocketBaseClient };
