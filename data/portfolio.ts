export const personalInfo = {
  name: "Alex Chen",
  role: "ML Engineer / Full Stack Developer / Open Source Contributor",
  bio: "Building intelligent systems at the intersection of machine learning and software engineering. Deploying production-grade ML models and crafting seamless user experiences that make complex technology accessible.",
  email: "alex.chen@example.com",
  resumeUrl: "#",
  openToOpportunities: true,
}

export const socialLinks = [
  { platform: "GitHub", url: "https://github.com/alexchen", command: "github --open" },
  { platform: "LinkedIn", url: "https://linkedin.com/in/alexchen", command: "linkedin --connect" },
  { platform: "X / Twitter", url: "https://twitter.com/alexchen", command: "twitter --follow" },
  { platform: "Email", url: "mailto:alex.chen@example.com", command: "mail --send" },
]

export const techStackLine = "python \u00b7 pytorch \u00b7 react \u00b7 next.js \u00b7 fastapi \u00b7 docker \u00b7 typescript \u00b7 postgresql"

export type Project = {
  title: string
  tagline: string
  description: string
  tags: { label: string; category: "ml" | "frontend" | "backend" | "devops" }[]
  githubUrl: string
  demoUrl?: string
  accentColor: string
}

export const projects: Project[] = [
  {
    title: "MovieMind",
    tagline: "ML-powered movie recommendations that actually understand your taste",
    description:
      "Content-based + collaborative filtering recommendation engine trained on 100k+ ratings. Features real-time inference via FastAPI, interactive Streamlit dashboard, and A/B testing framework.",
    tags: [
      { label: "Python", category: "ml" },
      { label: "Scikit-learn", category: "ml" },
      { label: "FastAPI", category: "backend" },
      { label: "Streamlit", category: "frontend" },
    ],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    accentColor: "#00FF87",
  },
  {
    title: "InsightBoard",
    tagline: "Turn raw CSV data into beautiful, shareable analytics dashboards",
    description:
      "Drag-and-drop analytics dashboard builder with auto-visualization suggestions, real-time data refresh, and exportable reports. Supports CSV, JSON, and live API data sources.",
    tags: [
      { label: "Streamlit", category: "frontend" },
      { label: "Pandas", category: "ml" },
      { label: "Matplotlib", category: "ml" },
      { label: "Python", category: "backend" },
    ],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
    accentColor: "#00C2FF",
  },
  {
    title: "DataForge CLI",
    tagline: "Open-source toolkit for automated data pipeline construction",
    description:
      "CLI tool that automates data cleaning, transformation, and validation workflows. Features schema inference, configurable quality checks, and a YAML-based pipeline DSL.",
    tags: [
      { label: "Python", category: "backend" },
      { label: "Pydantic", category: "backend" },
      { label: "Pandas", category: "ml" },
      { label: "CLI", category: "devops" },
    ],
    githubUrl: "https://github.com",
    accentColor: "#FFB547",
  },
]

// ---- Tech Stack (categorized) ----

export type TechStackCategory = {
  title: string
  color: string
  skills: { label: string; iconSlug: string | null }[]
}

export const techStack: TechStackCategory[] = [
  {
    title: "Languages",
    color: "#00FF87",
    skills: [
      { label: "Python", iconSlug: "python" },
      { label: "C++", iconSlug: "cplusplus" },
    ],
  },
  {
    title: "Data Science & ML",
    color: "#00C2FF",
    skills: [
      { label: "NumPy", iconSlug: "numpy" },
      { label: "Pandas", iconSlug: "pandas" },
      { label: "Seaborn", iconSlug: null },
      { label: "Matplotlib", iconSlug: null },
      { label: "Scikit-learn", iconSlug: "scikitlearn" },
      { label: "SciPy", iconSlug: "scipy" },
    ],
  },
  {
    title: "Web Apps & Dashboards",
    color: "#A78BFA",
    skills: [
      { label: "Streamlit", iconSlug: "streamlit" },
    ],
  },
  {
    title: "Backend & APIs",
    color: "#4D9EFF",
    skills: [
      { label: "FastAPI", iconSlug: "fastapi" },
      { label: "Pydantic", iconSlug: "pydantic" },
      { label: "Uvicorn", iconSlug: null },
    ],
  },
  {
    title: "Tools & Platforms",
    color: "#FFB547",
    skills: [
      { label: "Jupyter", iconSlug: "jupyter" },
      { label: "Git", iconSlug: "git" },
      { label: "GitHub", iconSlug: "github" },
      { label: "VS Code", iconSlug: "visualstudiocode" },
      { label: "Linux", iconSlug: "linux" },
    ],
  },
]

// ---- LeetCode Stats ----

export const leetcode = {
  profile: {
    solved: 256,
    totalProblems: 3851,
    contestRating: 1544,
    contestPercentile: "Top 33%",
    globalRanking: 273210,
    totalUsers: 839080,
    activeDays: 207,
    maxStreak: 20,
  },
  breakdown: {
    easy: { solved: 69, total: 927 },
    medium: { solved: 164, total: 2014 },
    hard: { solved: 23, total: 910 },
  },
  badges: [
    { title: "100 Days Badge", subtitle: "2024", recent: false },
    { title: "200 Days Badge", subtitle: "2025", recent: true },
    { title: "Annual Contender", subtitle: "", recent: false },
  ],
  heatmap: {
    totalSubmissions: 1113,
    activeDays: 207,
    maxStreak: 20,
  },
}

// Generate realistic LeetCode-style heatmap (53 weeks x 7 days = 371 cells)
export function generateLeetcodeHeatmap(): number[] {
  // Full 371-entry deterministic pattern -- dense activity, realistic variation
  return [
    3,2,1,3,4,3,0, 2,3,0,2,4,3,1, 4,1,0,3,4,2,1, 0,2,3,4,4,3,2,
    1,0,0,1,2,3,3, 4,2,1,0,1,2,4, 3,2,2,0,1,1,2, 3,4,4,3,2,1,0,
    1,2,3,4,3,2,1, 0,0,1,2,2,3,4, 4,3,3,1,0,1,2, 3,3,2,1,0,0,1,
    2,3,4,4,3,3,1, 0,1,2,3,4,3,2, 1,0,0,1,3,4,4, 3,2,2,0,0,1,2,
    3,4,4,3,2,1,0, 1,2,3,3,4,2,2, 0,1,2,4,3,2,0, 0,1,1,2,3,4,4,
    3,2,1,0,0,2,3, 4,4,3,3,1,0,1, 2,3,4,3,2,1,0, 0,1,2,2,3,4,4,
    3,2,1,0,1,2,3, 3,2,2,0,0,1,2, 3,4,4,3,2,1,0, 1,2,3,4,3,3,1,
    0,0,1,3,4,4,3, 2,1,0,0,1,2,3, 4,4,3,2,1,0,1, 2,3,3,4,2,1,0,
    1,3,4,3,2,0,0, 1,1,2,3,4,4,3, 2,1,0,0,2,3,4, 4,3,2,1,0,1,2,
    3,4,3,2,1,0,0, 1,2,2,3,4,4,3, 2,2,0,1,2,3,3, 2,1,0,0,1,2,3,
    4,4,3,2,1,0,1, 2,3,4,3,2,1,0, 0,1,3,4,4,3,2, 1,0,0,1,2,3,4,
    4,3,3,1,0,1,2, 3,3,4,2,1,0,1, 2,4,3,3,0,0,1, 1,2,3,4,4,3,2,
    1,0,0,2,3,4,4, 3,2,1,0,1,2,3, 4,3,2,1,0,0,1, 2,2,3,4,4,3,2,
    1,0,1,2,3,
  ]
}
