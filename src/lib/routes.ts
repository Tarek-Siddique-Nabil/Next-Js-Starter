import { BASE_PATH } from "./constants";
import { createRouter } from "./create-app";
import { AppOpenAPI } from "./types";

export function registerRoutes(app: AppOpenAPI) {
  return app;
}

// stand alone router type used for api client
export const router = registerRoutes(createRouter().basePath(BASE_PATH));
export type router = typeof router;
