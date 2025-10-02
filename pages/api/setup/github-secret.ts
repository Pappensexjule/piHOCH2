// pages/api/setup/github-secret.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { sealedbox } from "tweetnacl-sealedbox-js";

function b64ToUint8(b64: string) {
  if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(b64, "base64"));
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const { ghPat, ghOwner, ghRepo, name, value } = req.body || {};
    if (!ghPat || !ghOwner || !ghRepo || !name || !value) {
      throw new Error("missing params (ghPat, ghOwner, ghRepo, name, value)");
    }

    // 1) Repo Public Key holen
    const pkResp = await fetch(
      `https://api.github.com/repos/${ghOwner}/${ghRepo}/actions/secrets/public-key`,
      { headers: { Authorization: `Bearer ${ghPat}`, Accept: "application/vnd.github+json" } }
    );
    if (!pkResp.ok) throw new Error("get public key failed");
    const { key_id, key } = await pkResp.json();

    // 2) Secret versiegeln (sealed box)
    const pk = b64ToUint8(key);
    const enc = sealedbox.seal(
      typeof Buffer !== "undefined" ? Buffer.from(value) : new TextEncoder().encode(value),
      pk
    );
    const encrypted_value =
      typeof Buffer !== "undefined"
        ? Buffer.from(enc).toString("base64")
        : btoa(String.fromCharCode(...enc));

    // 3) Secret setzen/überschreiben
    const put = await fetch(
      `https://api.github.com/repos/${ghOwner}/${ghRepo}/actions/secrets/${encodeURIComponent(name)}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${ghPat}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ encrypted_value, key_id }),
      }
    );

    if (!put.ok) {
      const t = await put.text();
      throw new Error(`put secret failed: ${t}`);
    }
    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "failed" });
  }
}
