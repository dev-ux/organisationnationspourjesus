import { NextResponse } from "next/server";
import { departments } from "../../../data/departments";

export async function GET() {
  return NextResponse.json({ departments });
}

export async function POST(request: Request) {
  try {
    // Pour l'instant, on n'utilise pas d'authentification
    const data = await request.json();
    
    // Simuler l'ajout d'un département
    const newDepartment = {
      id: Date.now().toString(),
      ...data
    };
    
    return NextResponse.json(newDepartment);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'ajout du département" },
      { status: 500 }
    );
  }
}
