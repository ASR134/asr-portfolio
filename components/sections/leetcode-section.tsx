"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { leetcode, generateLeetcodeHeatmap } from "@/data/portfolio"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

// ============================================================
// useCountUp — animates from 0 to target over a duration
// ============================================================
function useCountUp(target: number, duration = 1400, trigger = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!trigger) return
    let start: number | null = null
    let raf: number

    function step(ts: number) {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, trigger])

  return value
}

// ============================================================
// useInView — triggers once when element enters viewport
// ============================================================
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}

// ============================================================
// StatCard
// ============================================================
function StatCard({
  label,
  value,
  suffix,
  tooltip,
  delay,
  inView,
}: {
  label: string
  value: number
  suffix?: string
  tooltip: string
  delay: number
  inView: boolean
}) {
  const count = useCountUp(value, 1400, inView)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="group relative flex flex-col gap-2 rounded-lg border border-border/60 bg-card/60 p-5 backdrop-blur-sm transition-all duration-500 hover:border-terminal-green/30 hover:bg-card/80"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s, background-color 0.3s`,
          }}
        >
          <span className="font-mono text-[10px] font-medium tracking-widest text-muted-foreground/70 uppercase">
            {label}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-bold tabular-nums tracking-tight text-foreground transition-all duration-300 group-hover:text-terminal-green group-hover:[text-shadow:0_0_20px_rgba(0,255,135,0.25)]">
              {count.toLocaleString()}
            </span>
            {suffix && (
              <span className="font-mono text-sm tabular-nums text-muted-foreground/50">
                {suffix}
              </span>
            )}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-52 bg-card text-foreground font-mono text-[11px] border border-border">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

// ============================================================
// ProgressRing — clean SVG donut
// ============================================================
function ProgressRing({ inView }: { inView: boolean }) {
  const { easy, medium, hard } = leetcode.breakdown
  const total = easy.solved + medium.solved + hard.solved
  const count = useCountUp(total, 1600, inView)

  const r = 68
  const stroke = 7
  const c = 2 * Math.PI * r
  const gap = 6 // px gap between arcs

  const segments = [
    { solved: easy.solved, color: "#00FF87" },
    { solved: medium.solved, color: "#FFB547" },
    { solved: hard.solved, color: "#FF4D4D" },
  ]

  const totalSolved = segments.reduce((sum, s) => sum + s.solved, 0)

  // Calculate cumulative offset for each arc
  let cumulativeOffset = 0
  const arcs = segments.map((seg) => {
    const fraction = seg.solved / totalSolved
    const arcLen = Math.max(fraction * c - gap, 0)
    const offset = c - cumulativeOffset
    cumulativeOffset += fraction * c
    return { ...seg, arcLen, offset }
  })

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1)" : "scale(0.9)",
        transition: "opacity 0.7s ease 200ms, transform 0.7s ease 200ms",
      }}
    >
      <svg width={172} height={172} viewBox="0 0 172 172" role="img" aria-label={`${total} problems solved`}>
        {/* Background ring */}
        <circle cx={86} cy={86} r={r} fill="none" stroke="#1A2A36" strokeWidth={stroke} opacity={0.5} />
        {/* Arcs */}
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={86}
            cy={86}
            r={r}
            fill="none"
            stroke={arc.color}
            strokeWidth={stroke}
            strokeDasharray={inView ? `${arc.arcLen} ${c - arc.arcLen}` : `0 ${c}`}
            strokeDashoffset={arc.offset}
            strokeLinecap="round"
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "86px 86px",
              transition: `stroke-dasharray 1.2s ease ${300 + i * 150}ms`,
            }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-3xl font-bold tabular-nums text-foreground">
          {count}
        </span>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
          solved
        </span>
      </div>
    </div>
  )
}

// ============================================================
// ProgressBar
// ============================================================
function ProgressBar({
  label,
  solved,
  total,
  color,
  delay,
  inView,
}: {
  label: string
  solved: number
  total: number
  color: string
  delay: number
  inView: boolean
}) {
  const pct = Math.min((solved / total) * 100, 100)
  const count = useCountUp(solved, 1200, inView)

  return (
    <div
      className="flex items-center gap-4"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-12px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      <span
        className="w-16 shrink-0 text-right font-mono text-xs font-semibold tracking-wider uppercase"
        style={{ color }}
      >
        {label}
      </span>
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${pct}%` : "0%",
            backgroundColor: color,
            transitionDelay: `${delay + 200}ms`,
            boxShadow: `0 0 8px ${color}33`,
          }}
        />
      </div>
      <span className="w-20 shrink-0 font-mono text-xs tabular-nums text-muted-foreground/70">
        {count} / {total}
      </span>
    </div>
  )
}

// ============================================================
// BadgeCard
// ============================================================
function BadgeCard({
  title,
  subtitle,
  recent,
  delay,
  inView,
}: {
  title: string
  subtitle: string
  recent: boolean
  delay: number
  inView: boolean
}) {
  return (
    <div
      className={`group relative flex items-center gap-4 rounded-lg border p-4 transition-all duration-300 ${
        recent
          ? "border-terminal-green/30 bg-terminal-green/[0.04]"
          : "border-border/60 bg-card/40 hover:border-border hover:bg-card/60"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s, background-color 0.3s`,
      }}
    >
      {/* Badge icon */}
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
          recent ? "bg-terminal-green/10" : "bg-secondary/80"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={recent ? "#00FF87" : "#4A6070"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-sm font-semibold text-foreground">
          {title}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground/60">
          {subtitle || "LeetCode Achievement"}
        </span>
      </div>
      {recent && (
        <span className="ml-auto shrink-0 rounded-full border border-terminal-green/20 bg-terminal-green/10 px-2.5 py-0.5 font-mono text-[9px] font-semibold tracking-widest text-terminal-green uppercase">
          latest
        </span>
      )}
    </div>
  )
}

// ============================================================
// Heatmap
// ============================================================
const heatmapColors = ["#0F1923", "#0a3d1f", "#00873a", "#00CC66", "#00FF87"]
const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"]
const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""]

function SubmissionHeatmap({ inView }: { inView: boolean }) {
  const data = useMemo(() => generateLeetcodeHeatmap(), [])

  const weeks: number[][] = useMemo(() => {
    const w: number[][] = []
    for (let i = 0; i < 53; i++) {
      const week: number[] = []
      for (let d = 0; d < 7; d++) {
        const idx = i * 7 + d
        week.push(idx < data.length ? data[idx] : 0)
      }
      w.push(week)
    }
    return w
  }, [data])

  return (
    <div
      className="mt-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease 400ms, transform 0.6s ease 400ms",
      }}
    >
      {/* Submission summary */}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-mono text-xs text-muted-foreground/70">
          <span className="font-semibold tabular-nums text-foreground">{leetcode.heatmap.totalSubmissions.toLocaleString()}</span>
          {" submissions in the past year"}
        </span>
        <span className="hidden size-1 rounded-full bg-border sm:block" />
        <span className="font-mono text-xs text-muted-foreground/70">
          <span className="font-semibold tabular-nums text-foreground">{leetcode.heatmap.activeDays}</span>
          {" active days"}
        </span>
        <span className="hidden size-1 rounded-full bg-border sm:block" />
        <span className="font-mono text-xs text-muted-foreground/70">
          {"max streak: "}
          <span className="font-semibold tabular-nums text-foreground">{leetcode.heatmap.maxStreak}</span>
        </span>
      </div>

      {/* Scrollable heatmap */}
      <div className="overflow-x-auto scrollbar-terminal rounded-lg border border-border/40 bg-card/30 p-4">
        <div className="inline-block min-w-fit">
          {/* Month labels */}
          <div className="mb-1.5 flex pl-8">
            {months.map((m, i) => (
              <span
                key={i}
                className="font-mono text-[9px] tracking-wider text-muted-foreground/40"
                style={{ width: "53px", minWidth: "53px" }}
              >
                {m}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-0">
            {/* Day labels */}
            <div className="flex w-8 shrink-0 flex-col gap-[3px]" aria-hidden="true">
              {dayLabels.map((d, i) => (
                <span key={i} className="flex h-[11px] items-center font-mono text-[8px] text-muted-foreground/30">
                  {d}
                </span>
              ))}
            </div>

            {/* Cells */}
            <div
              className="grid gap-[3px]"
              style={{
                gridTemplateColumns: "repeat(53, 11px)",
                gridTemplateRows: "repeat(7, 11px)",
                gridAutoFlow: "column",
              }}
              role="img"
              aria-label="LeetCode submission heatmap"
            >
              {weeks.map((week, wIdx) =>
                week.map((level, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    className="rounded-[2px] transition-colors duration-200 hover:ring-1 hover:ring-terminal-green/30"
                    style={{
                      width: 11,
                      height: 11,
                      backgroundColor: heatmapColors[level] || heatmapColors[0],
                    }}
                    aria-hidden="true"
                  />
                ))
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 flex items-center justify-end gap-1.5">
            <span className="font-mono text-[9px] text-muted-foreground/30">less</span>
            {heatmapColors.map((color, i) => (
              <div
                key={i}
                className="size-[11px] rounded-[2px]"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
            <span className="font-mono text-[9px] text-muted-foreground/30">more</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Main Section
// ============================================================
export function LeetCodeSection() {
  const { profile, breakdown, badges } = leetcode
  const { ref: sectionRef, inView } = useInView(0.1)

  return (
    <section
      id="leetcode"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24"
      aria-label="LeetCode stats"
    >
      {/* Header */}
      <div className="mb-3 flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FF87" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
          <path d="M16 18l2-2-4-4 4-4-2-2-6 6z" />
          <path d="M14 20h6" />
        </svg>
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <span className="text-terminal-green">04</span>
          {" / LEETCODE"}
        </p>
      </div>
      <h2 className="mb-2 font-mono text-2xl font-bold tracking-tight text-foreground">
        Problem Solving Stats
      </h2>
      <p className="mb-12 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground/60">
        Algorithmic thinking, one problem at a time. Consistent practice across difficulty levels with a focus on patterns and optimization.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Problems Solved" value={profile.solved} suffix={`/ ${profile.totalProblems}`} tooltip="Total unique problems solved across all difficulty levels" delay={0} inView={inView} />
        <StatCard label="Contest Rating" value={profile.contestRating} tooltip={`Competitive programming rating \u2014 ${profile.contestPercentile} of all participants`} delay={80} inView={inView} />
        <StatCard label="Global Ranking" value={profile.globalRanking} suffix={`/ ${profile.totalUsers.toLocaleString()}`} tooltip="Your position among all LeetCode users worldwide" delay={160} inView={inView} />
        <StatCard label="Max Streak" value={profile.maxStreak} suffix="days" tooltip="Longest consecutive streak of solving at least one problem per day" delay={240} inView={inView} />
      </div>

      {/* Donut + Progress bars */}
      <div className="mt-14 flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
        <ProgressRing inView={inView} />
        <div className="flex w-full flex-col gap-6">
          <ProgressBar label="Easy" solved={breakdown.easy.solved} total={breakdown.easy.total} color="#00FF87" delay={400} inView={inView} />
          <ProgressBar label="Medium" solved={breakdown.medium.solved} total={breakdown.medium.total} color="#FFB547" delay={500} inView={inView} />
          <ProgressBar label="Hard" solved={breakdown.hard.solved} total={breakdown.hard.total} color="#FF4D4D" delay={600} inView={inView} />
        </div>
      </div>

      {/* Badges */}
      <div className="mt-14">
        <h3 className="mb-5 font-mono text-xs font-semibold tracking-widest text-muted-foreground/70 uppercase">
          Badges Earned
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {badges.map((badge, i) => (
            <BadgeCard key={i} title={badge.title} subtitle={badge.subtitle} recent={badge.recent} delay={i * 100} inView={inView} />
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <SubmissionHeatmap inView={inView} />
    </section>
  )
}
