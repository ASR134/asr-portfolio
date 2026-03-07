"use client";

import { ExternalLink, Zap, Trophy, Target, Flame } from "lucide-react";
import { leetcodeStats } from "@/data/portfolio";

const { username, profileUrl, profile, breakdown, badges } = leetcodeStats;

const statCards = [
  {
    label: "Problems Solved",
    display: `${profile.solved.toLocaleString()}`,
    sub: `/ ${profile.totalProblems.toLocaleString()}`,
    pct: Math.round((profile.solved / profile.totalProblems) * 100),
    icon: Target,
    color: "#00FF87",
    glow: "rgba(0,255,135,0.18)",
  },
  {
    label: "Global Ranking",
    display: `#${profile.globalRanking.toLocaleString()}`,
    sub: null,
    pct: null,
    icon: Trophy,
    color: "#FFB547",
    glow: "rgba(255,181,71,0.18)",
  },
  {
    label: "Easy Solved",
    display: `${breakdown.easy.solved}`,
    sub: `/ ${breakdown.easy.total}`,
    pct: Math.round((breakdown.easy.solved / breakdown.easy.total) * 100),
    icon: Zap,
    color: "#00C2FF",
    glow: "rgba(0,194,255,0.18)",
  },
  {
    label: "Max Streak",
    display: `${profile.maxStreak}`,
    sub: "days",
    pct: null,
    icon: Flame,
    color: "#FF6B6B",
    glow: "rgba(255,107,107,0.18)",
  },
];

// Heatmap data precisely mapped from LeetCode screenshot
// Each array = one week column, rows = [Sun, Mon, Tue, Wed, Thu, Fri, Sat]
// 0=empty(dark), 1=light green, 2=medium green, 3=bright green, 4=max green
const heatmapWeeks: number[][] = [
  // MAR
  [0,3,3,3,1,2,0],[0,0,0,0,0,2,3],[0,3,2,0,0,0,0],[0,0,3,3,0,0,0],
  // APR
  [0,3,3,3,3,3,3],[3,3,0,1,1,0,3],[0,0,4,1,3,2,0],[0,3,3,0,0,3,3],
  // MAY
  [0,0,3,3,3,0,0],[3,3,0,1,0,3,3],[0,1,1,2,3,0,0],[1,0,3,1,0,3,0],[0,1,0,0,3,3,0],
  // JUN
  [0,3,3,3,3,3,0],[3,3,0,2,2,0,3],[0,0,3,2,0,3,3],[2,3,2,0,3,0,0],
  // JUL
  [0,3,1,2,2,1,3],[3,0,1,2,0,1,0],[0,3,2,2,2,1,2],[3,3,3,0,1,1,0],[0,0,3,2,1,0,2],
  // AUG
  [3,3,0,2,0,1,0],[0,1,2,3,4,1,2],[3,0,3,0,2,2,0],[0,3,0,3,0,0,1],
  // SEP
  [0,3,3,3,3,3,0],[3,3,0,1,3,0,3],[0,0,3,3,0,3,3],[3,3,3,0,3,0,0],
  // OCT
  [0,0,1,0,1,0,0],[0,1,0,1,0,0,1],[1,0,1,1,0,3,0],[0,1,0,2,1,0,1],[0,0,1,2,0,3,0],
  // NOV
  [0,3,3,0,3,0,0],[0,0,2,3,0,3,0],[3,1,0,1,3,0,3],[0,3,3,0,0,3,3],
  // DEC
  [0,3,3,0,3,0,0],[3,3,0,3,0,3,3],[0,0,3,3,3,0,0],[3,0,3,0,3,3,3],[0,3,0,3,3,0,3],
  // JAN
  [1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[3,3,3,3,0,3,3],[0,0,0,0,0,0,3],
  // FEB
  [3,3,3,3,2,3,0],[3,2,0,3,1,0,0],[3,0,3,3,2,0,2],[1,2,1,0,1,2,1],[0,2,2,1,0,0,0],
];

const months = ["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb"];

function getCellBg(level: number) {
  if (level === 0) return "rgba(255,255,255,0.04)";
  return ["rgba(0,255,135,0.20)","rgba(0,255,135,0.42)","rgba(0,255,135,0.68)","rgba(0,255,135,0.92)"][level - 1];
}
function getCellGlow(level: number) {
  if (level <= 1) return "none";
  return ["0 0 4px rgba(0,255,135,0.28)","0 0 7px rgba(0,255,135,0.5)","0 0 12px rgba(0,255,135,0.75)"][level - 2];
}

const cardBase: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(15,21,30,0.95), rgba(10,14,20,0.98))",
  boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.5)",
};

export function LeetCodeSection() {
  return (
    <section id="leetcode" className="relative py-24 overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,255,135,0.35) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* ── Header ── */}
      <div className="mb-12 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-emerald-400 mb-3">04 / LEETCODE</p>
        <h2 className="text-4xl font-bold text-white tracking-tight">Problem Solving Stats</h2>
        <p className="mt-3 text-sm text-white/40">
          Live profile for{" "}
          <a href={profileUrl} target="_blank" className="text-emerald-400 hover:text-emerald-300 transition-colors font-mono">
            {username}
          </a>
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="flex justify-center mb-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-5xl">
          {statCards.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="relative rounded-2xl border border-white/[0.07] p-5 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
                style={cardBase}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = `0 0 0 1px ${s.color}35, 0 8px 40px ${s.glow}, 0 0 60px ${s.glow}`;
                  el.style.borderColor = `${s.color}35`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = cardBase.boxShadow as string;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <div className="mx-auto mb-3 inline-flex items-center justify-center w-9 h-9 rounded-xl" style={{ background: s.glow }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/35 font-mono mb-1.5">{s.label}</p>
                <p className="text-2xl font-bold text-white tabular-nums leading-none">
                  {s.display}
                  {s.sub && <span className="text-sm font-normal text-white/30 ml-1">{s.sub}</span>}
                </p>
                {s.pct !== null && (
                  <div className="mt-3 h-[2px] rounded-full mx-auto w-3/4 overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}60, ${s.color})` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Badges ── */}
      <div className="flex justify-center mb-5">
        <div className="w-full max-w-5xl rounded-2xl border border-white/[0.07] px-6 py-4" style={cardBase}>
          <div className="flex flex-wrap justify-center gap-2">
            {badges.map((b) => (
              <span
                key={b.title}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border"
                style={
                  b.recent
                    ? { background: "rgba(0,255,135,0.07)", borderColor: "rgba(0,255,135,0.25)", color: "#00FF87" }
                    : { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.35)" }
                }
              >
                {b.recent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                {b.title} · {b.subtitle}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Heatmap ── */}
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-5xl rounded-2xl border border-white/[0.07] px-6 py-6" style={cardBase}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/35 font-mono">Submission Activity · Last Year</p>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-white/35">Active days: <span className="text-white/60">202</span></span>
              <span className="text-white/35">Max streak: <span className="text-emerald-400">20</span></span>
              <span className="text-emerald-400 font-semibold">1,096 submissions</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div style={{ minWidth: 580 }}>
              {/* Month labels */}
              <div className="flex mb-2" style={{ gap: 3 }}>
                {months.map((m) => (
                  <div key={m} className="font-mono text-[9px] text-white/25 flex-1 text-center">{m}</div>
                ))}
              </div>

              {/* Day rows */}
              <div className="flex flex-col" style={{ gap: 3 }}>
                {[0,1,2,3,4,5,6].map((dayIdx) => (
                  <div key={dayIdx} className="flex" style={{ gap: 3 }}>
                    {heatmapWeeks.map((week, weekIdx) => {
                      const level = week[dayIdx];
                      return (
                        <div
                          key={weekIdx}
                          className="rounded-[3px] flex-1 transition-all duration-150 hover:scale-[1.4] hover:z-10 cursor-default"
                          style={{
                            aspectRatio: "1",
                            minWidth: 10,
                            background: getCellBg(level),
                            boxShadow: getCellGlow(level),
                          }}
                          title={`${level > 0 ? level * 3 : 0} submissions`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end mt-3 gap-1.5">
                <span className="font-mono text-[9px] text-white/25 mr-1">Less</span>
                {[0,1,2,3,4].map((l) => (
                  <div
                    key={l}
                    className="rounded-[3px] w-3 h-3"
                    style={{ background: getCellBg(l), boxShadow: getCellGlow(l) }}
                  />
                ))}
                <span className="font-mono text-[9px] text-white/25 ml-1">More</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="flex justify-center">
        <a
          href={profileUrl}
          target="_blank"
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm text-white/50 font-mono transition-all duration-200 hover:border-emerald-400/40 hover:text-emerald-400 hover:bg-emerald-400/5 hover:shadow-[0_0_24px_rgba(0,255,135,0.12)]"
        >
          leetcode.com/{username}
          <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}

export default LeetCodeSection;