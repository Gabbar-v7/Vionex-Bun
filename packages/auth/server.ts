import { account, postgresClient, session, user, verification } from "@packages/db";
import { appEnv } from "@packages/utilities";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const authSchema = {
  user: user,
  session: session,
  account: account,
  verification: verification,
} as const;

export const auth = betterAuth({
  baseURL: appEnv.NEXT_PUBLIC_APP_URI,
  secret: appEnv.AUTH_SECRET,

  database: drizzleAdapter(postgresClient, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      //  TODO:
      console.log(url);
    },
    onExistingUserSignUp: async ({ user }, request) => {
      //    TODO:
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: false,
    expiresIn: 3600, // 1 hour
    sendVerificationEmail: async ({ user, url, token }) => {
      //    TODO:
    },
  },
  socialProviders: {
    google: {
      enabled: true,
      prompt: "select_account",
      clientId: appEnv.GOOGLE_CLIENT_ID,
      clientSecret: appEnv.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 * 2, // 2 day (every 2 day the session expiration is updated)
  },
  advanced: {
    cookiePrefix: "vionex",
    cookies: {
      session_token: {
        name: "session",
        attributes: {
          // Set custom cookie attributes
        },
      },
    },
  },
});
