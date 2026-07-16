"use client";

import { Menu, Pencil } from "lucide-react";
import Link from "next/link";

import Logo from "../logo";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ThemePicker from "./theme-picker";
import { Separator } from "../ui/separator";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 mx-auto flex h-(--navbar-height) w-full items-center justify-between border-b bg-background px-4 md:px-12">
      <Logo />

      <DesktopActions />
      <MobileMenu />
    </header>
  );
}

function DesktopActions() {
  return (
    <>
      <nav className="hidden items-center gap-5 md:flex">
        <Button asChild variant="secondary" className="text-base font-semibold">
          <Link href="#">Primary Action</Link>
        </Button>
      </nav>

      <nav className="hidden items-center gap-5 md:flex">
        <Button asChild variant="outline">
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </nav>
    </>
  );
}

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 md:hidden">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-72 flex-col">
        <SheetHeader className="border-b px-5">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-0.5 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2 text-base font-semibold tracking-wider text-muted-foreground uppercase">
            Navigation
          </p>
          <SheetClose asChild>
            <Link
              className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:bg-muted"
              href="#"
            >
              <Pencil className="size-4" />
              Primary Action
            </Link>
          </SheetClose>
          <Separator className="my-3" />
          <p className="mb-2 px-2 text-base font-semibold tracking-wider text-muted-foreground uppercase">
            Preference
          </p>
          <ThemePicker />
        </div>

        <SheetFooter className="border-t">
          <Button asChild variant="outline">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
