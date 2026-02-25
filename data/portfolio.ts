export const personalInfo = {
  name: "Aman Rawat",
  role: "ML Engineer / Open Source Contributor",
  bio: "Building intelligent systems at the intersection of machine learning and software engineering. Deploying production-grade ML models and crafting seamless user experiences that make complex technology accessible.",
  email: "amansinghrawat992752@gmail.com",
  resumeUrl: "https://drive.google.com/file/d/1J-bs95cBPflsLWav0qKZ6U2F6Oy_WfS2/view?usp=drive_link",
  openToOpportunities: true,
}

export const socialLinks = [
  { platform: "GitHub", url: "https://github.com/ASR134", command: "github --open" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/aman-singh-rawat-758160328/", command: "linkedin --connect" },
  { platform: "X / Twitter", url: "https://x.com/AmanRawat196850", command: "twitter --follow" },
  { platform: "Email", url: "amansinghrawat992752@gmail.com", command: "mail --send" },
]

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
    title: "CineMatch",
    tagline: "ML-powered movie recommender",
    description:
      "CineMatch is a full-stack movie recommendation system — a FastAPI backend serving a content-based ML model ",
    tags: [
      { label: "Python", category: "ml" },
      { label: "Scikit-learn", category: "ml" },
      { label: "FastAPI", category: "backend" },
      { label: "Streamlit", category: "frontend" },
    ],
    githubUrl: "https://github.com/ASR134/movie_recommender",
    demoUrl: "https://movie-recommender-asr.streamlit.app/",
    accentColor: "#00FF87",
  },
  {
    title: "ChatPulse",
    tagline: "Whatsapp chats into visual insights",
    description:
      "Drop your chat to get detailed analytics and meaningful insights from your conversations with friends",
    tags: [
      { label: "Streamlit", category: "frontend" },
      { label: "Pandas", category: "ml" },
      { label: "Matplotlib", category: "ml" },
      { label: "Python", category: "backend" },
    ],
    githubUrl: "https://github.com/ASR134/whatsapp-chat-analyzer",
    demoUrl: "https://chat-analyzer-asr.streamlit.app/",
    accentColor: "#00C2FF",
  },
  {
    title: "GlucoSense",
    tagline: "Diabetes Risk Analyzer",
    description:
      "A modern, AI-powered web application that predicts diabetes risk from clinical parameters",
    tags: [
      { label: "Python", category: "backend" },
      { label: "Pydantic", category: "backend" },
      { label: "Pandas", category: "ml" },
      { label: "CLI", category: "devops" },
    ],
    githubUrl: "https://github.com/ASR134/Diabetes-web-app",
    demoUrl: "https://diabetes-web-app-asr.streamlit.app/",
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
    title: "Web Apps & Dashboards",
    color: "#b787f2",
    skills: [
      { label: "Streamlit", iconSlug: "streamlit" },
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
    title: "Backend & APIs",
    color: "#e1e86e",
    skills: [
      { label: "FastAPI", iconSlug: "fastapi" },
      { label: "Pydantic", iconSlug: "pydantic" },
      { label: "Uvicorn", iconSlug: null },
    ],
  },
  {
    title: "Tools & Platforms",
    color: "#00FF87",
    skills: [
      { label: "Jupyter", iconSlug: "jupyter" },
      { label: "Git", iconSlug: "git" },
      { label: "GitHub", iconSlug: "github" },
      { label: "Spyder", iconSlug: "spyder" },
      { label: "Linux", iconSlug: "linux" },
    ],
  },
]

// ---- Static LeetCode stats for ASR134 ----
export const leetcodeStats = {
  username: "ASR134",
  profileUrl: "https://leetcode.com/u/ASR134",
  lastUpdated: "2026-02-25",
  profile: {
    solved: 256,
    totalProblems: 3400,
    globalRanking: 273210,
    maxStreak: 20,
  },
  breakdown: {
    easy: { solved: 69, total: 830 },
    medium: { solved: 164, total: 1740 },
    hard: { solved: 23, total: 760 },
  },
  badges: [
    { title: "100 Days Badge", subtitle: "2024", recent: false },
    { title: "200 Days Badge", subtitle: "2025", recent: true },
    { title: "Annual Contender", subtitle: "2024", recent: false },
  ],
}
