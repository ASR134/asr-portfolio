"use client"

import { NavHeader } from "@/components/sections/nav-header"
import { HeroSection } from "@/components/sections/hero-section"
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

        <div className="relative">
          {/* Section divider glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-glow-pulse absolute left-1/4 top-0 size-[600px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[150px]" />
            <div className="animate-glow-pulse animation-delay-400 absolute bottom-1/4 right-0 size-[500px] rounded-full bg-sky-500/[0.03] blur-[130px]" />
          </div>

          <ProjectsSection />
          <SkillsSection />
          <AchievementsSection />
          <ContactSection />
        </div>
      </main>

      <footer className="border-t border-white/[0.06] px-6 py-8">
        <p className="text-center text-xs text-muted-foreground">
          {"Built with Next.js, Tailwind CSS, and shadcn/ui"}
        </p>
      </footer>
    </>
  )
}
