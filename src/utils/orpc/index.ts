import type { headers } from "next/headers";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { appRouter } from "@/routers";
import env from "@/validation/env";

declare const globalThis: {
  $client: RouterClient<typeof appRouter> | undefined;
  $headers: typeof headers;
} & typeof global;

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(`Error: ${error.message}`, {
        action: {
          label: "retry",
          onClick: () => {
            queryClient.invalidateQueries();
          },
        },
      });
    },
  }),
});

const link = new RPCLink({
  url: `${typeof window !== "undefined" ? window.location.origin : `${env.NEXT_PUBLIC_URL}`}/rpc`,
  headers: async () => {
    return globalThis.$headers
      ? Object.fromEntries(await globalThis.$headers()) // use this on ssr
      : {}; // use this on browser
  },
});

export const client: RouterClient<typeof appRouter> =
  globalThis.$client ?? createORPCClient(link);
export const orpc = createTanstackQueryUtils(client);
