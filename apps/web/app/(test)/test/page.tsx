"use client"

import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { authClient } from "@packages/auth/client";

export default function Test() {
    const { data: user } = authClient.useSession()


    return <>
        <Navbar />
        <p>{user?.user.email}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </>
}