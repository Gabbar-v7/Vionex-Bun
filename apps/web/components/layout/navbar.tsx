"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { Menu, Zap } from "lucide-react";
import Link from "next/link";
import Logo from "../logo";

export default function Navbar() {
    const [sheetOpen, setSheetOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="mx-auto flex h-14 items-center justify-between px-4 md:px-6">

                {/* Logo */}
                <Logo />

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" className="font-medium" asChild>
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                    <Button className="font-medium" asChild>
                        <Link href="/signup">
                            Sign Up
                        </Link>
                    </Button>
                </div>

                {/* Mobile Hamburger */}
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden h-8 w-8"
                            aria-label="Open menu"
                        >
                            <Menu className="h-4 w-4" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-72 p-0 flex flex-col">
                        <SheetHeader className="px-5 pt-5 pb-4 border-b">
                            <SheetTitle asChild>
                                <Link
                                    href="/"
                                    className="flex items-center gap-2"
                                    onClick={() => setSheetOpen(false)}
                                >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                        <Zap className="h-4 w-4" />
                                    </div>
                                    <span className="text-base font-semibold">Vionex</span>
                                </Link>
                            </SheetTitle>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>

                        {/* Nav items go here */}
                        <div className="flex-1 overflow-y-auto px-3 py-4" />

                        {/* Footer Actions */}
                        <div className="border-t px-4 py-4 flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setSheetOpen(false)}
                                asChild
                            >
                                <Link href="/login">
                                    Login
                                </Link>
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => setSheetOpen(false)}
                                asChild
                            >
                                <Link href="/signup">
                                    Sign Up
                                </Link>
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}