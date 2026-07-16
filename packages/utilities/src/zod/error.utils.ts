import { z } from "zod";

export class ZodErrorUtils {
  static zodErrorsToRecord(error: z.ZodError): Record<string, string> {
    const result: Record<string, string> = {};

    for (const issue of error.issues) {
      const key = issue.path[0] as string;
      result[key] = issue.message;
    }

    return result;
  }
}
