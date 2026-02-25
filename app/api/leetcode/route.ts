import { NextResponse } from "next/server"

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql"
const USERNAME = "ASR134"

// Cache for 10 minutes on Vercel edge
export const revalidate = 600

async function gql(query: string, variables: Record<string, unknown> = {}) {
  const res = await fetch(LEETCODE_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 600 },
  })
  if (!res.ok) throw new Error(`LeetCode API error: ${res.status}`)
  return res.json()
}

export async function GET() {
  try {
    // Fetch all data in parallel
    const [profileRes, calendarRes, badgesRes] = await Promise.all([
      // User profile + problem stats
      gql(`
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              reputation
            }
            submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
          allQuestionsCount {
            difficulty
            count
          }
        }
      `, { username: USERNAME }),

      // Submission calendar + streak
      gql(`
        query userCalendar($username: String!, $year: Int) {
          matchedUser(username: $username) {
            userCalendar(year: $year) {
              activeYears
              streak
              totalActiveDays
              submissionCalendar
            }
          }
        }
      `, { username: USERNAME }),

      // Badges
      gql(`
        query userBadges($username: String!) {
          matchedUser(username: $username) {
            badges {
              id
              displayName
              creationDate
            }
          }
        }
      `, { username: USERNAME }),
    ])

    const user = profileRes.data.matchedUser
    const allQuestions = profileRes.data.allQuestionsCount
    const calendar = calendarRes.data.matchedUser.userCalendar
    const badges = badgesRes.data.matchedUser.badges || []

    // Parse submission stats
    const acStats = user.submitStatsGlobal.acSubmissionNum
    const findStat = (diff: string) => acStats.find((s: { difficulty: string; count: number }) => s.difficulty === diff)?.count || 0
    const findTotal = (diff: string) => allQuestions.find((q: { difficulty: string; count: number }) => q.difficulty === diff)?.count || 0

    const totalSolved = findStat("All")
    const easySolved = findStat("Easy")
    const mediumSolved = findStat("Medium")
    const hardSolved = findStat("Hard")

    const easyTotal = findTotal("Easy")
    const mediumTotal = findTotal("Medium")
    const hardTotal = findTotal("Hard")
    const totalProblems = findTotal("All")

    // Parse submission calendar for heatmap (JSON string of unix-timestamp:count)
    let submissionCalendar: Record<string, number> = {}
    try {
      submissionCalendar = JSON.parse(calendar.submissionCalendar || "{}")
    } catch {
      submissionCalendar = {}
    }

    // Build heatmap data: 53 weeks x 7 days, levels 0-4
    const now = new Date()
    const oneYearAgo = new Date(now)
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    // Start from the Sunday of the week containing oneYearAgo
    const startDate = new Date(oneYearAgo)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    const heatmapData: number[] = []
    let maxSubmissions = 0
    const dailyCounts: number[] = []

    for (let i = 0; i < 371; i++) {
      const d = new Date(startDate)
      d.setDate(d.getDate() + i)
      const ts = Math.floor(d.getTime() / 1000).toString()

      // LeetCode uses day-start timestamps, check nearby keys
      const dayStart = Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 1000)
      const count = submissionCalendar[dayStart.toString()] || submissionCalendar[ts] || 0
      dailyCounts.push(count)
      if (count > maxSubmissions) maxSubmissions = count
    }

    // Normalize to 0-4 levels
    for (const count of dailyCounts) {
      if (count === 0) heatmapData.push(0)
      else if (count <= maxSubmissions * 0.25) heatmapData.push(1)
      else if (count <= maxSubmissions * 0.5) heatmapData.push(2)
      else if (count <= maxSubmissions * 0.75) heatmapData.push(3)
      else heatmapData.push(4)
    }

    // Total submissions in past year
    const totalSubmissions = dailyCounts.reduce((sum, c) => sum + c, 0)
    const activeDays = dailyCounts.filter((c) => c > 0).length

    // Format badges
    const formattedBadges = badges
      .sort((a: { creationDate: string }, b: { creationDate: string }) =>
        new Date(Number(b.creationDate) * 1000).getTime() - new Date(Number(a.creationDate) * 1000).getTime()
      )
      .slice(0, 3)
      .map((badge: { displayName: string; creationDate: string }, i: number) => ({
        title: badge.displayName,
        subtitle: new Date(Number(badge.creationDate) * 1000).getFullYear().toString(),
        recent: i === 0,
      }))

    return NextResponse.json({
      username: USERNAME,
      profile: {
        solved: totalSolved,
        totalProblems,
        globalRanking: user.profile.ranking,
        maxStreak: calendar.streak,
        activeDays,
      },
      breakdown: {
        easy: { solved: easySolved, total: easyTotal },
        medium: { solved: mediumSolved, total: mediumTotal },
        hard: { solved: hardSolved, total: hardTotal },
      },
      badges: formattedBadges.length > 0
        ? formattedBadges
        : [
            { title: "Getting Started", subtitle: "2024", recent: true },
          ],
      heatmap: {
        data: heatmapData,
        totalSubmissions,
        activeDays,
        maxStreak: calendar.streak,
      },
    })
  } catch (error) {
    console.error("LeetCode API fetch failed:", error)
    return NextResponse.json(
      { error: "Failed to fetch LeetCode stats" },
      { status: 500 }
    )
  }
}
