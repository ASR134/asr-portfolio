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
}

export const skills: Skill[] = [
  { label: "PyTorch", category: "Machine Learning" },
  { label: "TensorFlow", category: "Machine Learning" },
  { label: "scikit-learn", category: "Machine Learning" },
  { label: "HuggingFace", category: "Machine Learning" },
  { label: "OpenCV", category: "Machine Learning" },
  { label: "NLTK", category: "Machine Learning" },
  { label: "MLflow", category: "Machine Learning" },
  { label: "ONNX", category: "Machine Learning" },
  { label: "Python", category: "Backend" },
  { label: "Node.js", category: "Backend" },
  { label: "FastAPI", category: "Backend" },
  { label: "PostgreSQL", category: "Backend" },
  { label: "Redis", category: "Backend" },
  { label: "GraphQL", category: "Backend" },
  { label: "React", category: "Frontend" },
  { label: "Next.js", category: "Frontend" },
  { label: "TypeScript", category: "Frontend" },
  { label: "Tailwind CSS", category: "Frontend" },
  { label: "Three.js", category: "Frontend" },
  { label: "Docker", category: "Tools & DevOps" },
  { label: "Kubernetes", category: "Tools & DevOps" },
  { label: "AWS", category: "Tools & DevOps" },
  { label: "Git", category: "Tools & DevOps" },
  { label: "CI/CD", category: "Tools & DevOps" },
  { label: "Linux", category: "Tools & DevOps" },
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

// GitHub-style heatmap data (52 weeks x 7 days)
export function generateHeatmapData(): number[] {
  // Seed for deterministic, realistic-looking data
  const data: number[] = []
  const seed = [
    3,0,1,2,4,3,0,2,1,0,0,3,4,2,1,0,2,3,4,4,3,2,1,0,0,1,2,3,3,4,2,1,0,1,2,
    4,3,2,0,0,1,1,2,3,4,4,3,2,1,0,1,2,3,4,3,2,1,0,0,1,2,2,3,4,4,3,2,1,0,1,
    2,3,3,2,1,0,0,1,2,3,4,4,3,2,1,0,1,2,3,4,3,2,1,0,0,1,3,4,4,3,2,1,0,0,1,
    2,3,4,4,3,2,1,0,1,2,3,3,4,2,1,0,1,2,4,3,2,0,0,1,1,2,3,4,4,3,2,1,0,0,2,
    3,4,4,3,2,1,0,1,2,3,4,3,2,1,0,0,1,2,2,3,4,4,3,2,1,0,1,2,3,3,2,1,0,0,1,
    2,3,4,4,3,2,1,0,1,2,3,4,3,2,1,0,0,1,3,4,4,3,2,1,0,0,1,2,3,4,4,3,2,1,0,
    1,2,3,3,4,2,1,0,1,2,4,3,2,0,0,1,1,2,3,4,4,3,2,1,0,0,2,3,4,4,3,2,1,0,1,
    2,3,4,3,2,1,0,0,1,2,2,3,4,4,3,2,1,0,1,2,3,3,2,1,0,0,1,2,3,4,4,3,2,1,0,
    1,2,3,4,3,2,1,0,0,1,3,4,4,3,2,1,0,0,1,2,3,4,4,3,2,1,0,1,2,3,3,4,2,1,0,
    1,2,4,3,2,0,0,1,1,2,3,4,4,3,2,1,0,0,2,3,4,4,3,0,1,0,1,2,3,4,3,2,1,0,0,
    1,2,2,3,4,4,3,2,1,0,1,2,
  ]
  for (let i = 0; i < 364; i++) {
    data.push(seed[i % seed.length])
  }
  return data
}

export const stats = [
  { command: "$ commits --year", value: "847", label: "commits this year" },
  { command: "$ repos --public", value: "23", label: "public repositories" },
  { command: "$ stars --total", value: "2.1k", label: "total stars earned" },
]
