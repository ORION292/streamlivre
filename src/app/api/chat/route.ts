import { NextRequest, NextResponse } from "next/server";
import { getAllTitles } from "@/lib/data";
import { siteConfig } from "@/lib/theme";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const titles = getAllTitles();
    const catalogSummary = titles
      .map(
        (t) =>
          `- ${t.title} (${t.year}, ${t.type}): ${t.synopsis.slice(0, 120)}... | Onde assistir: ${t.whereToWatch.map((w) => w.platform).join(", ")} | Dublado: ${t.dubbed ? "sim" : "não"}`
      )
      .join("\n");

    const systemPrompt = `Você é a ${siteConfig.assistant.name}, assistente do site ${siteConfig.name}. 
Ajude o visitante a encontrar animes, filmes, séries e novelas no nosso catálogo. 
Recomende títulos, diga sinopse curta, informe onde assistir oficialmente e se há versão dublada. 
Nunca forneça links de torrents, downloads ilegais ou fontes não autorizadas. 
Seja amigável, descontraída e responda em português brasileiro de forma curta e clara.

Catálogo atual:
${catalogSummary}`;

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_BASE_URL || "https://api.openai.com/v1";
    const model = process.env.AI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      const lastUser = messages.filter((m: { role: string }) => m.role === "user").pop()?.content?.toLowerCase() || "";
      let reply = "No momento o assistente de IA está em modo local (sem chave de API). ";

      const found = titles.filter(
        (t) =>
          t.title.toLowerCase().includes(lastUser) ||
          t.genres.some((g) => g.toLowerCase().includes(lastUser)) ||
          lastUser.includes(t.type)
      );

      if (found.length > 0) {
        reply += `Encontrei estes títulos que podem te interessar:\n\n`;
        found.slice(0, 3).forEach((t) => {
          reply += `• **${t.title}** (${t.year}) — ${t.synopsis.slice(0, 100)}...\n  Onde assistir: ${t.whereToWatch.map((w) => w.platform).join(", ")}\n\n`;
        });
      } else {
        reply += `Temos clássicos como Nosferatu, Metropolis, Big Buck Bunny e mais. Me diga um gênero (terror, ficção científica, animação...) ou um título que eu te indico!`;
      }

      return NextResponse.json({ reply });
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_tokens: 400,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("AI API error:", err);
      return NextResponse.json({
        reply: "Desculpe, tive um probleminha técnico. Tenta de novo em instantes!",
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Não consegui gerar uma resposta.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { reply: "Ops, algo deu errado. Tenta novamente." },
      { status: 500 }
    );
  }
}
