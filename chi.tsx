// pages/chi.tsx
import { useState } from "react";

export default function ChiPage() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const secret = process.env.NEXT_PUBLIC_CHI_SECRET || "";

  async function sendMessage() {
    if (!msg.trim() || !secret) return;
    setBusy(true);
    try {
      const res = await fetch("/api/chi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-secret-token": secret,
        },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setChat((c) => [...c, `👩: ${msg}`, `🤖: ${data.reply ?? "…"}`]);
      setMsg("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="p-6 min-h-screen bg-black text-green-400 font-mono">
      <h1 className="text-xl mb-4">CHIBot Console</h1>
      {!secret && (
        <div className="mb-4 p-3 border border-red-500 text-red-300">
          Missing NEXT_PUBLIC_CHI_SECRET – set it in Vercel first.
        </div>
      )}
      <div className="space-y-2 mb-4">
        {chat.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 p-2 bg-gray-900 border border-green-500"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Sprich mit CHI…"
          onKeyDown={(e) => e.key === "Enter" ? sendMessage() : null}
          disabled={busy}
        />
        <button
          className="px-4 py-2 bg-green-700 hover:bg-green-600 disabled:opacity-50"
          onClick={sendMessage}
          disabled={busy}
        >
          {busy ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}
