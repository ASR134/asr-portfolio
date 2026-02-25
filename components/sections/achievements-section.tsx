"use client"

import { achievements } from "@/data/portfolio"

function TimelineItem({
  title,
  description,
  date,
  link,
  isLast,
}: {
  title: string
  description: string
  date: string
  link?: string
  isLast: boolean
}) {
  return (
    <div className="group relative flex gap-6 sm:gap-10">
      {/* Timeline line and dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div className="relative z-10 mt-1.5 size-3 shrink-0 rounded-full border border-terminal-green bg-terminal-bg transition-all duration-300 group-hover:animate-glow-dot group-hover:bg-terminal-green/30" />
        {/* Line */}
        {!isLast && (
          <div className="w-px flex-1 bg-terminal-dim" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-10 ${isLast ? "" : ""}`}>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm font-bold text-foreground transition-colors hover:text-terminal-green"
            >
              {title}
            </a>
          ) : (
            <h3 className="font-mono text-sm font-bold text-foreground">
              {title}
            </h3>
          )}
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {date}
          </span>
        </div>
        <p className="mt-2 max-w-lg font-mono text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="py-24 px-6 md:px-12 lg:px-24"
      aria-label="Achievements"
    >
      {/* Section label */}
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <span className="text-terminal-green">{"04"}</span>
          {" / LOG"}
        </p>
      </div>

      <div className="max-w-2xl">
        {achievements.map((achievement, i) => (
          <TimelineItem
            key={achievement.title}
            {...achievement}
            isLast={i === achievements.length - 1}
          />
        ))}
      </div>
    </section>
  )
}
