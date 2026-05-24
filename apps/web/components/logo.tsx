import Image from "next/image";
import Link from "next/link";

type LogoProps = {
    href?: string;
};

export function Logo({ href = "/" }: LogoProps) {
    return (
        <Link href={href} className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Image
                    width={40} height={40} src="/assets/images/logo-dark.webp" alt="logo" />
            </div>

            <span className="text-base font-semibold tracking-tight">
                Vionex
            </span>
        </Link>
    );
}