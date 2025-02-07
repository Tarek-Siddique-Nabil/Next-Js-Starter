import { hc } from "hono/client";

import { router } from "./routes";

export type Client = ReturnType<typeof hc<router>>;

// eslint-disable-next-line import/no-anonymous-default-export
export default (...args: Parameters<typeof hc>): Client => hc<router>(...args);

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
