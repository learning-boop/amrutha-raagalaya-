import { SignJWT, jwtVerify } from "jose";

// Deliberately free of `next/headers` and `server-only` so `proxy.ts` can
// import it as well as Server Components and Actions.

export const SESSION_COOKIE = "ar_admin_session";
export const SESSION_DAYS = 7;

export type SessionPayload = { userId: string; name: string };

function key() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set. Generate one with: openssl rand -base64 32");
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(key());
}

export async function decrypt(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    if (typeof payload.userId !== "string" || typeof payload.name !== "string") return null;
    return { userId: payload.userId, name: payload.name };
  } catch {
    return null;
  }
}
