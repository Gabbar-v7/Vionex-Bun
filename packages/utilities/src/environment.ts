import z from "zod";

export const Environment = {
    get NEXT_PUBLIC_APP_URI() {
        return z.url().parse(process.env.NEXT_PUBLIC_APP_URI)
    },

    get AUTH_SECRET() {
        return z.string().parse(process.env.AUTH_SECRET)
    },

    get GOOGLE_CLIENT_ID() {
        return z.string().parse(process.env.GOOGLE_CLIENT_ID)
    },
    get GOOGLE_CLIENT_SECRET() {
        return z.string().parse(process.env.GOOGLE_CLIENT_SECRET)
    },

    get POSTGRESQL_URI() {
        return z.url().parse(process.env.POSTGRESQL_URI);
    },
    get MONGO_URI() {
        return z.url().parse(process.env.MONGO_URI);
    }
} as const