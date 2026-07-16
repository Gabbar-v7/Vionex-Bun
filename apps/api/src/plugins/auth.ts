import { auth } from "@packages/auth/server";
import { Elysia, type Context } from "elysia";

// user middleware (compute user and session and pass to routes)
export const betterAuthPlugin = new Elysia({ name: "better-auth" }).mount(auth.handler).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });
      if (!session) return status(401);
      return {
        user: session.user,
        session: session.session,
      };
    },
  },
});

export const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];
  // validate request method
  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  } else {
    context.status(405);
  }
};
