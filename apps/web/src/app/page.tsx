import { auth } from "@packages/auth/server";
import { headers } from "next/headers";

import AppNavbar from "@/components/layout/app-navbar";
import Navbar from "@/components/layout/navbar";

export default async function Index() {
  const session = await auth.api.getSession({ headers: await headers() });

  return <>{session?.user ? <AppNavbar user={session.user} /> : <Navbar />}</>;
}
