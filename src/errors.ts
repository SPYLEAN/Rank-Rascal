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

export function userFacingMessage(error: unknown): string {
  return error instanceof UserError ? error.message : GENERIC_ERROR_MESSAGE;
}
