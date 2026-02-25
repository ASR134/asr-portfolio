export const personalInfo = {
  name: "Alex Chen",
  role: "ML Engineer / Full Stack Developer / Open Source Contributor",
  bio: "Building intelligent systems at the intersection of machine learning and software engineering. Deploying production-grade ML models and crafting seamless user experiences that make complex technology accessible.",
  email: "alex.chen@example.com",
  resumeUrl: "#",
  openToOpportunities: true,
}

export const socialLinks = [
  { platform: "GitHub", url: "https://github.com", command: "github --open" },
  { platform: "LinkedIn", url: "https://linkedin.com", command: "linkedin --connect" },
  { platform: "X / Twitter", url: "https://x.com", command: "twitter --follow" },
  { platform: "Email", url: "mailto:alex.chen@example.com", command: "mail --send" },
]

export const techStackLine = "python · pytorch · react · next.js · fastapi · docker · typescript · postgresql"

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
      { label: "Python", category: "ml" },
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
  shortLabel: string
  category: SkillCategory
}

export const skills: Skill[] = [
  { label: "PyTorch", shortLabel: "PT", category: "Machine Learning" },
  { label: "TensorFlow", shortLabel: "TF", category: "Machine Learning" },
  { label: "scikit-learn", shortLabel: "SK", category: "Machine Learning" },
  { label: "Hugging Face", shortLabel: "HF", category: "Machine Learning" },
  { label: "Computer Vision", shortLabel: "CV", category: "Machine Learning" },
  { label: "NLP", shortLabel: "NL", category: "Machine Learning" },
  { label: "MLOps", shortLabel: "MO", category: "Machine Learning" },
  { label: "ONNX", shortLabel: "OX", category: "Machine Learning" },
  { label: "Python", shortLabel: "PY", category: "Backend" },
  { label: "Node.js", shortLabel: "NJ", category: "Backend" },
  { label: "FastAPI", shortLabel: "FA", category: "Backend" },
  { label: "PostgreSQL", shortLabel: "PG", category: "Backend" },
  { label: "Redis", shortLabel: "RD", category: "Backend" },
  { label: "GraphQL", shortLabel: "GQ", category: "Backend" },
  { label: "React", shortLabel: "RC", category: "Frontend" },
  { label: "Next.js", shortLabel: "NX", category: "Frontend" },
  { label: "TypeScript", shortLabel: "TS", category: "Frontend" },
  { label: "Tailwind CSS", shortLabel: "TW", category: "Frontend" },
  { label: "Three.js", shortLabel: "3J", category: "Frontend" },
  { label: "Docker", shortLabel: "DK", category: "Tools & DevOps" },
  { label: "Kubernetes", shortLabel: "K8", category: "Tools & DevOps" },
  { label: "AWS", shortLabel: "AW", category: "Tools & DevOps" },
  { label: "Git", shortLabel: "GT", category: "Tools & DevOps" },
  { label: "CI/CD", shortLabel: "CI", category: "Tools & DevOps" },
  { label: "Linux", shortLabel: "LX", category: "Tools & DevOps" },
]

export const skillCategories: SkillCategory[] = [
  "Machine Learning",
  "Backend",
  "Frontend",
  "Tools & DevOps",
]

export type Achievement = {
  title: string
  description: string
  date: string
  link?: string
}

export const achievements: Achievement[] = [
  {
    title: "Kaggle Competition -- Top 2%",
    description:
      "Gold medal in Google Brain ventilator pressure prediction with an ensemble of transformer models.",
    date: "2025",
    link: "https://kaggle.com",
  },
  {
    title: "HackMIT -- 1st Place",
    description:
      "Built an AI-powered accessibility tool generating real-time audio descriptions for visually impaired users.",
    date: "2024",
    link: "https://hackmit.org",
  },
  {
    title: "Open Source -- 2k+ GitHub Stars",
    description:
      "Created DataForge, an open-source data pipeline toolkit adopted by teams at multiple Fortune 500 companies.",
    date: "2024",
    link: "https://github.com",
  },
  {
    title: "Research Publication -- NeurIPS Workshop",
    description:
      "Co-authored paper on efficient fine-tuning methods for large language models in resource-constrained environments.",
    date: "2024",
    link: "#",
  },
]
