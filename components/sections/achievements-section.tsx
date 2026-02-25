import { SectionHeader } from "./section-header"
import { AchievementCard } from "./achievement-card"
import { achievements } from "@/data/portfolio"

export function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="px-6 py-24"
      aria-label="Achievements"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          title="Achievements"
          subtitle="Competitions won, milestones reached, and contributions that made an impact."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.title} {...achievement} />
          ))}
        </div>
      </div>
    </section>
  )
}
