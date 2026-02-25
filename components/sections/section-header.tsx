import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  title: string
  subtitle?: string
  align?: "left" | "center"
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-3",
        align === "center" && "items-center text-center"
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-muted-foreground text-base leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
      <div className="mt-2 h-1 w-12 rounded-full bg-primary/60" />
    </div>
  )
}
