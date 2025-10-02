// pages/api/setup/github-secret.ts
import type { NextApiRequest, NextApiResponse } from "next";
import sodium from "libsodium-wrappers";

// GitHub verlangt: Wert mit Repo-PublicKey verschlüsseln (Libsodium "sealed box")
async function seal(publicKeyBase64: string, secretValue: string) {
  await sodium.ready;
  const pk = sodium.from_base64(publicKeyBase64, sodium.base64_variants.ORIGINAL);
  const msg = sodium.from_string(secretValue);
  const enc = sodium.crypto_box_seal(msg, pk);
  return sodium.to_base64(enc, sodium.base64_variants.ORIGINAL);
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

    // 2) Secret versiegeln
    const encrypted_value = await seal(key, value);

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
