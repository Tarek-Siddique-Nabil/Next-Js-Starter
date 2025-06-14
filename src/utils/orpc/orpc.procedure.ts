import { os } from "@orpc/server";

import {
  dbProviderMiddleware,
  requiredAuthMiddleware,
} from "./orpc.middleware";

export const o = os;

export const publicProcedure = o.use(dbProviderMiddleware);

export const protectedProcedure = publicProcedure.use(requiredAuthMiddleware);
