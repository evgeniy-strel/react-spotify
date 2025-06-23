// @ts-nocheck

export const generateRandomString = (length: number): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const getCodeVerifier = () => {
  const codeVerifier = generateRandomString(64);
  localStorage.setItem("code_verifier", codeVerifier);
  return codeVerifier;
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

function base64encode(input) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export const getCodeChallenge = async (): any => {
  const hashed = await sha256(getCodeVerifier());
  const codeChallenge = base64encode(hashed);
  return codeChallenge;
};

export const getAccessToken = (): string => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = (): string => {
  return localStorage.getItem("refresh_token");
};
