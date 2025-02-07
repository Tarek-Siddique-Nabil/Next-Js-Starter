import { auth } from "@/auth/auth";
import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import env from "@/validation/env";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
export const runtime = "nodejs";

const app = createApp().basePath("/api");
configureOpenAPI(app);

const routes = [

] as const;
routes.forEach((route) => {
    app.route("/", route);
});


app.use(
	"*", // or replace with "*" to enable cors for all routes
	cors({
		origin: env.NEXT_PUBLIC_URL, // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);


app.on(["POST", "GET"], "/auth/**", (c) => {
	return auth.handler(c.req.raw);
});

app.get("/session", async (c) => {
    const session = c.get("session");
    const user = c.get("user");

    if (!user) return c.body(null, 401);

    return c.json({
        session,
        user
    });
});

export type AppType = typeof routes[number];
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);