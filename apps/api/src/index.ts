import { treaty } from "@elysia/eden";
import { openapi } from "@elysia/openapi";
import { Elysia } from "elysia";

import { betterAuthPlugin, betterAuthView } from "./plugins/auth";

export const apiServer = new Elysia({ prefix: "/api" })
  .use(openapi())
  .get("/", () => "Hello World")
  .all("/api/auth/*", betterAuthView)
  .use(betterAuthPlugin);

export const api = treaty(apiServer);

if (require.main === module) {
  apiServer.listen(4800);
  console.log();
  console.log(`✓ Exposed: ${apiServer.server?.url}`);
}
