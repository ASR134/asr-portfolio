"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "work", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "log", href: "#achievements" },
  { label: "signal", href: "#contact" },
]

export function NavHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 font-mono",
        scrolled
          ? "border-b border-terminal-dim bg-terminal-bg/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12 lg:px-24"
        aria-label="Main navigation"
      >
        <a
          href="#hero"
          className="text-xs tracking-widest text-muted-foreground transition-colors hover:text-terminal-green uppercase"
        >
          {"~/alex.chen"}
        </a>

        {/* Desktop nav - terminal style */}
        <div className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-1.5 text-xs tracking-wider text-muted-foreground transition-colors hover:text-terminal-green uppercase"
            >
              <span className="text-terminal-green/40 transition-colors group-hover:text-terminal-green">
                {">"}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button - terminal style */}
        <button
          className="text-xs tracking-wider text-muted-foreground transition-colors hover:text-terminal-green sm:hidden uppercase"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? "[CLOSE]" : "[MENU]"}
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-terminal-dim bg-terminal-bg/95 backdrop-blur-md sm:hidden">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-0 py-3 font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-terminal-green uppercase"
                onClick={() => setMobileOpen(false)}
              >
                <span className="text-terminal-green/60">{">"}</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
