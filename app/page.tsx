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
        <HeroSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <LeetCodeSection />
        <SectionDivider />
        <ContactSection />
      </main>

      <footer className="border-t border-terminal-dim px-6 py-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
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
