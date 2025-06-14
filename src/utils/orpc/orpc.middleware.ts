import { headers } from "next/headers";

import { os } from "@orpc/server";
import { User } from "better-auth";
import { drizzle } from "drizzle-orm/postgres-js";

import { auth } from "@/auth/auth";
import db, { connection } from "@/db";
import * as schema from "@/db/schema";

export const dbProviderMiddleware = os
  .$context<{ db?: db }>()
  .middleware(async ({ context, next }) => {
    /**
     * Why we should ?? here?
     * Because it can avoid `createFakeDB` being called when unnecessary.
     * {@link https://orpc.unnoq.com/docs/best-practices/dedupe-middleware}
     */
    const db: db =
      context.db ??
      drizzle(connection, {
        schema,
        logger: true,
      });

    return next({
      context: {
        db,
      },
    });
  });

export const requiredAuthMiddleware = os
  .$context<{ session?: { user?: User } }>()
  .middleware(async ({ context, next }) => {
    /**
     * Why we should ?? here?
     * Because it can avoid `getSession` being called when unnecessary.
     * {@link https://orpc.unnoq.com/docs/best-practices/dedupe-middleware}
     */
    const session = context.session ?? (await getSession());

    if (!session?.user) {
      throw new Error("UNAUTHORIZED");
    }

    return next({
      context: { user: session?.user, session },
    });
  });

async function getSession() {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}
