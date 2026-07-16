import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
};

export default function Logo({ href = "/" }: LogoProps) {
  return (
    <Link href={href} className="flex shrink-0 items-center gap-2">
      <Image
        width={40}
        height={40}
        src="/assets/images/logo-dark.webp"
        alt="logo"
        className="h-8 w-8"
      />

      <span className="text-base font-semibold tracking-tight">Vionex</span>
    </Link>
  );
}
