"use client"

import { Award, Medal, Star, Trophy, ExternalLink } from "lucide-react"
import type { Achievement } from "@/data/portfolio"

const iconMap = {
  trophy: Trophy,
  medal: Medal,
  star: Star,
  award: Award,
}

export function AchievementCard({
  title,
  description,
  date,
  icon,
  link,
}: Achievement) {
  const Icon = iconMap[icon]

  return (
    <article className="group relative flex gap-4 rounded-xl border border-white/[0.08] bg-card/50 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_0_30px_-5px] hover:shadow-primary/10">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
        <Icon className="size-5" />
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <span className="shrink-0 text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            aria-label={`Learn more about ${title}`}
          >
            Learn more
            <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </article>
  )
}
