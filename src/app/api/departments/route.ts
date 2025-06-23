import { NextResponse } from "next/server";
import { departments } from "../../../data/departments";

export async function GET() {
  return NextResponse.json({ departments });
}

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Vérifier si l'utilisateur est admin
    if (session.user?.email !== "admin@example.com") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    console.log('Received department data:', body);
    
    // Add validation
    if (!body.title || !body.description || !body.image) {
      return NextResponse.json(
        { error: "Missing required fields. Please provide title, description, and image." },
        { status: 400 }
      );
    }

    // Add new department to the data
    const newDepartment = {
      ...body,
      icon: "department", // Default icon
    };
    
    // Update the departments data
    departments.push(newDepartment);
    console.log('Department added successfully:', newDepartment);

    return NextResponse.json({ department: newDepartment });
  } catch (error) {
    console.error("Error adding department:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: "Failed to add department. Error: " + errorMessage },
      { status: 500 }
    );
  }
}
