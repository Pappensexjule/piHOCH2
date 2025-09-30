// app/api/chi/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = req.headers.get("x-secret-token");
  if (token !== process.env.CHI_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = body?.message;
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message missing" }, { status: 400 });
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
      return NextResponse.json({ error: "Upstream AI error" }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json({ reply: data.choices?.[0]?.message?.content ?? "…" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "CHIBot failed internally" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ error: "Only POST allowed" }, { status: 405 });
}
