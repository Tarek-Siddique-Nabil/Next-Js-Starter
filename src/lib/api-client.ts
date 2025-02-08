import { hc } from "hono/client";

import env from "@/validation/env";

import { router } from "./routes";

const apiClient = hc<router>(env.NEXT_PUBLIC_URL);
export default apiClient;
export type apiClient = ReturnType<typeof hc<router>>;

export type ErrorSchema = {
  error: {
    issues: {
      code: string;
      path: (string | number)[];
      message?: string | undefined;
    }[];
    name: string;
  };
  success: boolean;
};

export function formatApiError(apiError: ErrorSchema) {
  return apiError.error.issues.reduce(
    (all, issue) => `${all + issue.path.join(".")}: ${issue.message}\n`,
    ""
  );
}
