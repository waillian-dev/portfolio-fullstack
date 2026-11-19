# MERN Stack Personal Portfolio — Coding Agent Prompt

You are a senior full-stack developer, UI/UX designer, and software architect.

Build a **modern, responsive, production-ready personal portfolio website** using the **MERN stack**.

The portfolio should feel premium, clean, modern, interactive, and developer-focused. It should work perfectly on desktop, tablet, and mobile.

---

## 1. Technology Stack

### Frontend

* React.js
* Vite
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Lucide React
* React Router
* Axios
* React Hook Form
* Zod
* TanStack Query
* Recharts where analytics are required

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

### Development

* ESLint
* Prettier
* dotenv
* Nodemon
* Git/GitHub

### Optional Services

* Cloudinary or Cloudflare R2 for image storage
* Email service such as Resend
* MongoDB Atlas
* Vercel for frontend
* Render/Railway/Vercel Functions for backend

---

# 2. Project Structure

Create a clean monorepo structure:

```text
portfolio/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── types/
│   │   └── assets/
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── config/
│   │   └── types/
│   └── ...
│
└── README.md
```

Use a modular architecture and keep business logic separated from routes/controllers.

---

# 3. Portfolio Website

Create the following public sections.

## Navbar

Create a responsive sticky navbar containing:

* Logo / Name
* Home
* About
* Skills
* Experience
* Services
* Projects
* Testimonials
* Blog
* Contact

Include:

* Dark/Light mode
* Mobile hamburger menu
* Smooth scrolling
* Active section indicator
* Resume download button
* Animated navbar transitions

---

# 4. Hero Section

Create an impressive developer-focused hero section.

Example content:

```text
Hi, I'm [NAME]

Full-Stack Developer
Building modern web & mobile experiences.

I design and develop scalable applications
with clean architecture and modern technologies.
```

Include:

* Profile image/avatar
* Short introduction
* Primary CTA: "View My Work"
* Secondary CTA: "Contact Me"
* Resume button
* GitHub button
* LinkedIn button
* Social links
* Animated background
* Subtle particles/grid/glow effects
* Framer Motion animations

Add a small availability badge:

```text
● Available for Freelance / Full-Time Opportunities
```

---

# 5. About Section

Create a professional About section.

Include:

* Profile image
* Short biography
* Career summary
* Developer experience
* Location
* Current role
* Years of experience
* Main specialties

Create statistic cards:

```text
5+ Years Experience
30+ Projects
15+ Technologies
10+ Clients
```

Make the statistics configurable from the admin panel.

---

# 6. Skills Section

Create an interactive skills section.

Group skills into:

### Frontend

* React
* Next.js
* JavaScript
* TypeScript
* HTML
* CSS
* Tailwind CSS
* Bootstrap

### Backend

* Node.js
* Express
* PHP
* Laravel
* REST API

### Database

* MongoDB
* MySQL
* PostgreSQL

### Mobile

* React Native
* Expo

### DevOps / Tools

* Git
* GitHub
* Docker
* Cloudflare
* Vercel
* Postman

Each skill should include:

* Name
* Icon
* Category
* Skill percentage
* Years of experience

Display them using visually attractive cards and progress indicators.

---

# 7. Experience Section

Create a professional timeline.

Each experience should contain:

* Job title
* Company
* Location
* Start date
* End date
* Employment type
* Description
* Responsibilities
* Technologies used

Example:

```text
Senior Full-Stack Developer
ABC Company
2024 — Present

Responsibilities:
- Developed scalable REST APIs
- Built React dashboards
- Designed database architecture
- Improved application performance
```

Use a vertical timeline UI.

---

# 8. Services Section

Create a service section.

Example services:

* Web Application Development
* Mobile Application Development
* Backend/API Development
* UI/UX Implementation
* Database Architecture
* Admin Dashboard Development
* QA & Testing
* Technical Consulting

Each service should have:

* Icon
* Title
* Description
* Features
* Optional price/range
* CTA

---

# 9. Projects Section

This should be one of the most important sections.

Create a modern project showcase.

Each project should contain:

* Project thumbnail
* Project name
* Short description
* Detailed description
* Category
* Technologies
* GitHub URL
* Live demo URL
* Featured flag
* Completion date
* Gallery images

Categories:

```text
All
Web
Mobile
Backend
Dashboard
UI/UX
Other
```

Add:

* Search
* Category filters
* Featured projects
* Project cards
* Hover animations
* Project detail modal/page

Create a project details route:

```text
/projects/:slug
```

Project details should display:

* Hero image
* Overview
* Problem
* Solution
* Features
* Technologies
* Architecture
* Screenshots
* Challenges
* Results
* GitHub
* Live Demo

---

# 10. Testimonials

Create a testimonial carousel.

Each testimonial contains:

* Client name
* Job title
* Company
* Profile image
* Rating
* Testimonial
* Date

Add smooth Framer Motion animations.

---

# 11. Blog

Create a simple developer blog.

Routes:

```text
/blog
/blog/:slug
```

Blog posts should contain:

* Title
* Slug
* Cover image
* Summary
* Content
* Tags
* Category
* Author
* Published date
* Reading time
* View count

Support Markdown or a rich-text editor.

Add:

* Search
* Categories
* Tags
* Related posts
* Latest posts

---

# 12. Contact Section

Create a professional contact form.

Fields:

```text
Name
Email
Subject
Message
```

Include:

* Form validation
* Loading state
* Success notification
* Error handling
* Email notification
* Spam protection/rate limiting

Add contact information:

```text
Email
Phone
Location
LinkedIn
GitHub
Facebook
Instagram
```

---

# 13. Admin Dashboard

Create a protected admin dashboard.

Route:

```text
/admin
```

Authentication:

```text
/admin/login
```

Use JWT-based authentication.

Admin features:

### Dashboard

Display:

* Total projects
* Total blog posts
* Total messages
* Total testimonials
* Portfolio views
* Recent messages
* Recent activities

### Profile Management

Admin can update:

* Name
* Profile photo
* Bio
* Job title
* Location
* Email
* Phone
* Social links
* Resume
* Availability status

### Skills Management

CRUD:

* Create skill
* Edit skill
* Delete skill
* Reorder skill
* Change category
* Change percentage

### Experience Management

CRUD:

* Add experience
* Edit experience
* Delete experience
* Reorder experience

### Services Management

CRUD:

* Add service
* Edit service
* Delete service
* Reorder service

### Projects Management

CRUD:

* Create project
* Edit project
* Delete project
* Publish/unpublish
* Featured/unfeatured
* Upload images
* Manage technologies
* Set GitHub URL
* Set live URL
* Reorder projects

### Blog Management

CRUD:

* Create article
* Edit article
* Delete article
* Draft
* Publish
* Schedule
* Categories
* Tags
* Featured article

### Testimonials

CRUD:

* Add testimonial
* Edit testimonial
* Delete testimonial
* Approve testimonial
* Publish/unpublish

### Contact Messages

Admin can:

* View messages
* Mark as read
* Mark as replied
* Delete messages
* Filter by status

---

# 14. Database Models

Create MongoDB models for:

```text
Admin
Profile
Skill
Experience
Service
Project
ProjectCategory
Testimonial
BlogPost
BlogCategory
ContactMessage
SocialLink
SiteSetting
```

Use proper:

* Indexing
* Validation
* timestamps
* unique constraints
* relationships/references
* slug generation

---

# 15. API Architecture

Create REST APIs.

Example:

```text
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/profile
PUT    /api/profile

GET    /api/skills
POST   /api/skills
PUT    /api/skills/:id
DELETE /api/skills/:id

GET    /api/experience
POST   /api/experience
PUT    /api/experience/:id
DELETE /api/experience/:id

GET    /api/services
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id

GET    /api/projects
GET    /api/projects/:slug
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id

GET    /api/testimonials
POST   /api/testimonials
PUT    /api/testimonials/:id
DELETE /api/testimonials/:id

GET    /api/blog
GET    /api/blog/:slug
POST   /api/blog
PUT    /api/blog/:id
DELETE /api/blog/:id

POST   /api/contact
GET    /api/contact
PATCH  /api/contact/:id
DELETE /api/contact/:id
```

Protect admin-only endpoints with authentication middleware.

---

# 16. UI/UX Design

The design should feel like a premium modern developer portfolio.

Use:

* Minimal layout
* Large typography
* Generous whitespace
* Glassmorphism where appropriate
* Subtle gradients
* Soft shadows
* Rounded cards
* Micro-interactions
* Smooth transitions
* Animated counters
* Scroll reveal animations
* Hover effects
* Skeleton loaders
* Toast notifications

Avoid:

* Excessive animations
* Overly bright gradients
* Cluttered layouts
* Generic bootstrap-looking designs
* Too many cards everywhere

The site should feel custom-designed rather than template-generated.

---

# 17. Theme System

Support:

```text
Light Mode
Dark Mode
System Mode
```

Persist theme preference in localStorage.

Create configurable theme tokens so the primary accent color can be changed easily.

---

# 18. Responsive Design

The entire application must support:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Pay special attention to:

* Navbar
* Hero
* Project cards
* Timeline
* Contact form
* Admin dashboard
* Tables
* Modals
* Charts

No horizontal overflow should exist.

---

# 19. SEO

Implement SEO properly.

Include:

* Dynamic page titles
* Meta descriptions
* Open Graph metadata
* Twitter/X cards
* Canonical URLs
* Sitemap
* Robots.txt
* Structured data / JSON-LD
* Semantic HTML

Generate dynamic metadata for:

```text
Projects
Blog posts
Services
```

---

# 20. Performance

Optimize the application for high Lighthouse scores.

Implement:

* Lazy loading
* Image optimization
* Code splitting
* Route-based loading
* API caching
* Pagination
* Optimized MongoDB queries
* Compression
* Proper HTTP caching
* Debounced search
* Optimized animations

Avoid unnecessary React re-renders.

---

# 21. Security

Implement production-level security:

* JWT authentication
* Password hashing with bcrypt
* HTTP-only cookies where appropriate
* CORS configuration
* Helmet
* Rate limiting
* Request validation
* MongoDB injection protection
* XSS protection
* File upload validation
* Image type/size validation
* Admin route protection
* Environment variables
* Secure error responses

Never expose:

```text
JWT secrets
MongoDB credentials
API keys
Cloud storage credentials
Email credentials
```

---

# 22. Error Handling

Create a centralized backend error handling system.

Return consistent API responses:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

For errors:

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": []
}
```

Frontend should handle:

* Loading
* Empty state
* Error state
* Network failure
* Unauthorized state
* Not found
* Form validation errors

---

# 23. Admin Dashboard UX

Use a professional dashboard layout:

```text
Sidebar
Topbar
Breadcrumb
Page Header
Content
```

Sidebar:

```text
Dashboard
Profile
Skills
Experience
Services
Projects
Testimonials
Blog
Messages
Settings
Logout
```

Use reusable components for:

* Data tables
* Forms
* Modal dialogs
* Confirm dialogs
* Image upload
* Rich text editor
* Filters
* Pagination
* Charts

---

# 24. Analytics

Create a basic portfolio analytics system.

Track:

* Page views
* Project views
* Blog views
* Contact submissions
* Popular projects
* Popular blog posts
* Referrer
* Device type
* Browser
* Country where reasonably available

Show analytics in the admin dashboard using Recharts.

Do not collect unnecessary personal data.

---

# 25. Admin Settings

Create a settings screen for:

### General

* Site title
* Site description
* Logo
* Favicon
* Primary color

### Social

* GitHub
* LinkedIn
* Facebook
* Instagram
* X/Twitter

### Contact

* Email
* Phone
* Location

### SEO

* Meta title
* Meta description
* Keywords
* OG image

### Maintenance

* Enable maintenance mode
* Maintenance message

---

# 26. Resume

Add a Resume section.

Allow admin to:

* Upload PDF resume
* Replace resume
* Download resume
* Track resume downloads

Add:

```text
Download Resume
```

CTA in the navbar and hero section.

---

# 27. Animation Guidelines

Use Framer Motion for:

* Page transitions
* Section reveal
* Card hover
* Navbar transitions
* Modal transitions
* Project filtering
* Number counters
* Timeline animation

Animations should be subtle and performant.

Respect:

```text
prefers-reduced-motion
```

---

# 28. Reusable Components

Build reusable components such as:

```text
Navbar
Footer
Button
SectionHeader
ProjectCard
SkillCard
ExperienceTimeline
ServiceCard
TestimonialCard
BlogCard
Modal
ContactForm
SocialLinks
ThemeToggle
LoadingSpinner
Skeleton
Pagination
SearchInput
FilterTabs
EmptyState
ErrorState
```

Avoid duplicated UI logic.

---

# 29. Seed Data

Create seed data so the application works immediately after installation.

Include sample:

* Profile
* Skills
* Experiences
* Services
* Projects
* Testimonials
* Blog posts
* Social links
* Site settings
* Admin account

The README must clearly explain how to change the default admin credentials.

---

# 30. Environment Variables

Create:

```env
NODE_ENV=development

PORT=5000

MONGODB_URI=

JWT_SECRET=
JWT_EXPIRES_IN=

CLIENT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_API_KEY=
EMAIL_FROM=
```

Create `.env.example`.

---

# 31. README

Create a professional README containing:

* Project overview
* Features
* Technology stack
* Screenshots
* Folder structure
* Installation
* Environment setup
* Database setup
* Seed command
* Development commands
* Production build
* Deployment instructions
* API documentation
* Security notes

---

# 32. Development Commands

Ensure the project supports:

```bash
npm install
npm run dev
npm run build
npm run start
npm run seed
npm run lint
```

Make frontend and backend development easy to run.

---

# 33. Coding Standards

Follow these rules:

* TypeScript everywhere possible
* Strong typing
* No unnecessary `any`
* Clean architecture
* Small reusable components
* Meaningful variable names
* Consistent naming conventions
* Avoid duplicated code
* Proper API error handling
* Validate all user input
* Comments only where they provide value
* Do not hardcode portfolio content in React components
* Portfolio content must come from the backend/database
* Keep frontend and backend responsibilities clearly separated

---

# 34. Important Functional Requirement

The public portfolio must be **content-driven**.

Do NOT hardcode:

```text
Projects
Skills
Experience
Services
Testimonials
Blog
Profile information
Social links
```

All of these should come from MongoDB through the API.

This allows the portfolio owner to manage the entire website from the admin dashboard without modifying source code.

---

# 35. Final Deliverables

Produce a complete working application with:

1. Public portfolio website
2. Responsive design
3. Dark/light/system theme
4. Admin authentication
5. Admin dashboard
6. Portfolio CMS
7. Project management
8. Blog management
9. Skills management
10. Experience management
11. Services management
12. Testimonials management
13. Contact management
14. Resume management
15. Analytics
16. SEO
17. Security
18. Responsive mobile UI
19. MongoDB integration
20. REST API
21. Seed data
22. Production-ready configuration
23. Complete README

---

# 36. Implementation Strategy

Build the application in phases:

### Phase 1

Setup:

* MERN project
* TypeScript
* Tailwind
* MongoDB
* Express
* Authentication
* Base layouts

### Phase 2

Public portfolio:

* Navbar
* Hero
* About
* Skills
* Experience
* Services
* Projects
* Testimonials
* Blog
* Contact
* Footer

### Phase 3

Backend:

* Models
* Controllers
* Services
* Routes
* Validation
* Authentication
* Error handling

### Phase 4

Admin:

* Dashboard
* CRUD management
* Image uploads
* Rich text editor
* Analytics

### Phase 5

Quality:

* Responsive testing
* API testing
* Authentication testing
* Form validation testing
* Error state testing
* Performance optimization
* SEO
* Accessibility

### Phase 6

Deployment:

* Production environment variables
* Frontend deployment
* Backend deployment
* MongoDB Atlas
* Cloud storage
* Domain configuration

---

# 37. Final Instruction to the Coding Agent

Do not build a generic template.

Think like a **senior product designer + senior full-stack engineer**.

Prioritize:

```text
Premium UI
Excellent UX
Clean architecture
Maintainability
Performance
Security
Accessibility
SEO
Responsive design
Scalability
```

Before implementing each module, ensure that it integrates correctly with the rest of the application.

Do not leave placeholder buttons, fake API calls, or non-functional forms.

All major functionality must be fully connected:

```text
React UI
   ↓
API
   ↓
Express
   ↓
MongoDB
```

The final result should be a portfolio that can realistically be deployed and used as a professional personal website.
