"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { personalInfo, techStack } from "@/data/portfolio"

function TechIcon({ name }: { name: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex size-10 items-center justify-center rounded-lg border border-white/[0.08] bg-card/60 text-xs font-bold text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:text-foreground hover:shadow-[0_0_20px_-5px] hover:shadow-primary/15 sm:size-12 sm:text-sm">
          {name.slice(0, 2).toUpperCase()}
        </span>
      </TooltipTrigger>
      <TooltipContent>{name}</TooltipContent>
    </Tooltip>
  )
}

export function HeroSection() {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-24"
      aria-label="Introduction"
    >
      {/* Floating glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-glow-pulse absolute -top-32 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="animate-glow-pulse animation-delay-200 absolute -bottom-48 right-1/4 size-[400px] rounded-full bg-sky-500/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Greeting */}
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            {"Hi, I'm "}
            <span className="bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
            <span
              className={`ml-1 inline-block w-[3px] h-[0.9em] align-middle bg-primary transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
            />
          </h1>
        </div>

        {/* Role */}
        <p className="animate-fade-in-up animation-delay-200 mt-4 font-mono text-sm tracking-wide text-muted-foreground sm:text-base opacity-0">
          {personalInfo.role}
        </p>

        {/* Bio */}
        <p className="animate-fade-in-up animation-delay-400 mt-6 max-w-xl text-base leading-relaxed text-muted-foreground/80 sm:text-lg opacity-0 text-pretty">
          {personalInfo.bio}
        </p>

        {/* Tech stack icons */}
        <div className="animate-fade-in-up animation-delay-600 mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0">
          {techStack.map((tech) => (
            <TechIcon key={tech.name} name={tech.name} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animation-delay-800 mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-sky-500 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            asChild
          >
            <a href="#projects">
              <ArrowDown className="size-4" />
              View My Work
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/[0.1] bg-card/40 text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
            asChild
          >
            <a href={personalInfo.resumeUrl}>
              <Download className="size-4" />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
