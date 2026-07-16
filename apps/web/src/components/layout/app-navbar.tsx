"use client";

import { authClient } from "@packages/auth/client";
import {
  ChevronDown,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
  UserCircle,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Logo from "../logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
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

type AppNavbarProps = {
  user: typeof authClient.$Infer.Session.user;
  navItems?: {
    label: string;
    href: string;
    icon: LucideIcon;
  }[];
};

const defaultNavItems: NonNullable<AppNavbarProps["navItems"]> = [
  {
    label: "Home",
    href: "/u/home",
    icon: Home,
  },
];

export default function AppNavbar({ user, navItems = defaultNavItems }: AppNavbarProps) {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient
      .signOut()
      .then(() => router.push("/login"))
      .catch((error) => toast.error(error.message));
  };

  return (
    <header className="sticky top-0 z-50 mx-auto flex h-(--navbar-height) w-full items-center justify-between border-b bg-background px-4 md:px-12">
      <Logo />

      <DesktopActions navItems={navItems} handleSignOut={handleSignOut} />
      <MobileMenu user={user} navItems={navItems} handleSignOut={handleSignOut} />
    </header>
  );
}

function DesktopActions({
  navItems,
  handleSignOut,
}: {
  navItems: NonNullable<AppNavbarProps["navItems"]>;
  handleSignOut: () => Promise<void>;
}) {
  return (
    <>
      <nav className="hidden items-center gap-0.5 md:flex">
        {navItems!.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-base font-semibold hover:bg-muted"
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="hidden items-center px-2.5 text-sm font-medium md:flex"
          >
            <Settings className="size-3.5" />
            Settings
            <ChevronDown className="size-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 gap-0.5">
          <DropdownMenuItem asChild>
            <Link href="/u/settings/account">
              <UserCircle className="size-4" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <ThemePicker />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/help">
              <HelpCircle className="size-4" />
              Help
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function MobileMenu({
  user,
  handleSignOut,
  navItems,
}: {
  user: AppNavbarProps["user"];
  navItems: NonNullable<AppNavbarProps["navItems"]>;
  handleSignOut: () => Promise<void>;
}) {
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
          {navItems.map(({ label, href, icon: Icon }) => (
            <SheetClose asChild key={label}>
              <Link
                className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:bg-muted"
                id={label}
                href={href}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            </SheetClose>
          ))}
          <Separator className="my-3" />
          <p className="mb-2 px-2 text-base font-semibold tracking-wider text-muted-foreground uppercase">
            Settings
          </p>
          <SheetClose asChild>
            <Link
              className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:bg-muted"
              href="/u/settings/account"
            >
              <UserCircle className="size-4" />
              Account
            </Link>
          </SheetClose>
          <ThemePicker />
          <SheetClose asChild>
            <Link
              className="flex items-center gap-3 px-3 py-2 text-base font-medium hover:bg-muted"
              href="/help"
            >
              <HelpCircle className="size-4" />
              Help
            </Link>
          </SheetClose>
        </div>

        <SheetFooter className="border-t">
          <span className="flex flex-row items-center justify-between">
            <Avatar className="size-9">
              <AvatarImage src={user.image ?? undefined} />
              <AvatarFallback>{"> ."}</AvatarFallback>
            </Avatar>
            <span>
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </span>
            <Button
              className="size-8 shrink-0 p-4"
              onClick={handleSignOut}
              variant="destructive"
              size="icon"
            >
              <LogOut className="size-4" />
            </Button>
          </span>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
