"use client"

import { useMemo } from "react"
import { leetcode, generateLeetcodeHeatmap } from "@/data/portfolio"

const heatmapColors = ["#0d1f14", "#0a3d1f", "#00873a", "#00CC66", "#00FF87"]
const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"]
const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""]

// -- SVG Donut Ring --
function DonutChart() {
  const { easy, medium, hard } = leetcode.breakdown
  const totalSolved = easy.solved + medium.solved + hard.solved
  const radius = 72
  const stroke = 9
  const circumference = 2 * Math.PI * radius

  const segments = [
    { solved: easy.solved, color: "#00FF87", label: "easy" },
    { solved: medium.solved, color: "#FFB547", label: "medium" },
    { solved: hard.solved, color: "#FF4D4D", label: "hard" },
  ]

  // Calculate arcs with proper offsets (no negative arcs)
  const gapAngle = 0.02 // radians gap between segments
  const totalGap = gapAngle * segments.length
  const usableCircumference = circumference * (1 - totalGap / (2 * Math.PI))

  let cumulativeAngle = -Math.PI / 2 // start at top

  const arcs = segments.map((seg) => {
    const fraction = seg.solved / totalSolved
    const arcLength = fraction * usableCircumference
    const dashOffset = circumference - (cumulativeAngle + Math.PI / 2) / (2 * Math.PI) * circumference
    const result = { ...seg, arcLength, dashOffset }
    cumulativeAngle += fraction * 2 * Math.PI * (1 - totalGap / (2 * Math.PI)) + gapAngle
    return result
  })

  return (
    <div className="relative flex shrink-0 items-center justify-center">
      <svg
        width={180}
        height={180}
        viewBox="0 0 180 180"
        role="img"
        aria-label={`${totalSolved} problems solved: ${easy.solved} easy, ${medium.solved} medium, ${hard.solved} hard`}
      >
        {/* Background track */}
        <circle
          cx={90}
          cy={90}
          r={radius}
          fill="none"
          stroke="#1A2A36"
          strokeWidth={stroke}
        />
        {/* Segments - draw using dasharray/dashoffset */}
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={90}
            cy={90}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth={stroke}
            strokeDasharray={`${arc.arcLength} ${circumference - arc.arcLength}`}
            strokeDashoffset={arc.dashOffset}
            strokeLinecap="round"
            className="transition-all duration-700"
            style={{ transform: "rotate(-90deg)", transformOrigin: "90px 90px" }}
          />
        ))}
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-3xl font-bold text-terminal-green">
          {totalSolved}
        </span>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          solved
        </span>
      </div>
    </div>
  )
}

// -- Difficulty bar --
function DifficultyBar({ label, solved, total, color }: { label: string; solved: number; total: number; color: string }) {
  const pct = Math.min((solved / total) * 100, 100)
  return (
    <div className="flex items-center gap-3">
      <span
        className="w-[4.5rem] shrink-0 text-right font-mono text-[11px] font-bold tracking-wider uppercase"
        style={{ color }}
      >
        {label}
      </span>
      <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-[#1A2A36]">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-24 shrink-0 font-mono text-[11px] tabular-nums tracking-wider text-muted-foreground">
        {solved}
        {" / "}
        {total}
      </span>
    </div>
  )
}

// -- Stat block --
function StatBlock({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="group flex flex-col gap-1.5 border border-[rgba(0,255,135,0.12)] bg-[rgba(10,17,24,0.8)] p-4 transition-all duration-300 hover:border-[rgba(0,255,135,0.45)] hover:bg-[rgba(10,17,24,0.95)]">
      <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
      <span className="font-mono text-3xl font-bold tabular-nums tracking-tight text-terminal-green transition-all duration-300 group-hover:[text-shadow:0_0_12px_rgba(0,255,135,0.5)]">
        {value}
      </span>
      <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60 uppercase">
        {sub}
      </span>
    </div>
  )
}

// -- Badge card --
function BadgeCard({ title, subtitle, recent }: { title: string; subtitle: string; recent: boolean }) {
  return (
    <div
      className="relative flex flex-col items-center gap-2 border px-5 py-5 text-center transition-all duration-300"
      style={{
        borderColor: recent ? "rgba(0,255,135,0.45)" : "rgba(0,255,135,0.12)",
        backgroundColor: "rgba(10,17,24,0.8)",
        boxShadow: recent ? "0 0 24px rgba(0,255,135,0.08), inset 0 0 12px rgba(0,255,135,0.03)" : "none",
      }}
    >
      <span className="text-2xl" aria-hidden="true">{"🏅"}</span>
      <span className="font-mono text-xs font-bold tracking-wider text-foreground">
        {title}
      </span>
      {subtitle && (
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
          {subtitle}
        </span>
      )}
      {recent && (
        <span className="mt-1 inline-block animate-hire-pulse font-mono text-[9px] tracking-widest text-terminal-green uppercase">
          {"★ MOST RECENT"}
        </span>
      )}
    </div>
  )
}

// -- Heatmap --
function SubmissionHeatmap() {
  const data = useMemo(() => generateLeetcodeHeatmap(), [])

  // Build 53 columns x 7 rows
  const weeks: number[][] = []
  for (let w = 0; w < 53; w++) {
    const week: number[] = []
    for (let d = 0; d < 7; d++) {
      const idx = w * 7 + d
      week.push(idx < data.length ? data[idx] : 0)
    }
    weeks.push(week)
  }

  return (
    <div className="mt-14">
      {/* Submission count line */}
      <p className="mb-5 font-mono text-[11px] tracking-wider text-muted-foreground">
        <span className="text-terminal-green/60">{">"}</span>
        {" "}
        {leetcode.heatmap.totalSubmissions.toLocaleString()}
        {" submissions in the past year  \u00b7  total active days: "}
        {leetcode.heatmap.activeDays}
        {"  \u00b7  max streak: "}
        {leetcode.heatmap.maxStreak}
      </p>

      {/* Scrollable heatmap container */}
      <div className="overflow-x-auto scrollbar-terminal">
        <div className="inline-block min-w-fit">
          {/* Month labels row */}
          <div className="mb-1 flex pl-8">
            {months.map((m, i) => (
              <span
                key={i}
                className="font-mono text-[9px] tracking-wider text-muted-foreground/50"
                style={{ width: `${(53 * 12) / 12}px`, minWidth: "52px" }}
              >
                {m}
              </span>
            ))}
          </div>

          {/* Grid with day labels */}
          <div className="flex">
            {/* Day labels */}
            <div className="flex w-8 shrink-0 flex-col gap-[2px]" aria-hidden="true">
              {dayLabels.map((d, i) => (
                <span
                  key={i}
                  className="flex h-[10px] items-center font-mono text-[8px] tracking-wider text-muted-foreground/40"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Heatmap grid */}
            <div
              className="grid gap-[2px]"
              style={{
                gridTemplateColumns: "repeat(53, 10px)",
                gridTemplateRows: "repeat(7, 10px)",
                gridAutoFlow: "column",
              }}
              role="img"
              aria-label="LeetCode submission heatmap showing activity over the past year"
            >
              {weeks.map((week, wIdx) =>
                week.map((level, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    className="rounded-[1.5px]"
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: heatmapColors[level] || heatmapColors[0],
                    }}
                    aria-hidden="true"
                  />
                ))
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center gap-1.5 pl-8">
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground/40">
              {"less"}
            </span>
            {heatmapColors.map((color, i) => (
              <div
                key={i}
                className="size-[10px] rounded-[1.5px]"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
            <span className="font-mono text-[9px] tracking-wider text-muted-foreground/40">
              {"more"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// -- Main Section --
export function LeetCodeSection() {
  const { profile, breakdown, badges } = leetcode

  return (
    <section
      id="leetcode"
      className="blueprint-grid py-24 px-6 md:px-12 lg:px-24"
      aria-label="LeetCode stats"
    >
      {/* Section label */}
      <div className="mb-2">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <span className="text-terminal-green">{"04"}</span>
          {" / LEETCODE"}
        </p>
      </div>
      <p className="mb-12 font-mono text-[11px] tracking-wider text-muted-foreground/50">
        <span className="text-terminal-green/50">{">"}</span>
        {" algorithmic thinking. problem solved."}
      </p>

      {/* PART 1: Top stats bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBlock
          label="solved"
          value={String(profile.solved)}
          sub={`/${profile.totalProblems}`}
        />
        <StatBlock
          label="contest rating"
          value={profile.contestRating.toLocaleString()}
          sub={profile.contestPercentile}
        />
        <StatBlock
          label="global ranking"
          value={profile.globalRanking.toLocaleString()}
          sub={`/${profile.totalUsers.toLocaleString()}`}
        />
        <StatBlock
          label="active days"
          value={String(profile.activeDays)}
          sub={`max stk: ${profile.maxStreak}`}
        />
      </div>

      {/* PART 2: Donut + Bars */}
      <div className="mt-12 flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
        <DonutChart />
        <div className="flex w-full flex-col gap-5">
          <DifficultyBar label="Easy" solved={breakdown.easy.solved} total={breakdown.easy.total} color="#00FF87" />
          <DifficultyBar label="Medium" solved={breakdown.medium.solved} total={breakdown.medium.total} color="#FFB547" />
          <DifficultyBar label="Hard" solved={breakdown.hard.solved} total={breakdown.hard.total} color="#FF4D4D" />
        </div>
      </div>

      {/* PART 3: Badges */}
      <div className="mt-14">
        <p className="mb-5 font-mono text-[11px] tracking-wider text-muted-foreground">
          <span className="text-terminal-green/60">{">"}</span>
          {" BADGES EARNED"}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {badges.map((badge, i) => (
            <BadgeCard key={i} title={badge.title} subtitle={badge.subtitle} recent={badge.recent} />
          ))}
        </div>
      </div>

      {/* PART 4: Submission Heatmap */}
      <SubmissionHeatmap />
    </section>
  )
}
