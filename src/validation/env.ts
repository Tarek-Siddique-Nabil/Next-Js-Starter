/* eslint-disable n/no-process-env */
/* eslint-disable no-console */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string(),
    Google_Client_ID: z.string(),
    Google_Client_Secret: z.string(),
    DB_MIGRATING: stringBoolean,
    DB_SEEDING: stringBoolean,
  },
  client: {
    NEXT_PUBLIC_URL: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    Google_Client_ID: process.env.Google_Client_ID,
    Google_Client_Secret: process.env.Google_Client_Secret,
    NODE_ENV: process.env.NODE_ENV,
    DB_MIGRATING: process.env.DB_MIGRATING,
    DB_SEEDING: process.env.DB_SEEDING,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});

export default env;
