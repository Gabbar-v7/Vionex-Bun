import type React from "react";

import { auth } from "@packages/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AppNavbar from "@/components/layout/app-navbar";

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/login");

  return (
    <>
      <AppNavbar user={session.user} />
      {children}
    </>
  );
}
