import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { Title } from "@/types";

const DATA_PATH = path.join(process.cwd(), "src/data/titles.json");

function readTitles(): Title[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeTitles(titles: Title[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(titles, null, 2), "utf-8");
}

export async function GET() {
  try {
    const titles = readTitles();
    return NextResponse.json({ titles });
  } catch {
    return NextResponse.json({ titles: [] });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (body.action === "login") {
    if (body.password === adminPassword) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  if (body.action === "add") {
    if (body.password !== adminPassword) {
      return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });
    }
    try {
      const titles = readTitles();
      const exists = titles.some((t) => t.id === body.title.id);
      if (exists) {
        return NextResponse.json({ ok: false, error: "ID já existe" });
      }
      titles.push(body.title);
      writeTitles(titles);
      return NextResponse.json({ ok: true, titles });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ ok: false, error: "Erro ao salvar" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: false }, { status: 400 });
}
