import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

type TUserParams = {
  slug: string[];
};

export const GET = async (
  req: Request,
  { params }: { params: TUserParams }
) => {
  const { slug } = params;
  try {
    await connectDB();

    const user = await User.findById(slug[0]);

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
