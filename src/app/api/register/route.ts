import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import connectDB from "@/lib/mongodb";

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, pwd, confirmPwd } = await req.json();
    const hashedPwd = await bcrypt.hash(pwd, 10);

    await connectDB();

    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "User already exists",
      });

    if (pwd !== confirmPwd) {
      return NextResponse.json({
        success: false,
        status: 400,
        msg: "Passwords do not match",
      });
    }

    await User.create({ name, email, password: hashedPwd });

    return NextResponse.json({
      success: true,
      status: 201,
      msg: "User registered",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 500,
      msg: "Internal server error",
    });
  }
};
