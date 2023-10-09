import { NextResponse } from "next/server";

type Params = {
  tag: string;
};

export const GET = async (req: Request, { params }: { params: Params }) => {
  const { tag } = params;
  try {
    return NextResponse.json(tag);
  } catch (error) {
    return NextResponse.json(error);
  }
};
