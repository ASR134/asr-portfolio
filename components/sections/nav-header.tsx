"use client"

import { useState, useEffect, useRef } from "react"
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
  const [mounted, setMounted] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Entrance animation trigger
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

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

  // Close mobile menu on scroll
  useEffect(() => {
    const onScroll = () => { if (mobileOpen) setMobileOpen(false) }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [mobileOpen])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 font-mono",
        "transition-all duration-500",
        scrolled
          ? "border-b border-terminal-dim/70 bg-terminal-bg/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-transparent",
        // Entrance: slides down on mount
        mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
      )}
      style={{
        transition: "opacity 0.5s ease, transform 0.5s ease, background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-24"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#hero"
          className="group relative text-xs tracking-widest text-muted-foreground transition-all duration-300 hover:text-terminal-green uppercase overflow-hidden"
        >
          {/* Shimmer sweep on hover */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-terminal-green/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          <span className="relative">{/* Logo text here if needed */}</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 sm:flex">
          {navLinks.map((link, i) => {
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
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(-6px)",
                  transition: `opacity 0.4s ease ${i * 60 + 100}ms, transform 0.4s ease ${i * 60 + 100}ms, color 0.3s ease`,
                }}
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

        {/* Mobile menu button — animated icon */}
        <button
          className="text-xs tracking-wider text-muted-foreground transition-all duration-300 hover:text-terminal-green hover:scale-105 sm:hidden uppercase"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <span
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
          >
            {mobileOpen ? "[CLOSE]" : "[MENU]"}
          </span>
        </button>
      </nav>

      {/* Mobile nav — animated slide down */}
      <div
        ref={mobileMenuRef}
        className="border-t border-terminal-dim/60 bg-terminal-bg/95 backdrop-blur-xl sm:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? "300px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
        }}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link, i) => {
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
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
                  transition: `opacity 0.3s ease ${i * 50 + 50}ms, transform 0.3s ease ${i * 50 + 50}ms, color 0.3s ease`,
                }}
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
    </header>
  )
}