import AppNavbar from "@/components/layout/app-navbar";
import { Home } from "lucide-react";
import type React from "react";

const navItems = [{
    label: "Home",
    href: "/u/home",
    icon: <Home />
}]

export default function ProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>
        <AppNavbar navItems={navItems} />
        {children}
    </>
}