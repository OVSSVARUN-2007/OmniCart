import { createHash } from "node:crypto";

const developmentFallbackSecret = createHash("sha256")
  .update("omnicart-local-development-secret")
  .digest("hex");

export function getAuthSecret() {
  return process.env.AUTH_SECRET || developmentFallbackSecret;
}

export function isProduction() {
  return process.env.NODE_ENV === "production";
}
