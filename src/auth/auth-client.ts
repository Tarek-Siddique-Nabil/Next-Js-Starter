import { createAuthClient } from "better-auth/react";

import env from "@/validation/env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_URL!,
});

export const { signIn, signUp, useSession } = createAuthClient();
