import { NextResponse } from "next/server";

let pastorMessage = {
  title: "",
  content: "",
  image: ""
};

export async function GET() {
  return NextResponse.json({ message: pastorMessage });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    pastorMessage = data;
    return NextResponse.json({ message: "Message mis à jour avec succès" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du message" },
      { status: 500 }
    );
  }
}
