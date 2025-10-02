export default function Finchi() {
  async function call(path) {
    const r = await fetch(path, { method: "POST" });
    const j = await r.json().catch(()=> ({}));
    alert(r.ok ? "OK" : (j.error || "Fehler"));
  }
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>FINCHI Godmode (Φ)</h1>
      <p>Kollektiv online · Guardrails aktiv</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
        <button onClick={()=>call("/api/deploy")} style={btn}>Deploy Now</button>
        <button onClick={()=>call("/api/audit")} style={btn}>Mobile Lighthouse</button>
        <button onClick={()=>call("/api/iphone")} style={btn}>iPhone UI Test</button>
        <button onClick={()=>call("/api/rotate")} style={btn}>Rotate Keys</button>
        <button onClick={()=>call("/api/train")} style={btn}>Bots Training</button>
        <button onClick={()=>call("/api/cash")} style={btn}>Cash Report</button>
        <button onClick={async()=>{
          const r = await fetch("/api/stripe-test",{method:"POST"});
          const j = await r.json(); if(j.url) window.location.href=j.url; else alert("Stripe Fehler");
        }} style={btn}>Stripe Test</button>
      </div>
    </main>
  );
}
const btn = { padding: "12px 14px", borderRadius: 12, border: "1px solid #333", background: "#F2C94C", color: "#111", textAlign: "left", fontWeight: 600 };
