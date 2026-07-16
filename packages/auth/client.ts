import { appEnv } from "@packages/utilities";
import { createAuthClient } from "better-auth/react";

export { BetterFetchError } from "@better-fetch/fetch";

export const authClient = createAuthClient({
  baseURL: appEnv.NEXT_PUBLIC_APP_URI,

  fetchOptions: {
    // Error is thrown so it can be handled globally
    throw: true,
  },
});
