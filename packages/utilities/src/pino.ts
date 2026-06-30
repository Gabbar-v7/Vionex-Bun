import pino from "pino"

export enum LoggerLevel {
    fatal = "fatal",
    error = "error",
    warn = "warn",
    info = "info",
    debug = "debug",
    trace = "trace",
}

export const appLogger = pino();