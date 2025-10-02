// pages/api/setup/vercel-env.ts
import type { NextApiRequest, NextApiResponse } from "next";

type VercelEnv = {
  name: string;          // z.B. "VERCEL_DEPLOY_HOOK"
  value: string;         // der geheime Wert
  target?: ("production" | "preview" | "development")[]; // default: prod+preview
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const { vercelToken, vercelProjectId, vercelTeamId, envs } = req.body as {
      vercelToken: string;
      vercelProjectId: string; // z.B. prj_xxx
      vercelTeamId?: string;   // optional: team_xxx
      envs: VercelEnv[];
    };

    if (!vercelToken || !vercelProjectId || !Array.isArray(envs) || envs.length === 0) {
      throw new Error("missing params (vercelToken, vercelProjectId, envs[])");
    }

    const qs = vercelTeamId ? `?teamId=${encodeURIComponent(vercelTeamId)}` : "";

    for (const env of envs) {
      const payload = {
        key: env.name,
        value: env.value,
        target: env.target ?? ["production", "preview"],
        type: "encrypted", // Vercel speichert verschlüsselt
      };

      const r = await fetch(
        `https://api.vercel.com/v9/projects/${encodeURIComponent(vercelProjectId)}/env${qs}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${vercelToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!r.ok) {
        const t = await r.text();
        throw new Error(`vercel env failed for ${env.name}: ${t}`);
      }
    }

    res.status(200).json({ ok: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message || "failed" });
  }
}
