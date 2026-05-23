import { Environment } from "@packages/utilities"
import { createAuthClient } from "better-auth/react"


export { BetterFetchError } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: Environment.NEXT_PUBLIC_APP_URI,

    fetchOptions: {
        // Error is thrown so it can be handled globally
        throw: true,
    }
})