"server only";

import { headers } from "next/headers";

import { RouterClient, createRouterClient } from "@orpc/server";

import { appRouter } from "@/routers";

declare const globalThis: {
  $client: RouterClient<typeof appRouter> | undefined;
} & typeof global;

globalThis.$client = createRouterClient(appRouter, {
  /**
   * Provide initial context if needed.
   *
   * Because this client instance is shared across all requests,
   * only include context that's safe to reuse globally.
   * For per-request context, use middleware context or pass a function as the initial context.
   */
  context: async () => ({
    headers: await headers(), // provide headers if initial context required
  }),
});
