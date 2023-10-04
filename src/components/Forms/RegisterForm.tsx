"use client";

import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUp } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TSignup } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/lib/schemas";
import { useToast } from "../ui/use-toast";

const RegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignup>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "", // Set your default email value here
      pwd: "", // Set your default password value here
      confirmPwd: "",
    },
  });

  const failedToast = (msg: string) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: msg,
    });
  };

  const successToast = (msg: string) => {
    toast({
      title: "Success!",
      description: msg,
    });
  };

  const formSubmit = async (data: TSignup) => {
    const { name, email, pwd } = data;
    try {
      const res = await signUp(name, email, pwd);
      if (!res.success) {
        failedToast(res.msg);
        return;
      }

      successToast(res.msg);
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-4">
        <Label className="text-2xl">Sign up</Label>
        <Input {...register("name")} type="text" placeholder="Username" />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
        <Input {...register("email")} type="text" placeholder="Email" />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
        <Input {...register("pwd")} type="password" placeholder="Password" />
        {errors.pwd && (
          <span className="text-red-500 text-sm">{errors.pwd.message}</span>
        )}
        <Input
          {...register("confirmPwd")}
          type="password"
          placeholder="Confirm password"
        />
        {errors.confirmPwd && (
          <span className="text-red-500 text-sm">
            {errors.confirmPwd.message}
          </span>
        )}
        <Button type="submit">Sign up</Button>
      </form>
      <Label>
        Have an account? <Link href={"/"}>Sign in</Link>
      </Label>
    </div>
  );
};

export default RegisterForm;
