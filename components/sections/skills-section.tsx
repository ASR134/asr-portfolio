import { Brain, Server, Layout, Wrench } from "lucide-react"
import { SectionHeader } from "./section-header"
import { SkillBadge } from "./skill-badge"
import { skills, type SkillCategory } from "@/data/portfolio"

const categoryIcons: Record<SkillCategory, React.ReactNode> = {
  "Machine Learning": <Brain className="size-5 text-purple-400" />,
  Backend: <Server className="size-5 text-emerald-400" />,
  Frontend: <Layout className="size-5 text-sky-400" />,
  "Tools & DevOps": <Wrench className="size-5 text-amber-400" />,
}

const categories: SkillCategory[] = [
  "Machine Learning",
  "Backend",
  "Frontend",
  "Tools & DevOps",
]

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-24" aria-label="Skills">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Skills & Technologies"
          subtitle="The tools and technologies I use to bring ideas to life."
        />

        <div className="grid gap-8 sm:grid-cols-2">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (s) => s.category === category
            )
            return (
              <div key={category} className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  {categoryIcons[category]}
                  <h3 className="text-sm font-semibold tracking-wide text-foreground">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <SkillBadge
                      key={skill.label}
                      label={skill.label}
                      category={skill.category}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
