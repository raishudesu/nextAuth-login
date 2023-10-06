import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "You must be logged in." },
      { status: 401 }
    );
  }
  return NextResponse.json({ msg: "hello" }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  return NextResponse.json({ msg: `This ur id ${id}` }, { status: 200 });
}
