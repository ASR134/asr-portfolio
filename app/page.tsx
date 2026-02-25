"use client"

import { NavHeader } from "@/components/sections/nav-header"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionDivider } from "@/components/sections/section-divider"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { LeetCodeSection } from "@/components/sections/leetcode-section"
import { ContactSection } from "@/components/sections/contact-section"

export default function Home() {
  return (
    <>
      <NavHeader />
      <main>
        {/* Hero — full grid */}
        <div className="relative">
          <div className="bg-section-grid bg-section-fade pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <HeroSection />
        </div>

        <SectionDivider />

        {/* Projects — full grid */}
        <div className="relative">
          <div className="bg-section-grid bg-section-fade pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <ProjectsSection />
        </div>

        <SectionDivider />

        {/* Skills — fine grid (lower opacity behind dense content) */}
        <div className="relative">
          <div className="bg-section-grid-fine bg-section-fade pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <SkillsSection />
        </div>

        <SectionDivider />

        {/* LeetCode — full grid */}
        <div className="relative">
          <div className="bg-section-grid bg-section-fade pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <LeetCodeSection />
        </div>

        <SectionDivider />

        {/* Contact — fine grid */}
        <div className="relative">
          <div className="bg-section-grid-fine bg-section-fade pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <ContactSection />
        </div>
      </main>

      <footer className="border-t border-terminal-dim/50 px-6 py-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground/60 uppercase">
            {"// BUILT WITH NEXT.JS + TAILWIND + SHADCN + V0  \u00b7  \u00a9 2025 ALEX CHEN  \u00b7  ALL SYSTEMS OPERATIONAL"}
          </p>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="animate-glow-dot size-1.5 rounded-full bg-terminal-green" />
            <span className="font-mono text-[10px] tracking-wider text-terminal-green uppercase">
              {"ONLINE"}
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
