import z from "zod";

export const appEnv = {
    get isProduction() {
        return z.string().transform((val) => val.toUpperCase() === "PRODUCTION").parse(process.env.NODE_ENV)
    },

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
    },

    get S3_ACCESS_KEY_ID() {
        return z.string().parse(process.env.S3_ACCESS_KEY_ID)
    },
    get S3_SECRET_ACCESS_KEY() {
        return z.string().parse(process.env.S3_SECRET_ACCESS_KEY)
    },
    get S3_REGION() {
        return z.string().parse(process.env.S3_REGION)
    },
    get S3_ENDPOINT() {
        return z.string().parse(process.env.S3_ENDPOINT)
    },
    get S3_BUCKET() {
        return z.string().parse(process.env.S3_BUCKET)
    },

    get SMTP_HOST() {
        return z.string().parse(process.env.SMTP_HOST)
    },
    get SMTP_PORT() {
        return z.coerce.number().parse(process.env.SMTP_PORT);
    },
    get SMTP_SECURE() {
        return z.string().transform((val) => val.toUpperCase() === 'TRUE').parse(process.env.SMTP_SECURE);
    },
    get SMTP_USER() {
        return z.string().parse(process.env.SMTP_USER);
    },
    get SMTP_PASS() {
        return z.string().parse(process.env.SMTP_PASS);
    },
    get SMTP_FROM() {
        return z.string().parse(process.env.SMTP_FROM);
    }
} as const
