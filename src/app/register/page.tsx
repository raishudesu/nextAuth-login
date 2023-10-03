import RegisterForm from "@/components/Forms/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return (
    <div className="h-screen flex items-center">
      <RegisterForm />
    </div>
  );
}
