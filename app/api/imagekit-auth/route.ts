import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
    const token = crypto.randomBytes(16).toString("hex"); // random token
    const expire = Math.floor(Date.now() / 1000) + 2400; // 40 mins from now

    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex");

    return NextResponse.json({ token, expire, signature });
  } catch (err) {
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
