export const personalInfo = {
  name: "Alex Chen",
  role: "ML Engineer  ·  Full Stack Developer  ·  Open Source Contributor",
  bio: "I build intelligent systems at the intersection of machine learning and software engineering. Passionate about deploying production-grade ML models and crafting seamless user experiences that make complex technology accessible.",
  email: "alex.chen@example.com",
  resumeUrl: "#",
  openToOpportunities: true,
}

export const socialLinks = [
  { platform: "GitHub", url: "https://github.com", icon: "github" as const },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com",
    icon: "linkedin" as const,
  },
  { platform: "X", url: "https://x.com", icon: "twitter" as const },
  {
    platform: "Email",
    url: "mailto:alex.chen@example.com",
    icon: "mail" as const,
  },
]

export const techStack = [
  { name: "Python", icon: "python" },
  { name: "PyTorch", icon: "pytorch" },
  { name: "TensorFlow", icon: "tensorflow" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Node.js", icon: "nodejs" },
  { name: "PostgreSQL", icon: "postgresql" },
]

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
      { label: "Apache Arrow", category: "backend" },
    ],
    githubUrl: "https://github.com",
  },
]

export type SkillCategory = "Machine Learning" | "Backend" | "Frontend" | "Tools & DevOps"

export type Skill = {
  label: string
  category: SkillCategory
}

export const skills: Skill[] = [
  // Machine Learning
  { label: "PyTorch", category: "Machine Learning" },
  { label: "TensorFlow", category: "Machine Learning" },
  { label: "scikit-learn", category: "Machine Learning" },
  { label: "Hugging Face", category: "Machine Learning" },
  { label: "Computer Vision", category: "Machine Learning" },
  { label: "NLP", category: "Machine Learning" },
  { label: "MLOps", category: "Machine Learning" },
  { label: "ONNX", category: "Machine Learning" },
  // Backend
  { label: "Python", category: "Backend" },
  { label: "Node.js", category: "Backend" },
  { label: "FastAPI", category: "Backend" },
  { label: "PostgreSQL", category: "Backend" },
  { label: "Redis", category: "Backend" },
  { label: "GraphQL", category: "Backend" },
  // Frontend
  { label: "React", category: "Frontend" },
  { label: "Next.js", category: "Frontend" },
  { label: "TypeScript", category: "Frontend" },
  { label: "Tailwind CSS", category: "Frontend" },
  { label: "Three.js", category: "Frontend" },
  // Tools & DevOps
  { label: "Docker", category: "Tools & DevOps" },
  { label: "Kubernetes", category: "Tools & DevOps" },
  { label: "AWS", category: "Tools & DevOps" },
  { label: "Git", category: "Tools & DevOps" },
  { label: "CI/CD", category: "Tools & DevOps" },
  { label: "Linux", category: "Tools & DevOps" },
]

export type Achievement = {
  title: string
  description: string
  date: string
  icon: "trophy" | "medal" | "star" | "award"
  link?: string
}

export const achievements: Achievement[] = [
  {
    title: "Kaggle Competition — Top 2%",
    description:
      "Achieved a gold medal in the Google Brain ventilator pressure prediction competition with an ensemble of transformer models.",
    date: "2025",
    icon: "trophy",
    link: "https://kaggle.com",
  },
  {
    title: "HackMIT — 1st Place",
    description:
      "Built an AI-powered accessibility tool that generates real-time audio descriptions for visually impaired users.",
    date: "2024",
    icon: "medal",
    link: "https://hackmit.org",
  },
  {
    title: "Open Source — 2k+ GitHub Stars",
    description:
      "Created DataForge, an open-source data pipeline toolkit adopted by teams at multiple Fortune 500 companies.",
    date: "2024",
    icon: "star",
    link: "https://github.com",
  },
  {
    title: "Research Publication — NeurIPS Workshop",
    description:
      "Co-authored a paper on efficient fine-tuning methods for large language models in resource-constrained environments.",
    date: "2024",
    icon: "award",
    link: "#",
  },
]
