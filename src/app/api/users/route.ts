import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";

// GET /api/users - Get all users
export async function GET() {
  try {
    const allUsers = await db.select().from(users);
    return NextResponse.json({ success: true, data: allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, password } = body;

    const newUser = await db.insert(users).values({
      name,
      email,
      role: role || "user",
      password: password || "",
    }).returning();

    return NextResponse.json({ success: true, data: newUser[0] });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create user" },
      { status: 500 }
    );
  }
}
