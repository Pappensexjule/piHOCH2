export default async function handler(req, res){
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const hook = process.env.VERCEL_DEPLOY_HOOK;
    if (!hook) throw new Error("VERCEL_DEPLOY_HOOK not set");
    const r = await fetch(hook, { method: "POST" });
    if (!r.ok) throw new Error("Deploy hook failed");
    res.status(200).json({ ok: true });
  } catch(e){ res.status(500).json({ error: e.message || "deploy failed" }); }
}
