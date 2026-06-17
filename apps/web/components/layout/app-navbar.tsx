"use client";

import { useState, type JSX } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Settings,
    HelpCircle,
    LogOut,
    UserCircle,
    ChevronDown,
    Menu,
} from "lucide-react";
import Link from "next/link";
import Logo from "../logo";

type AppNavbarProps = {
    user: {
        name: string,
        email: string,
        image: string,
    },
    navItems: {
        label: string,
        href: string,
        icon: JSX.Element
    }[]
}


export default function AppNavbar({ user, navItems }: AppNavbarProps) {
    const [sheetOpen, setSheetOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            //    TODO 
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto flex h-14 items-center justify-between px-4 md:px-6">

                {/* ── LEFT: Logo ── */}
                <Logo />

                {/* ── DESKTOP NAV ── */}
                <nav className="hidden md:flex items-center gap-0.5">
                    {navItems.map(({ label, href, icon }) => (
                        <Link
                            key={label}
                            href={href}
                            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            {icon}
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* ── RIGHT ACTIONS ── */}
                <div className="flex items-center gap-1.5">
                    {/* Settings dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hidden md:flex gap-1.5 h-8 px-2.5 text-sm font-medium text-muted-foreground">
                                <Settings className="h-3.5 w-3.5" />
                                Settings
                                <ChevronDown className="h-3 w-3 opacity-60" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel className="font-normal">
                                <p className="text-xs font-semibold text-foreground">Settings</p>
                                <p className="text-[11px] text-muted-foreground">Manage your preferences</p>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {/* Account — redirects to /settings */}
                            <Link href="/settings" className="no-underline">
                                <DropdownMenuItem className="flex items-start gap-2 py-2 cursor-pointer">
                                    <UserCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-medium leading-none">Account</span>
                                        <span className="text-[11px] text-muted-foreground leading-none">Manage your account</span>
                                    </div>
                                </DropdownMenuItem>
                            </Link>

                            {/* Help — redirects to /help */}
                            <Link href="/help" className="no-underline">
                                <DropdownMenuItem className="flex items-start gap-2 py-2 cursor-pointer">
                                    <HelpCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-sm font-medium leading-none">Help</span>
                                        <span className="text-[11px] text-muted-foreground leading-none">Support &amp; docs</span>
                                    </div>
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleSignOut}
                                className="flex items-center gap-2 text-destructive cursor-pointer focus:text-destructive"
                            >
                                <LogOut className="h-3.5 w-3.5" />
                                <span className="text-sm font-medium">Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* ── MOBILE HAMBURGER ── */}
                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                                <Menu className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72 p-0 flex flex-col">
                            <SheetHeader className="px-5 pt-5 pb-4 border-b">
                                <SheetTitle asChild>
                                    <Logo />
                                </SheetTitle>
                            </SheetHeader>

                            {/* Nav links */}
                            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                                <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    Navigation
                                </p>
                                {navItems.map(({ label, href, icon }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        onClick={() => { setSheetOpen(false); }}
                                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    >
                                        {icon}
                                        {label}
                                    </Link>
                                ))}

                                <Separator className="my-3" />

                                <p className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                    Settings
                                </p>

                                {/* Account */}
                                <Link
                                    href="/settings"
                                    onClick={() => setSheetOpen(false)}
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors no-underline"
                                >
                                    <UserCircle className="h-4 w-4 shrink-0" />
                                    Account
                                </Link>

                                {/* Help */}
                                <Link
                                    href="/help"
                                    onClick={() => setSheetOpen(false)}
                                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors no-underline"
                                >
                                    <HelpCircle className="h-4 w-4 shrink-0" />
                                    Help
                                </Link>
                            </div>

                            {/* User footer */}
                            <div className="border-t px-4 py-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.image} />
                                        <AvatarFallback>{">."}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold truncate">{user.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                    </div>
                                    <Button onClick={handleSignOut} variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground">
                                        <LogOut className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                </div>
            </div>
        </header>
    );
}