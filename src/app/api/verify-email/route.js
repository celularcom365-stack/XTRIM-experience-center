import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  console.log(token)
  const record = await db.emailVerification.findFirst({
    where: { 
        token,
        used:false
     }
  });
  if (!record || record.used) {
    return NextResponse.json({ error: "Token inválido ❌" }, { status: 400 });
  }

  if (new Date() > record.expiresAt) {
    return NextResponse.json({ error: "Token expirado ❌" }, { status: 400 });
  }

  // Activar usuario
  await db.user.update({
    where: { id: record.userId },
    data: {
      emailVerified: true,
      state: "ACTIVE"
    }
  });

  // Invalidar token
  await db.emailVerification.update({
    where: {
        id: record.id
    },
    data: { used: true }
  });

  return NextResponse.json({
    message: "Email confirmado correctamente ✅"
  });
}
