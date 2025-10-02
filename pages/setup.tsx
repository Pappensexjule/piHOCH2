import React, { useState } from "react";

export default function Setup() {
  const [ghPat, setGhPat] = useState("");
  const [ghOwner, setGhOwner] = useState("Pappensexjule");
  const [ghRepo, setGhRepo] = useState("piHOCH2");
  const [vercelToken, setVercelToken] = useState("");
  const [vercelProjectId, setVercelProjectId] = useState(""); // z.B. prj_xxx
  const [vercelTeamId, setVercelTeamId] = useState("");       // optional: team_xxx
  const [deployHook, setDeployHook] = useState("");
  const [stripeKey, setStripeKey] = useState("");
  const [ok, setOk] = useState<string>("");

  async function save() {
    setOk("…");

    // 1) GitHub Secret: GH_PAT
    const a = await fetch("/api/setup/github-secret", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ghPat, ghOwner, ghRepo, name: "GH_PAT", value: ghPat })
    }).then(r => r.json());

    // 2) Vercel Env: VERCEL_DEPLOY_HOOK, STRIPE_SECRET_KEY, GH_PAT
    const b = await fetch("/api/setup/vercel-env", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vercelToken, vercelProjectId, vercelTeamId,
        envs: [
          { name:"VERCEL_DEPLOY_HOOK", value:deployHook, target:["production","preview"] },
          { name:"STRIPE_SECRET_KEY", value:stripeKey, target:["production","preview"] },
          { name:"GH_PAT", value:ghPat, target:["production","preview"] },
        ]
      })
    }).then(r => r.json());

    if (a?.ok && b?.ok) setOk("✅ Secrets gesetzt. Du kannst jetzt /finchi benutzen.");
    else setOk("❌ Fehler. Prüfe Eingaben & Logs.");
  }

  return (
    <main style={{maxWidth:680, margin:"40px auto", padding:"0 16px", fontFamily:"system-ui"}}>
      <h1>FINCHI Setup</h1>
      <p>Trage die Werte <b>einmalig</b> ein. Sie werden direkt an GitHub/Vercel übermittelt und nicht gespeichert.</p>

      <h3>GitHub (für Workflows)</h3>
      <label>Owner</label><input value={ghOwner} onChange={e=>setGhOwner(e.target.value)} />
      <label>Repo</label><input value={ghRepo} onChange={e=>setGhRepo(e.target.value)} />
      <label>GitHub Personal Access Token (fine-grained, repo+workflow)</label>
      <input value={ghPat} onChange={e=>setGhPat(e.target.value)} type="password"/>

      <h3 style={{marginTop:16}}>Vercel (für Deploy & API-Routen)</h3>
      <label>Vercel Access Token</label><input value={vercelToken} onChange={e=>setVercelToken(e.target.value)} type="password"/>
      <label>Vercel Project ID (z.B. prj_xxx)</label><input value={vercelProjectId} onChange={e=>setVercelProjectId(e.target.value)} />
      <label>Vercel Team ID (optional)</label><input value={vercelTeamId} onChange={e=>setVercelTeamId(e.target.value)} />

      <h3 style={{marginTop:16}}>Secrets</h3>
      <label>VERCEL_DEPLOY_HOOK (URL)</label><input value={deployHook} onChange={e=>setDeployHook(e.target.value)} />
      <label>STRIPE_SECRET_KEY (sk_live_…)</label><input value={stripeKey} onChange={e=>setStripeKey(e.target.value)} type="password"/>

      <div style={{marginTop:16}}>
        <button onClick={save} style={{padding:"10px 14px", borderRadius:10}}>Jetzt eintragen</button>
      </div>
      <p>{ok}</p>

      <style jsx>{`
        label { display:block; margin:10px 0 4px; font-size:14px; opacity:.8 }
        input { width:100%; padding:10px; border:1px solid #ccc; border-radius:10px }
      `}</style>
    </main>
  );
}
