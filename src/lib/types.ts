import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

import { auth } from "@/auth/auth";

export interface AppBindings {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}

export type AppEnv = {
  Bindings: {
    AUTH_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
  };
};
export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
