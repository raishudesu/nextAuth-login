import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

type TUserParams = {
  id: string;
};

export const GET = async (
  req: Request,
  { params }: { params: TUserParams }
) => {
  try {
    const { id } = params;
    await connectDB();

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, msg: "No such user" },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
};
