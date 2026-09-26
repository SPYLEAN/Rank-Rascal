/**
 * An error whose message is written for end users (Discord members) and is safe
 * to show verbatim. Anything else is treated as internal: it is logged and the
 * user only sees GENERIC_ERROR_MESSAGE, so database, network, or stack details
 * never reach Discord or the OAuth callback page.
 */
export class UserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserError";
  }
}

export const GENERIC_ERROR_MESSAGE =
  "The Rascal tripped over a cable. Nothing was lost. Try again in a moment.";

/** Log an internal error without dumping the whole object (which can carry driver detail or response bodies). */
export function logError(context: string, error: unknown): void {
  if (error instanceof Error) {
    const code = (error as { code?: unknown }).code;
    console.error(context, error.name, typeof code === "string" ? code : "", error.message.slice(0, 200));
  } else {
    console.error(context, "non-error thrown");
  }
}

export function userFacingMessage(error: unknown): string {
  return error instanceof UserError ? error.message : GENERIC_ERROR_MESSAGE;
}
