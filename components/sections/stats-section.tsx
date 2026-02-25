"use client"

import { useMemo } from "react"
import { generateHeatmapData, stats } from "@/data/portfolio"

const heatmapColors = [
  "#0d1117",
  "#003d1f",
  "#00662e",
  "#00993e",
  "#00FF87",
]

export function StatsSection() {
  const data = useMemo(() => generateHeatmapData(), [])

  // 52 columns (weeks) x 7 rows (days)
  const weeks: number[][] = []
  for (let w = 0; w < 52; w++) {
    const week: number[] = []
    for (let d = 0; d < 7; d++) {
      const idx = w * 7 + d
      week.push(idx < data.length ? data[idx] : 0)
    }
    weeks.push(week)
  }

  return (
    <section
      id="stats"
      className="blueprint-grid py-24 px-6 md:px-12 lg:px-24"
      aria-label="Activity stats"
    >
      {/* Section label */}
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <span className="text-terminal-green">{"04"}</span>
          {" / STATS"}
        </p>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto pb-4 scrollbar-terminal">
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(52, 12px)`,
            gridTemplateRows: `repeat(7, 12px)`,
            gridAutoFlow: "column",
          }}
          role="img"
          aria-label="GitHub-style contribution heatmap showing activity over the past year"
        >
          {weeks.map((week, wIdx) =>
            week.map((level, dIdx) => (
              <div
                key={`${wIdx}-${dIdx}`}
                className="rounded-[2px] transition-colors duration-150"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: heatmapColors[level] || heatmapColors[0],
                }}
                aria-hidden="true"
              />
            ))
          )}
        </div>
      </div>

      {/* Heatmap legend */}
      <div className="mt-4 flex items-center gap-2">
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
          {"less"}
        </span>
        {heatmapColors.map((color, i) => (
          <div
            key={i}
            className="size-3 rounded-[2px]"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
        ))}
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
          {"more"}
        </span>
      </div>

      {/* Stat counters */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-10">
        {stats.map((stat) => (
          <div key={stat.command} className="flex flex-col gap-1">
            <p className="font-mono text-[11px] tracking-wider text-muted-foreground">
              {stat.command}
            </p>
            <p className="font-mono text-4xl font-bold tracking-tight text-terminal-green sm:text-5xl">
              {stat.value}
            </p>
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground/60 uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
