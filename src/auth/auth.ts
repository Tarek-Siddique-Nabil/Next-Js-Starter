import db from "@/db";
import env from "@/validation/env";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", 
      }),


  emailAndPassword: {
    enabled: true,
  },
  session:{
    cookieCache:{
        enabled: true,
        maxAge: 5 * 60 ,
    }
  },
  socialProviders: {
    google: {
      clientId: env.Google_Client_ID!,
      clientSecret: env.Google_Client_Secret!,
    },
  },
  plugins: [
    openAPI(),
  ],
});

export type Session = typeof auth.$Infer.Session;