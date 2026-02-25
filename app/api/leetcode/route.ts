import { NextResponse } from "next/server"

const USERNAME = "ASR134"

// Try multiple sources for resilience
const SOURCES = [
  `https://leetcode-stats-api.herokuapp.com/${USERNAME}`,
  `https://leetcode-api-faisalshehzad.vercel.app/${USERNAME}`,
]

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql"

// 10-minute cache
export const revalidate = 600

// ---- GraphQL helper ----
async function gql(query: string, variables: Record<string, unknown> = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)
  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      next: { revalidate: 600 },
    })
    clearTimeout(timeout)
    if (!res.ok) throw new Error(`GraphQL ${res.status}`)
    return res.json()
  } catch (e) {
    clearTimeout(timeout)
    throw e
  }
}

// ---- Strategy 1: unofficial stats API ----
async function fetchFromStatsAPI(): Promise<LeetCodeResponse | null> {
  for (const url of SOURCES) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 6000)
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timeout)

      if (!res.ok) continue
      const d = await res.json()
      if (d.status === "error" || !d.totalSolved) continue

      return {
        username: USERNAME,
        profile: {
          solved: d.totalSolved ?? 0,
          totalProblems: (d.totalQuestions ?? d.totalEasy + d.totalMedium + d.totalHard) || 3400,
          globalRanking: d.ranking ?? 0,
          maxStreak: 0,
          activeDays: 0,
        },
        breakdown: {
          easy: { solved: d.easySolved ?? 0, total: d.totalEasy ?? 830 },
          medium: { solved: d.mediumSolved ?? 0, total: d.totalMedium ?? 1740 },
          hard: { solved: d.hardSolved ?? 0, total: d.totalHard ?? 760 },
        },
        badges: [],
        source: "stats-api",
      }
    } catch {
      continue
    }
  }
  return null
}

// ---- Strategy 2: LeetCode GraphQL direct ----
async function fetchFromGraphQL(): Promise<LeetCodeResponse | null> {
  try {
    const [profileRes, calendarRes, badgesRes] = await Promise.all([
      gql(
        `query userProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile { ranking }
            submitStatsGlobal {
              acSubmissionNum { difficulty count }
            }
          }
          allQuestionsCount { difficulty count }
        }`,
        { username: USERNAME }
      ),
      gql(
        `query userCalendar($username: String!, $year: Int) {
          matchedUser(username: $username) {
            userCalendar(year: $year) {
              streak
              totalActiveDays
              submissionCalendar
            }
          }
        }`,
        { username: USERNAME }
      ),
      gql(
        `query userBadges($username: String!) {
          matchedUser(username: $username) {
            badges { id displayName creationDate }
          }
        }`,
        { username: USERNAME }
      ),
    ])

    const user = profileRes.data.matchedUser
    const allQuestions = profileRes.data.allQuestionsCount
    const calendar = calendarRes.data.matchedUser.userCalendar
    const rawBadges = badgesRes.data.matchedUser.badges || []

    const acStats = user.submitStatsGlobal.acSubmissionNum
    const find = (diff: string) =>
      acStats.find((s: { difficulty: string; count: number }) => s.difficulty === diff)?.count || 0
    const findQ = (diff: string) =>
      allQuestions.find((q: { difficulty: string; count: number }) => q.difficulty === diff)?.count || 0

    // Parse calendar for active days
    let calendarData: Record<string, number> = {}
    try {
      calendarData = JSON.parse(calendar.submissionCalendar || "{}")
    } catch {
      calendarData = {}
    }
    const totalSubmissions = Object.values(calendarData).reduce((s: number, c) => s + (c as number), 0)
    const activeDays = Object.values(calendarData).filter((c) => (c as number) > 0).length

    const badges = rawBadges
      .sort(
        (a: { creationDate: string }, b: { creationDate: string }) =>
          Number(b.creationDate) - Number(a.creationDate)
      )
      .slice(0, 3)
      .map((badge: { displayName: string; creationDate: string }, i: number) => ({
        title: badge.displayName,
        subtitle: new Date(Number(badge.creationDate) * 1000).getFullYear().toString(),
        recent: i === 0,
      }))

    return {
      username: USERNAME,
      profile: {
        solved: find("All"),
        totalProblems: findQ("All"),
        globalRanking: user.profile.ranking,
        maxStreak: calendar.streak,
        activeDays: activeDays || calendar.totalActiveDays,
        totalSubmissions,
      },
      breakdown: {
        easy: { solved: find("Easy"), total: findQ("Easy") },
        medium: { solved: find("Medium"), total: findQ("Medium") },
        hard: { solved: find("Hard"), total: findQ("Hard") },
      },
      badges: badges.length > 0 ? badges : [],
      source: "graphql",
    }
  } catch {
    return null
  }
}

// ---- Response type ----
type LeetCodeResponse = {
  username: string
  profile: {
    solved: number
    totalProblems: number
    globalRanking: number
    maxStreak: number
    activeDays: number
    totalSubmissions?: number
  }
  breakdown: {
    easy: { solved: number; total: number }
    medium: { solved: number; total: number }
    hard: { solved: number; total: number }
  }
  badges: { title: string; subtitle: string; recent: boolean }[]
  source: string
}

export async function GET() {
  // Try GraphQL first (most complete), fall back to stats API
  const graphqlData = await fetchFromGraphQL()
  if (graphqlData) {
    return NextResponse.json(graphqlData, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200" },
    })
  }

  const statsData = await fetchFromStatsAPI()
  if (statsData) {
    return NextResponse.json(statsData, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200" },
    })
  }

  // All sources failed -- return error
  return NextResponse.json({ error: "All LeetCode data sources unavailable" }, { status: 502 })
}
