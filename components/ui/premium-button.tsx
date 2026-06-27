import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function PremiumButton({
  href,
  children,
  accent,
  className,
}: {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5",
        accent
          ? "bg-white text-black shadow-[0_18px_60px_rgba(255,255,255,0.16)]"
          : "border border-white/12 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}
