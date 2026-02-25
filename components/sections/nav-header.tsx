"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "work", href: "#projects", sectionId: "projects" },
  { label: "stack", href: "#skills", sectionId: "skills" },
  { label: "leetcode", href: "#leetcode", sectionId: "leetcode" },
  { label: "signal", href: "#contact", sectionId: "contact" },
]

export function NavHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.sectionId)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id)
          })
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 font-mono",
        scrolled
          ? "border-b border-terminal-dim/60 bg-terminal-bg/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-24"
        aria-label="Main navigation"
      >
        <a
          href="#hero"
          className="group text-xs tracking-widest text-muted-foreground transition-all duration-300 hover:text-terminal-green uppercase"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-px">
            {"~/alex.chen"}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 sm:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link-underline group flex items-center gap-1.5 py-1 text-xs tracking-wider transition-all duration-300 uppercase",
                  isActive
                    ? "text-terminal-green active"
                    : "text-muted-foreground hover:text-terminal-green"
                )}
              >
                <span
                  className={cn(
                    "transition-all duration-300",
                    isActive
                      ? "text-terminal-green translate-x-0"
                      : "text-terminal-green/30 group-hover:text-terminal-green/70 -translate-x-1 group-hover:translate-x-0"
                  )}
                >
                  {">"}
                </span>
                {link.label}
                {isActive && (
                  <span className="animate-blink ml-0.5 inline-block text-terminal-green">
                    {"_"}
                  </span>
                )}
              </a>
            )
          })}
        </div>

        {/* Mobile menu button */}
        <button
          className="text-xs tracking-wider text-muted-foreground transition-all duration-300 hover:text-terminal-green hover:scale-105 sm:hidden uppercase"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? "[CLOSE]" : "[MENU]"}
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-terminal-dim/60 bg-terminal-bg/95 backdrop-blur-xl sm:hidden">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-0 py-3 font-mono text-xs tracking-wider transition-all duration-300 uppercase",
                    isActive
                      ? "text-terminal-green"
                      : "text-muted-foreground hover:text-terminal-green hover:translate-x-1"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className={isActive ? "text-terminal-green" : "text-terminal-green/40"}>
                    {">"}
                  </span>
                  {link.label}
                  {isActive && (
                    <span className="animate-blink text-terminal-green">{"_"}</span>
                  )}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
