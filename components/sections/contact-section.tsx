import { ContactButton } from "./contact-button"
import { personalInfo, socialLinks } from "@/data/portfolio"

export function ContactSection() {
  return (
    <section id="contact" className="px-6 py-24" aria-label="Contact">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
          {"Let's build something great together"}
        </h2>
        <p className="mt-3 text-muted-foreground">
          {"I'm always open to new opportunities and interesting conversations."}
        </p>

        {/* Social icons */}
        <div className="mt-8 flex items-center gap-4">
          {socialLinks.map((link) => (
            <ContactButton
              key={link.platform}
              platform={link.platform}
              url={link.url}
              icon={link.icon}
            />
          ))}
        </div>

        {/* Contact card */}
        <div className="mt-10 w-full max-w-sm rounded-xl border border-white/[0.08] bg-card/50 p-6 backdrop-blur-md">
          <p className="text-lg font-semibold text-foreground">
            {personalInfo.name}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {personalInfo.role}
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="mt-2 inline-block text-sm text-primary hover:underline"
          >
            {personalInfo.email}
          </a>
          {personalInfo.openToOpportunities && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-300">
                Open to opportunities
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
