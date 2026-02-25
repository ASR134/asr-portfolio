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
      <main className="text-center">
        <HeroSection />

        <div className="py-4 md:py-6">
          <SectionDivider />
        </div>

        <ProjectsSection />

        <div className="py-8 md:py-12">
          <SectionDivider />
        </div>

        <SkillsSection />

        <div className="py-8 md:py-12">
          <SectionDivider />
        </div>

        <LeetCodeSection />

        <div className="py-8 md:py-12">
          <SectionDivider />
        </div>

        <ContactSection />
      </main>

      <footer className="border-t border-terminal-dim bg-surface-1 px-6 py-8 md:px-12 lg:px-24 text-center">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground/60 uppercase">
            {" \u00a9 2025 AMAN RAWAT  \u00b7  ALL SYSTEMS OPERATIONAL"}
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
