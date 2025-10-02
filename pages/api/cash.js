export default async function handler(req, res){
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const token = process.env.GH_PAT; if (!token) throw new Error("GH_PAT not set");
    const owner = "Pappensexjule", repo = "piHOCH2";
    const workflow = "cash-report.yml"; // z.B. "lighthouse-dispatch.yml"
    const r = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
      body: JSON.stringify({ ref: "main" })
    });
    if (!r.ok) throw new Error("Dispatch failed");
    res.status(200).json({ ok: true });
  } catch(e){ res.status(500).json({ error: e.message || "dispatch failed" }); }
}
