"use client"

import { NavHeader } from "@/components/sections/nav-header"
import { HeroSection } from "@/components/sections/hero-section"
import { SectionDivider } from "@/components/sections/section-divider"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { AchievementsSection } from "@/components/sections/achievements-section"
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
        <AchievementsSection />
        <SectionDivider />
        <ContactSection />
      </main>

      <footer className="border-t border-terminal-dim px-6 py-6 md:px-12 lg:px-24">
        <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          {"// built with next.js + tailwind + caffeine"}
        </p>
      </footer>
    </>
  )
}
