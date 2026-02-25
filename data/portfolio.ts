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
  description: string
  tags: { label: string; category: "ml" | "frontend" | "backend" | "devops" }[]
  githubUrl: string
  demoUrl?: string
}

export const projects: Project[] = [
  {
    title: "NeuralDeploy",
    description:
      "End-to-end ML model deployment platform with auto-scaling inference endpoints, model versioning, and real-time monitoring dashboards.",
    tags: [
      { label: "PyTorch", category: "ml" },
      { label: "FastAPI", category: "backend" },
      { label: "Docker", category: "devops" },
      { label: "React", category: "frontend" },
    ],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
  },
  {
    title: "CollabSpace",
    description:
      "Real-time collaborative workspace with AI-powered document summarization, smart task assignment, and team analytics.",
    tags: [
      { label: "Next.js", category: "frontend" },
      { label: "WebSocket", category: "backend" },
      { label: "OpenAI", category: "ml" },
      { label: "PostgreSQL", category: "backend" },
    ],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
  },
  {
    title: "DataForge",
    description:
      "Open-source CLI toolkit for automated data pipeline construction, featuring schema inference, quality checks, and transformation DSL.",
    tags: [
      { label: "Python", category: "backend" },
      { label: "CLI", category: "devops" },
      { label: "Pandas", category: "ml" },
      { label: "Arrow", category: "backend" },
    ],
    githubUrl: "https://github.com",
  },
  {
    title: "VisionLab",
    description:
      "Computer vision research toolkit for rapid prototyping of image classification, object detection, and segmentation pipelines.",
    tags: [
      { label: "PyTorch", category: "ml" },
      { label: "OpenCV", category: "ml" },
      { label: "FastAPI", category: "backend" },
      { label: "Docker", category: "devops" },
    ],
    githubUrl: "https://github.com",
    demoUrl: "https://example.com",
  },
]

export type SkillCategory = "Machine Learning" | "Backend" | "Frontend" | "Tools & DevOps"

export type Skill = {
  label: string
  category: SkillCategory
  iconSlug: string | null
}

export const skills: Skill[] = [
  { label: "PyTorch", category: "Machine Learning", iconSlug: "pytorch" },
  { label: "TensorFlow", category: "Machine Learning", iconSlug: "tensorflow" },
  { label: "scikit-learn", category: "Machine Learning", iconSlug: "scikitlearn" },
  { label: "HuggingFace", category: "Machine Learning", iconSlug: "huggingface" },
  { label: "OpenCV", category: "Machine Learning", iconSlug: "opencv" },
  { label: "NLTK", category: "Machine Learning", iconSlug: null },
  { label: "MLflow", category: "Machine Learning", iconSlug: "mlflow" },
  { label: "ONNX", category: "Machine Learning", iconSlug: "onnx" },
  { label: "Python", category: "Backend", iconSlug: "python" },
  { label: "Node.js", category: "Backend", iconSlug: "nodedotjs" },
  { label: "FastAPI", category: "Backend", iconSlug: "fastapi" },
  { label: "PostgreSQL", category: "Backend", iconSlug: "postgresql" },
  { label: "Redis", category: "Backend", iconSlug: "redis" },
  { label: "GraphQL", category: "Backend", iconSlug: "graphql" },
  { label: "React", category: "Frontend", iconSlug: "react" },
  { label: "Next.js", category: "Frontend", iconSlug: "nextdotjs" },
  { label: "TypeScript", category: "Frontend", iconSlug: "typescript" },
  { label: "Tailwind CSS", category: "Frontend", iconSlug: "tailwindcss" },
  { label: "Three.js", category: "Frontend", iconSlug: "threedotjs" },
  { label: "Docker", category: "Tools & DevOps", iconSlug: "docker" },
  { label: "Kubernetes", category: "Tools & DevOps", iconSlug: "kubernetes" },
  { label: "AWS", category: "Tools & DevOps", iconSlug: "amazonaws" },
  { label: "Git", category: "Tools & DevOps", iconSlug: "git" },
  { label: "CI/CD", category: "Tools & DevOps", iconSlug: "githubactions" },
  { label: "Linux", category: "Tools & DevOps", iconSlug: "linux" },
]

export const skillCategories: SkillCategory[] = [
  "Machine Learning",
  "Backend",
  "Frontend",
  "Tools & DevOps",
]

export const categoryColorMap: Record<SkillCategory, string> = {
  "Machine Learning": "#00FF87",
  "Backend": "#00C2FF",
  "Frontend": "#4D9EFF",
  "Tools & DevOps": "#FFB547",
}

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

// Generate realistic LeetCode-style heatmap (53 weeks x 7 days)
export function generateLeetcodeHeatmap(): number[] {
  const data: number[] = []
  // Deterministic dense activity pattern
  const seed = [
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
  for (let i = 0; i < 371; i++) {
    data.push(seed[i % seed.length])
  }
  return data
}
