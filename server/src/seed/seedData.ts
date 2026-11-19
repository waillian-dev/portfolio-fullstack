export const seedProfileData = {
  fullName: 'Alex Vance',
  headline: 'Senior Full-Stack Developer & Software Architect',
  bio: 'Passionate software architect with 5+ years of experience building high-performance web applications, distributed microservices, and elegant modern frontends using the MERN stack and TypeScript.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  location: 'San Francisco, CA',
  email: 'alex.vance@example.com',
  phone: '+1 (555) 234-5678',
  availabilityStatus: 'Available for Freelance / Full-Time Opportunities',
  resumeUrl: '/sample_resume.pdf',
  stats: {
    yearsExperience: 5,
    completedProjects: 32,
    totalClients: 18,
    technologiesMastered: 24,
  },
};

export const seedSkillsData = [
  { name: 'React', icon: 'Code', category: 'Frontend', percentage: 95, years: 5, displayOrder: 1 },
  { name: 'TypeScript', icon: 'FileCode', category: 'Frontend', percentage: 90, years: 4, displayOrder: 2 },
  { name: 'Next.js', icon: 'Globe', category: 'Frontend', percentage: 88, years: 3, displayOrder: 3 },
  { name: 'Tailwind CSS', icon: 'Palette', category: 'Frontend', percentage: 95, years: 4, displayOrder: 4 },
  { name: 'Node.js', icon: 'Server', category: 'Backend', percentage: 92, years: 5, displayOrder: 5 },
  { name: 'Express.js', icon: 'Cpu', category: 'Backend', percentage: 92, years: 5, displayOrder: 6 },
  { name: 'REST API', icon: 'Network', category: 'Backend', percentage: 95, years: 5, displayOrder: 7 },
  { name: 'MongoDB', icon: 'Database', category: 'Database', percentage: 88, years: 4, displayOrder: 8 },
  { name: 'PostgreSQL', icon: 'Database', category: 'Database', percentage: 82, years: 3, displayOrder: 9 },
  { name: 'Docker', icon: 'Box', category: 'DevOps & Tools', percentage: 80, years: 3, displayOrder: 10 },
  { name: 'Git & GitHub', icon: 'GitBranch', category: 'DevOps & Tools', percentage: 95, years: 5, displayOrder: 11 },
];

export const seedExperienceData = [
  {
    jobTitle: 'Senior Full-Stack Developer',
    company: 'Apex Tech Solutions',
    location: 'San Francisco, CA',
    startDate: new Date('2023-01-15'),
    isCurrent: true,
    employmentType: 'Full-Time',
    description: 'Leading a team of 6 engineers building cloud-native SaaS analytics platforms.',
    responsibilities: [
      'Architected microservices using Node.js, Express, and MongoDB handling 1M+ daily API requests.',
      'Designed responsive UI dashboards using React, TypeScript, and Tailwind CSS.',
      'Improved API latency by 45% using Redis caching and query optimization.',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker', 'AWS'],
    displayOrder: 1,
  },
  {
    jobTitle: 'Full-Stack Software Engineer',
    company: 'Innovate Labs',
    location: 'Remote',
    startDate: new Date('2021-03-01'),
    endDate: new Date('2022-12-31'),
    isCurrent: false,
    employmentType: 'Full-Time',
    description: 'Developed e-commerce platforms and modern customer-facing web portals.',
    responsibilities: [
      'Built scalable RESTful APIs and integrated stripe payment gateway.',
      'Migrated legacy codebase to TypeScript reducing runtime errors by 60%.',
      'Collaborated closely with UI/UX designers to implement pixel-perfect Figma designs.',
    ],
    technologies: ['React', 'Express', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    displayOrder: 2,
  },
];

export const seedServicesData = [
  {
    title: 'Full-Stack Web Development',
    icon: 'Layout',
    shortDescription: 'Building complete modern web applications from frontend UI to database architecture.',
    features: ['React & Next.js Frontends', 'Node.js & Express REST APIs', 'MongoDB / SQL Databases', 'Clean Component Architecture'],
    priceRange: 'Custom Quote',
    ctaText: 'Start a Project',
    displayOrder: 1,
  },
  {
    title: 'API & Backend Architecture',
    icon: 'Server',
    shortDescription: 'Designing secure, scalable RESTful APIs and microservices for modern applications.',
    features: ['JWT Authentication', 'Rate Limiting & Security', 'Third-Party API Integrations', 'Database Modeling & Indexing'],
    priceRange: 'Custom Quote',
    ctaText: 'Discuss Requirements',
    displayOrder: 2,
  },
  {
    title: 'Admin Dashboard Development',
    icon: 'BarChart2',
    shortDescription: 'Creating feature-rich management portals with interactive charts and CMS capabilities.',
    features: ['Role-Based Access Control', 'Recharts Analytics Visualizations', 'Data Exporting & Audit Logs', 'Responsive Layouts'],
    priceRange: 'Custom Quote',
    ctaText: 'Build Dashboard',
    displayOrder: 3,
  },
];

export const seedProjectsData = [
  {
    title: 'PulseAnalytics — SaaS Cloud Dashboard',
    slug: 'pulse-analytics-saas-cloud-dashboard',
    shortDescription: 'Real-time analytics platform with custom dashboards, JWT auth, and interactive data visualization.',
    fullDescription: 'PulseAnalytics is an enterprise-ready SaaS telemetry platform designed to monitor web traffic, app events, and infrastructure health in real time. Built with the MERN stack, TanStack Query, and Recharts.',
    category: 'Dashboard',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Recharts', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/pulse-analytics',
    liveUrl: 'https://pulse-analytics-demo.com',
    featured: true,
    completionDate: new Date('2024-02-10'),
    problemStatement: 'Businesses lacked a unified dashboard to monitor real-time telemetry from multiple distributed cloud servers.',
    solutionStatement: 'Engineered a real-time data ingestion pipeline paired with high-performance React chart rendering.',
    keyFeatures: ['Live Websocket metrics', 'Customizable chart widgets', 'Exportable PDF reports', 'Multi-tenant team management'],
    displayOrder: 1,
  },
  {
    title: 'DevSphere — Developer Community Hub',
    slug: 'devsphere-developer-community-hub',
    shortDescription: 'Social discussion platform for software developers featuring rich text posts, markdown, and code snippet sharing.',
    fullDescription: 'DevSphere empowers developers to post articles, review code snippets, ask questions, and upvote quality tech insights.',
    category: 'Web',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&auto=format&fit=crop&q=80',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Zod', 'Framer Motion'],
    githubUrl: 'https://github.com/example/devsphere',
    liveUrl: 'https://devsphere-demo.com',
    featured: true,
    completionDate: new Date('2023-11-20'),
    problemStatement: 'Developer communities need fast markdown rendering with syntax highlighting and low-latency interaction.',
    solutionStatement: 'Implemented optimistic UI updates via TanStack Query and server-side markdown parsing.',
    keyFeatures: ['Markdown editor with preview', 'Tag filtering', 'Nested comment trees', 'User badges & rep system'],
    displayOrder: 2,
  },
];

export const seedTestimonialsData = [
  {
    clientName: 'Sarah Jenkins',
    jobTitle: 'VP of Product',
    company: 'CloudScale Inc.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'Alex delivered our SaaS admin dashboard 2 weeks ahead of schedule. The code quality, documentation, and responsiveness exceeded all expectations!',
    isApproved: true,
    displayOrder: 1,
  },
  {
    clientName: 'Michael Chang',
    jobTitle: 'CTO & Co-Founder',
    company: 'Nexus Fintech',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    content: 'An exceptional full-stack developer who understands both product architecture and UI elegance. Highly recommended for any serious MERN project.',
    isApproved: true,
    displayOrder: 2,
  },
];

export const seedBlogPostsData = [
  {
    title: 'Building Production-Ready MERN Applications with TypeScript',
    slug: 'building-production-ready-mern-applications-with-typescript',
    summary: 'A deep dive into clean architecture, strict typing across full-stack repositories, and effective error handling.',
    content: `# Building Production-Ready MERN Applications with TypeScript

TypeScript has transformed modern JavaScript development by bringing end-to-end type safety to full-stack applications.

## Key Architectural Principles

1. **Shared Types**: Maintain clear TypeScript interfaces for models, request payloads, and API responses.
2. **Controller Isolation**: Keep business logic in services and controllers lean.
3. **Centralized Error Handling**: Use custom Error classes to produce predictable JSON responses.

Happy Coding!`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    category: 'Engineering',
    tags: ['MERN', 'TypeScript', 'Node.js', 'React'],
    author: 'Alex Vance',
    isPublished: true,
    readingTimeMinutes: 6,
    viewsCount: 1420,
    publishedAt: new Date('2024-03-01'),
  },
];

export const seedSiteSettingsData = {
  siteTitle: 'Alex Vance — Senior Full-Stack Developer',
  siteDescription: 'Official portfolio and software engineering hub of Alex Vance.',
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.svg',
  primaryColor: '#6366f1',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  maintenanceMode: false,
  maintenanceMessage: 'Site is under maintenance.',
};
