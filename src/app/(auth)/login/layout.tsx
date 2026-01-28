import { redirect } from "next/navigation";

import { auth } from "@/app/auth.config";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <>{children}</>;
}
