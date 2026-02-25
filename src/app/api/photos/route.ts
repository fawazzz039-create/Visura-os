import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { photos } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/photos - Get all photos
export async function GET() {
  try {
    const db = getDb();
    const allPhotos = await db.select().from(photos);
    return NextResponse.json({ success: true, data: allPhotos });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

// POST /api/photos - Create a new photo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, imageUrl, category, isEncrypted, artistId, artistName } = body;

    const db = getDb();
    const newPhoto = await db.insert(photos).values({
      title,
      description,
      price,
      imageUrl,
      category: category || "general",
      isEncrypted: isEncrypted ?? true,
      artistId,
      artistName: artistName || "Unknown Artist",
      rightsProtected: true,
    }).returning();

    return NextResponse.json({ success: true, data: newPhoto[0] });
  } catch (error) {
    console.error("Error creating photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create photo" },
      { status: 500 }
    );
  }
}
