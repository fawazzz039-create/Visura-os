import { NextResponse } from "next/server";
import { db } from "@/db";
import { arts } from "@/db/schema";

// GET /api/arts - Get all artworks
export async function GET() {
  try {
    const allArts = await db.select().from(arts);
    return NextResponse.json({ success: true, data: allArts });
  } catch (error) {
    console.error("Error fetching arts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch arts" },
      { status: 500 }
    );
  }
}

// POST /api/arts - Create a new artwork
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, imageUrl, medium, dimensions, isEncrypted, artistId, artistName } = body;

    const newArt = await db.insert(arts).values({
      title,
      description,
      price,
      imageUrl,
      medium: medium || "digital",
      dimensions,
      isEncrypted: isEncrypted ?? true,
      artistId,
      artistName: artistName || "Unknown Artist",
      rightsProtected: true,
    }).returning();

    return NextResponse.json({ success: true, data: newArt[0] });
  } catch (error) {
    console.error("Error creating art:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create art" },
      { status: 500 }
    );
  }
}
