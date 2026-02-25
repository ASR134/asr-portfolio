"use client"

import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
}

type ContactButtonProps = {
  platform: string
  url: string
  icon: keyof typeof iconMap
}

export function ContactButton({ platform, url, icon }: ContactButtonProps) {
  const Icon = iconMap[icon]

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          className="border-white/[0.08] bg-card/50 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-foreground hover:shadow-[0_0_20px_-5px] hover:shadow-primary/20"
          asChild
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${platform} profile`}
          >
            <Icon className="size-5" />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{platform}</TooltipContent>
    </Tooltip>
  )
}
