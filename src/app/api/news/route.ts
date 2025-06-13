import { NextResponse } from "next/server";

interface NewsItem {
  title: string;
  content: string;
  date: string;
  // Add other properties as needed
}

let news: NewsItem[] = [];

export async function GET() {
  return NextResponse.json({ news });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    news = [...news, data];
    return NextResponse.json({ message: "Actualité ajoutée avec succès" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'ajout de l'actualité" },
      { status: 500 }
    );
  }
}
