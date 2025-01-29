/* eslint-disable no-console */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";

const stringBoolean = z.coerce.string().transform((val) => {
  return val === "true";
}).default("false");

expand(config({
  path: path.resolve(
    process.cwd(),
    // eslint-disable-next-line n/no-process-env
    process.env.NODE_ENV === "development" ? ".env.development" : ".env",
  ),
}));

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string(),
  Google_Client_ID: z.string(),
  Google_Client_Secret: z.string(),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
}).superRefine((input, ctx) => {
  if (input.NODE_ENV === "production" && !input.DATABASE_URL && !input.Google_Client_ID && !input.Google_Client_Secret) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      expected: "string",
      received: "undefined",
      path: [ "DATABASE_URL" , "Google_Client_ID", "Google_Client_Secret"],
      message: "Must be set when NODE_ENV is 'production'",
    });
  }
});

export type env = z.infer<typeof EnvSchema>;


// eslint-disable-next-line n/no-process-env
const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  // eslint-disable-next-line no-console
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default env!;