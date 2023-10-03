"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        pwd,
        redirect: false,
      });

      if (res?.error) {
        console.log("Error");
        return;
      }
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label className="text-2xl">Sign in</Label>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <Button type="submit">Sign in</Button>
      </form>
      <Label>
        Doesn&apos;t have an account? <Link href={"/register"}>Sign up</Link>
      </Label>
    </div>
  );
};

export default SigninForm;
