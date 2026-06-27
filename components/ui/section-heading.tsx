import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
        {description}
      </p>
    </div>
  );
}
