// pages/api/chi.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const token = req.headers["x-secret-token"];
  if (token !== process.env.CHI_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message missing" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Du bist CHIBot. Geheimer Schutz & Assistent von Jule (piHOCH2). Antworte kurz, präzise, loyal." },
          { role: "user", content: message },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenAI error:", response.status, text);
      return res.status(502).json({ error: "Upstream AI error" });
    }

    const data = await response.json();
    return res.status(200).json({ reply: data.choices?.[0]?.message?.content ?? "…" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "CHIBot failed internally" });
  }
}
