"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col">
      Dashboard
      <div>{session?.user?.name}</div>
      <div>{session?.user?.email}</div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};

export default UserInfo;
