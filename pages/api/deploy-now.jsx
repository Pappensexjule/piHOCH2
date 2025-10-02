export default function DeployNow(){
  async function go(){
    const r = await fetch("/api/deploy", { method:"POST" });
    const j = await r.json().catch(()=> ({}));
    alert(JSON.stringify(j));
  }
  return (
    <main style={{padding:24,fontFamily:"system-ui"}}>
      <h1>Deploy auslösen</h1>
      <button onClick={go} style={{padding:12,borderRadius:10}}>Jetzt deployen</button>
      <p>Nach Erfolg: <a href="/finchi">/finchi</a> öffnen.</p>
    </main>
  );
}
