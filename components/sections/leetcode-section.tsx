"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

const LEETCODE_USERNAME = "ASR134";

const stats = [
  { label: "Problems Solved", value: "256 / 3400" },
  { label: "Global Ranking", value: "273,210" },
  { label: "Easy Solved", value: "69 / 830" },
  { label: "Max Streak", value: "20 days" },
];

export function LeetCodeSection() {
  return (
    <section id="leetcode" className="relative py-24">
      {/* Section Header */}
      <div className="mb-10">
        <p className="text-sm tracking-widest text-emerald-400">04 / LEETCODE</p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Problem Solving Stats
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Live profile for{" "}
          <a
            href={`https://leetcode.com/${LEETCODE_USERNAME}`}
            target="_blank"
            className="text-emerald-400 hover:underline"
          >
            {LEETCODE_USERNAME}
          </a>
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="
              rounded-xl
              bg-gradient-to-b from-[#111827]/60 to-[#0b0f14]
              border border-white/10
              shadow-[0_0_30px_rgba(0,0,0,0.6)]
              p-5
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]
            "
          >
            <p className="text-xs uppercase tracking-wide text-white/50">
              {s.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div
        className="
          mt-10 rounded-xl
          bg-gradient-to-b from-[#111827]/60 to-[#0b0f14]
          border border-white/10
          shadow-[0_0_30px_rgba(0,0,0,0.6)]
          p-4
        "
      >
        <p className="mb-3 text-sm text-white/60">Submission Activity (Last year)</p>

        <Image
          src="/leetcode-heatmap-fallback.png"
          alt="LeetCode activity heatmap"
          width={500}
          height={100}
          className="mx-auto w-full max-w-5xl rounded-lg"
        />
      </div>

      {/* CTA */}
      <div className="mt-6">
        <a
          href={`https://leetcode.com/${LEETCODE_USERNAME}`}
          target="_blank"
          className="
            inline-flex items-center gap-2 rounded-lg
            border border-white/10 bg-[#0b0f14] px-4 py-2
            text-sm text-white/80
            transition-all
            hover:border-emerald-400/40 hover:text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]
          "
        >
          View full profile on LeetCode
          <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
}

export default LeetCodeSection;