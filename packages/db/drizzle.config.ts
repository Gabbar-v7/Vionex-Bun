import { appEnv } from "@packages/utilities";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/pg/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: appEnv.POSTGRESQL_URI,
  },
});
