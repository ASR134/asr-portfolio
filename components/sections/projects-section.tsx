"use client"

import { useEffect, useRef, useState } from "react"
import { ProjectCard } from "./project-card"
import { projects } from "@/data/portfolio"

export function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)

  useEffect(() => {
    const headerEl = headerRef.current
    if (!headerEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          // Trigger card stagger slightly after header
          setTimeout(() => setCardsVisible(true), 200)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(headerEl)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-28 px-6 md:px-12 lg:px-24" aria-label="Featured projects">
      {/* Section label — slides up on scroll */}
      <div
        ref={headerRef}
        className="mb-14 text-center"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
          <span className="text-terminal-green font-semibold">{"02"}</span>
          {" / "}
          <span className="text-foreground font-semibold">{"PROJECTS"}</span>
        </p>
        <p className="mt-3 mx-auto max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
          {"A selection of recent projects spanning machine learning, data visualization, and developer tooling."}
        </p>
        {/* Animated underline */}
        <div className="mt-4 flex justify-center">
          <div
            className="h-px bg-terminal-green/30"
            style={{
              width: headerVisible ? "80px" : "0px",
              transition: "width 0.8s ease 0.3s",
            }}
          />
        </div>
      </div>

      {/* 3-column responsive grid — cards stagger in */}
      <div
        className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Project cards"
      >
        {projects.map((project, i) => (
          <div
            key={project.title}
            role="listitem"
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? "translateY(0)" : "translateY(32px)",
              transition: `opacity 0.6s ease ${i * 100}ms, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 100}ms`,
            }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  )
}