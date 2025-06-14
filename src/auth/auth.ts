import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  // socialProviders: {
  //   google: {
  //     clientId: env.Google_Client_ID!,
  //     clientSecret: env.Google_Client_Secret!,
  //   },
  // },
});

export type Session = typeof auth.$Infer.Session;
