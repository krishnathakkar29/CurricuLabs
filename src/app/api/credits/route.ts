import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return NextResponse.json(
      {
        credits: user.credits,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching credits:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
