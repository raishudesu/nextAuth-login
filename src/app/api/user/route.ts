import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();

    const users = await User.find();

    if (!users) {
      return NextResponse.json(
        { success: false, msg: "No users" },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
