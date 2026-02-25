import { NextResponse } from "next/server";
import { generateEncryptionKey, exportKey, importKey, encryptData, decryptData, generateContentFingerprint, hashContent } from "@/lib/encryption";

// POST /api/encrypt - Encrypt content
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, data, key, iv } = body;

    if (action === "generateKey") {
      const encryptionKey = await generateEncryptionKey();
      const exportedKey = await exportKey(encryptionKey);
      return NextResponse.json({ success: true, key: exportedKey });
    }

    if (action === "encrypt" && data) {
      let encryptionKey;
      
      if (key) {
        encryptionKey = await importKey(key);
      } else {
        encryptionKey = await generateEncryptionKey();
      }
      
      const result = await encryptData(data, encryptionKey);
      const fingerprint = generateContentFingerprint(data);
      const hash = await hashContent(data);
      const exportedKey = await exportKey(encryptionKey);
      
      return NextResponse.json({
        success: true,
        encrypted: result.encrypted,
        iv: result.iv,
        key: exportedKey,
        fingerprint,
        hash
      });
    }

    if (action === "decrypt" && data && iv && key) {
      const encryptionKey = await importKey(key);
      const decrypted = await decryptData(data, iv, encryptionKey);
      return NextResponse.json({ success: true, data: decrypted });
    }

    if (action === "fingerprint" && data) {
      const fingerprint = generateContentFingerprint(data);
      const hash = await hashContent(data);
      return NextResponse.json({ success: true, fingerprint, hash });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action or missing parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Encryption error:", error);
    return NextResponse.json(
      { success: false, error: "Encryption operation failed" },
      { status: 500 }
    );
  }
}
