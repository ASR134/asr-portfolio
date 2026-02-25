"use client"

import { useEffect, useRef, useState } from "react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { leetcodeStats } from "@/data/portfolio"

// ============================================================
// useCountUp
// ============================================================
function useCountUp(target: number, duration = 1400, trigger = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!trigger || target === 0) return
    let start: number | null = null
    let raf: number

    function step(ts: number) {
      if (start === null) start = ts
      const progress = Math.min((ts - start) / duration, 1)
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
// useInView
// ============================================================
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
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
          className="hover-card-lift group relative flex flex-col gap-2 overflow-hidden rounded-lg border border-terminal-dim bg-surface-1 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-terminal-green/25"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s, background-color 0.3s`,
          }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" aria-hidden="true" />
          <span className="relative font-mono text-[10px] font-medium tracking-widest text-muted-foreground/70 uppercase">
            {label}
          </span>
          <div className="relative flex items-baseline gap-1">
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
      <TooltipContent
        side="bottom"
        className="max-w-52 border border-border bg-card font-mono text-[11px] text-foreground"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

// ============================================================
// ProgressRing
// ============================================================
function ProgressRing({ inView }: { inView: boolean }) {
  const { breakdown } = leetcodeStats
  const total = breakdown.easy.solved + breakdown.medium.solved + breakdown.hard.solved
  const count = useCountUp(total, 1600, inView)

  const r = 68
  const stroke = 7
  const c = 2 * Math.PI * r
  const gap = 6

  const segments = [
    { solved: breakdown.easy.solved, color: "#00FF87" },
    { solved: breakdown.medium.solved, color: "#FFB547" },
    { solved: breakdown.hard.solved, color: "#FF4D4D" },
  ]
  const totalSolved = segments.reduce((sum, s) => sum + s.solved, 0)

  let cumulative = 0
  const arcs = segments.map((seg) => {
    const fraction = totalSolved > 0 ? seg.solved / totalSolved : 0
    const arcLen = Math.max(fraction * c - gap, 0)
    const offset = c - cumulative
    cumulative += fraction * c
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
      <svg
        width={172}
        height={172}
        viewBox="0 0 172 172"
        role="img"
        aria-label={`${total} problems solved`}
      >
        <circle cx={86} cy={86} r={r} fill="none" stroke="#1a2535" strokeWidth={stroke} opacity={0.8} />
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
        <span className="font-mono text-3xl font-bold tabular-nums text-foreground">{count}</span>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
          solved
        </span>
      </div>
    </div>
  )
}

// ============================================================
// DifficultyBar
// ============================================================
function DifficultyBar({
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
  const pct = total > 0 ? Math.min((solved / total) * 100, 100) : 0
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
      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
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
      className={`group relative overflow-hidden flex items-center gap-4 rounded-lg border p-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 ${
        recent
          ? "border-terminal-green/30 bg-surface-1"
          : "border-terminal-dim bg-surface-1 hover:border-terminal-dim/80"
      }`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, border-color 0.3s, background-color 0.3s`,
      }}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
          recent ? "bg-surface-2" : "bg-surface-2"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={recent ? "#00FF87" : "#4A6070"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-sm font-semibold text-foreground">{title}</span>
        <span className="font-mono text-[11px] text-muted-foreground/60">
          {subtitle || "LeetCode Achievement"}
        </span>
      </div>
      {recent && (
        <span className="ml-auto shrink-0 rounded-full border border-terminal-green/25 bg-surface-2 px-2.5 py-0.5 font-mono text-[9px] font-semibold tracking-widest text-terminal-green uppercase">
          latest
        </span>
      )}
    </div>
  )
}

// ============================================================
// HeatmapEmbed (fault-tolerant: live image -> timeout -> fallback)
// ============================================================
const HEATMAP_TIMEOUT_MS = 8000
const HEATMAP_LIVE_URL = (u: string) =>
  `https://leetcard.jacoblin.cool/${u}?theme=dark&font=Fira%20Mono&ext=heatmap&border=0&radius=8`
const HEATMAP_FALLBACK_URL = "/leetcode-heatmap-fallback.png"

function HeatmapEmbed({ inView }: { inView: boolean }) {
  const { username } = leetcodeStats

  // "loading" = trying live image, "live" = success, "fallback" = using local image
  const [status, setStatus] = useState<"loading" | "live" | "fallback">("loading")
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Start a timeout when the component mounts — if the live image hasn't
  // loaded in HEATMAP_TIMEOUT_MS we switch to the fallback automatically.
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "fallback" : prev))
    }, HEATMAP_TIMEOUT_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function handleLiveLoad() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setStatus("live")
  }

  function handleLiveError() {
    if (timerRef.current) clearTimeout(timerRef.current)
    setStatus("fallback")
  }

  const showFallback = status === "fallback"
  const showLive = status === "live"

  return (
    <div
      className="mt-10"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s ease 400ms, transform 0.6s ease 400ms",
      }}
    >
      <h3 className="mb-4 font-mono text-xs font-semibold tracking-widest text-muted-foreground/70 uppercase">
        Submission Activity
      </h3>

      <div className="overflow-hidden rounded-lg border border-terminal-dim bg-surface-1 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        {/* Live image — always in the DOM so it can load in the background */}
        {!showFallback && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={HEATMAP_LIVE_URL(username)}
            alt={`LeetCode submission heatmap for ${username}`}
            className={`w-full transition-opacity duration-500 ${showLive ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}
            crossOrigin="anonymous"
            onLoad={handleLiveLoad}
            onError={handleLiveError}
          />
        )}

        {/* Fallback image — shown on error or timeout */}
        {showFallback && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={HEATMAP_FALLBACK_URL}
            alt={`LeetCode submission heatmap for ${username} (cached snapshot)`}
            className="w-full rounded"
          />
        )}

        {/* Loading placeholder — only while status is "loading" */}
        {status === "loading" && (
          <div className="flex h-32 items-center justify-center">
            <span className="font-mono text-xs text-muted-foreground/40">
              Loading heatmap...
            </span>
          </div>
        )}
      </div>

      {/* Fallback caption */}
      {showFallback && (
        <p className="mt-2 font-mono text-[11px] italic text-muted-foreground/40">
          Live heatmap unavailable — showing recent snapshot.
        </p>
      )}
    </div>
  )
}

// ============================================================
// Main Section
// ============================================================
export function LeetCodeSection() {
  const { ref: sectionRef, inView } = useInView(0.1)
  const { profile, breakdown, badges, username, profileUrl, lastUpdated } = leetcodeStats

  const formattedDate = new Date(lastUpdated + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <section
      id="leetcode"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 lg:px-24"
      aria-label="LeetCode stats"
    >
      {/* Header */}
      <div className="mb-3 flex items-center gap-3">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00FF87"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-70"
        >
          <path d="M16 18l2-2-4-4 4-4-2-2-6 6z" />
          <path d="M14 20h6" />
        </svg>
        <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
          <span className="text-terminal-green font-semibold">04</span>
          {" / "}
          <span className="text-foreground font-semibold">LEETCODE</span>
        </p>
      </div>
      <h2 className="mb-2 font-mono text-3xl font-bold tracking-tight text-foreground">
        Problem Solving Stats
      </h2>
      <div className="mb-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <p className="font-mono text-sm leading-relaxed text-muted-foreground/60">
          {"Stats for "}
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-green/80 underline decoration-terminal-green/20 underline-offset-2 transition-colors hover:text-terminal-green"
          >
            {username}
          </a>
          {". Algorithmic thinking, one problem at a time."}
        </p>
        <span className="shrink-0 font-mono text-[10px] tracking-wider text-muted-foreground/40">
          {"Updated " + formattedDate}
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Problems Solved"
          value={profile.solved}
          suffix={`/ ${profile.totalProblems}`}
          tooltip="Total unique problems solved across all difficulty levels"
          delay={0}
          inView={inView}
        />
        <StatCard
          label="Global Ranking"
          value={profile.globalRanking}
          tooltip="Position among all LeetCode users worldwide"
          delay={80}
          inView={inView}
        />
        <StatCard
          label="Easy Solved"
          value={breakdown.easy.solved}
          suffix={`/ ${breakdown.easy.total}`}
          tooltip="Easy difficulty problems completed"
          delay={160}
          inView={inView}
        />
        <StatCard
          label="Max Streak"
          value={profile.maxStreak}
          suffix="days"
          tooltip="Longest consecutive daily solving streak"
          delay={240}
          inView={inView}
        />
      </div>

      {/* Donut + Progress bars */}
      <div className="mt-14 flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
        <ProgressRing inView={inView} />
        <div className="flex w-full flex-col gap-6">
          <DifficultyBar
            label="Easy"
            solved={breakdown.easy.solved}
            total={breakdown.easy.total}
            color="#00FF87"
            delay={400}
            inView={inView}
          />
          <DifficultyBar
            label="Medium"
            solved={breakdown.medium.solved}
            total={breakdown.medium.total}
            color="#FFB547"
            delay={500}
            inView={inView}
          />
          <DifficultyBar
            label="Hard"
            solved={breakdown.hard.solved}
            total={breakdown.hard.total}
            color="#FF4D4D"
            delay={600}
            inView={inView}
          />
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="mt-14">
          <h3 className="mb-5 font-mono text-xs font-semibold tracking-widest text-muted-foreground/70 uppercase">
            Badges Earned
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {badges.map((badge, i) => (
              <BadgeCard
                key={i}
                title={badge.title}
                subtitle={badge.subtitle}
                recent={badge.recent}
                delay={i * 100}
                inView={inView}
              />
            ))}
          </div>
        </div>
      )}

      {/* Heatmap (image embed) */}
      <HeatmapEmbed inView={inView} />

      {/* View full profile link + last updated */}
      <div className="mt-6 flex flex-col items-end gap-1">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-btn-glow group inline-flex items-center gap-1.5 rounded-md border border-terminal-dim bg-surface-1 px-4 py-2 font-mono text-xs tracking-wider text-muted-foreground hover:border-terminal-green/30 hover:text-terminal-green"
        >
          View full profile on LeetCode
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </section>
  )
}
