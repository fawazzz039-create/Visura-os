import { NextResponse } from "next/server";
import { db } from "@/db";
import { transactions } from "@/db/schema";

// GET /api/transactions - Get all transactions
export async function GET() {
  try {
    const allTransactions = await db.select().from(transactions);
    return NextResponse.json({ success: true, data: allTransactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

// POST /api/transactions - Create a new transaction
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, itemId, itemType, amount, paymentMethod, status } = body;

    const newTransaction = await db.insert(transactions).values({
      userId,
      itemId,
      itemType,
      amount,
      paymentMethod,
      status: status || "pending",
    }).returning();

    return NextResponse.json({ success: true, data: newTransaction[0] });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
