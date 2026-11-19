# Technical Specification & Architectural Blueprint
## MERN Stack Personal Portfolio & CMS

### 1. Executive Overview
This specification outlines the technical design, system architecture, database schema, API contracts, frontend component structure, and deployment guidelines for a production-ready **MERN Stack Personal Portfolio & Content Management System (CMS)**.

---

### 2. System Architecture

```text
  ┌─────────────────────────────────────────────────────────────┐
  │                        Client Side                          │
  │  React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui   │
  │       Framer Motion + TanStack Query + React Router v6      │
  └──────────────┬──────────────────────────────▲───────────────┘
                 │                              │
          HTTPS  │ REST API Calls               │ JSON Responses
          Requests (Axios)                      │ & HTTP Status
                 │                              │
  ┌──────────────▼──────────────────────────────┴───────────────┐
  │                        Server Side                          │
  │       Node.js + Express.js + TypeScript + JWT Auth        │
  │     Helmet + Rate Limiter + Zod / Express-Validator         │
  └──────────────┬──────────────────────────────▲───────────────┘
                 │                              │
  Mongoose ODM   │ CRUD / Queries               │ Document Stream
                 │                              │
  ┌──────────────▼──────────────────────────────┴───────────────┐
  │                      Database Layer                         │
  │                     MongoDB / Atlas                         │
  └─────────────────────────────────────────────────────────────┘
```

---

### 3. Directory Layout & Module Structure

```text
portfolio/
├── package.json                   # Root workspace scripts & concurrency management
├── README.md                      # Comprehensive setup & operational guide
├── specification.md               # System specification (this document)
├── .env.example                   # Shared root environment template
├── .gitignore
├── client/                        # React Frontend Application
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── .env.example
│   └── src/
│       ├── assets/                # Icons, logos, static images
│       ├── components/            # Atomic & Reusable UI components
│       │   ├── ui/                # Base UI elements (Button, Card, Input, Modal, Badge)
│       │   ├── common/            # Navbar, Footer, ThemeToggle, LoadingSpinner, Skeleton
│       │   └── admin/             # Admin layout components, Sidebar, Header, DataTable
│       ├── sections/              # Public Landing Sections
│       │   ├── Hero.tsx
│       │   ├── About.tsx
│       │   ├── Skills.tsx
│       │   ├── Experience.tsx
│       │   ├── Services.tsx
│       │   ├── Projects.tsx
│       │   ├── Testimonials.tsx
│       │   ├── Blog.tsx
│       │   └── Contact.tsx
│       ├── pages/                 # Route Pages
│       │   ├── Home.tsx           # Portfolio One-Page Landing
│       │   ├── ProjectDetail.tsx  # Dynamic route /projects/:slug
│       │   ├── BlogDetail.tsx     # Dynamic route /blog/:slug
│       │   ├── AdminLogin.tsx     # Admin authentication
│       │   └── admin/             # Protected Admin CMS views
│       │       ├── Dashboard.tsx
│       │       ├── ProfileManager.tsx
│       │       ├── SkillsManager.tsx
│       │       ├── ExperienceManager.tsx
│       │       ├── ServicesManager.tsx
│       │       ├── ProjectsManager.tsx
│       │       ├── BlogManager.tsx
│       │       ├── TestimonialsManager.tsx
│       │       ├── MessagesManager.tsx
│       │       └── SettingsManager.tsx
│       ├── layouts/               # RootLayout, AdminLayout, PublicLayout
│       ├── hooks/                 # Custom React hooks (useTheme, useAuth, useFetch)
│       ├── services/              # API Client modules (axios instances & endpoint calls)
│       ├── context/               # AuthContext, ThemeContext
│       ├── lib/                   # Utility helpers (cn class merger, date formatters)
│       └── types/                 # Shared TypeScript Interfaces & Data Types
│
└── server/                        # Node.js + Express Backend Service
    ├── package.json
    ├── tsconfig.json
    ├── nodemon.json
    ├── .env.example
    └── src/
        ├── index.ts               # Server entry point & listener
        ├── app.ts                 # Express setup, middleware & router attachments
        ├── config/                # Database connection, JWT & environment loader
        ├── controllers/           # Route handler logic (Auth, Profile, Projects, etc.)
        ├── models/                # Mongoose Schema definitions
        ├── routes/                # Express router endpoints definition
        ├── middleware/            # Auth verification, rate limiting, error handling
        ├── services/              # Business logic & Database interaction helpers
        ├── utils/                 # AppError class, API response wrapper, slugifier
        ├── seed/                  # Seed script & initial bootstrap data
        └── types/                 # Express Request extension & backend type specs
```

---

### 4. Database Schema Specifications (MongoDB / Mongoose)

#### 4.1 Admin Model (`Admin`)
- `_id`: ObjectId
- `username`: String (required, unique, trimmed)
- `email`: String (required, unique, lowercase, trimmed)
- `password`: String (required, hashed using bcrypt)
- `createdAt` / `updatedAt`: Timestamps

#### 4.2 Profile Model (`Profile`)
- `_id`: ObjectId
- `fullName`: String (required)
- `headline`: String (required)
- `bio`: String (required)
- `avatarUrl`: String
- `location`: String
- `email`: String
- `phone`: String
- `yearsOfExperience`: Number
- `availabilityStatus`: String (e.g. "Available for Freelance / Full-Time")
- `resumeUrl`: String
- `stats`: Object `{ yearsExperience: Number, completedProjects: Number, totalClients: Number, technologiesMastered: Number }`
- `createdAt` / `updatedAt`: Timestamps

#### 4.3 Skill Model (`Skill`)
- `_id`: ObjectId
- `name`: String (required)
- `icon`: String (icon name or URL)
- `category`: Enum `["Frontend", "Backend", "Database", "Mobile", "DevOps & Tools"]`
- `percentage`: Number (1-100)
- `years`: Number
- `displayOrder`: Number
- `createdAt` / `updatedAt`: Timestamps

#### 4.4 Experience Model (`Experience`)
- `_id`: ObjectId
- `jobTitle`: String (required)
- `company`: String (required)
- `location`: String
- `startDate`: Date (required)
- `endDate`: Date (optional, null if current)
- `isCurrent`: Boolean (default false)
- `employmentType`: String ("Full-Time", "Contract", "Freelance", etc.)
- `description`: String
- `responsibilities`: [String]
- `technologies`: [String]
- `displayOrder`: Number
- `createdAt` / `updatedAt`: Timestamps

#### 4.5 Service Model (`Service`)
- `_id`: ObjectId
- `title`: String (required)
- `icon`: String
- `shortDescription`: String (required)
- `features`: [String]
- `priceRange`: String (optional)
- `ctaText`: String (default "Get in Touch")
- `displayOrder`: Number
- `createdAt` / `updatedAt`: Timestamps

#### 4.6 Project Model (`Project`)
- `_id`: ObjectId
- `title`: String (required)
- `slug`: String (required, unique, indexed)
- `shortDescription`: String (required)
- `fullDescription`: String (required)
- `category`: Enum `["Web", "Mobile", "Backend", "Dashboard", "UI/UX", "Other"]`
- `thumbnailUrl`: String (required)
- `gallery`: [String]
- `technologies`: [String]
- `githubUrl`: String
- `liveUrl`: String
- `featured`: Boolean (default false)
- `completionDate`: Date
- `problemStatement`: String
- `solutionStatement`: String
- `keyFeatures`: [String]
- `viewsCount`: Number (default 0)
- `displayOrder`: Number
- `createdAt` / `updatedAt`: Timestamps

#### 4.7 Testimonial Model (`Testimonial`)
- `_id`: ObjectId
- `clientName`: String (required)
- `jobTitle`: String
- `company`: String
- `avatarUrl`: String
- `rating`: Number (1-5, default 5)
- `content`: String (required)
- `isApproved`: Boolean (default true)
- `createdAt` / `updatedAt`: Timestamps

#### 4.8 BlogPost Model (`BlogPost`)
- `_id`: ObjectId
- `title`: String (required)
- `slug`: String (required, unique, indexed)
- `summary`: String (required)
- `content`: String (required, Markdown/HTML)
- `coverImage`: String
- `category`: String
- `tags`: [String]
- `author`: String (default Profile Name)
- `isPublished`: Boolean (default true)
- `readingTimeMinutes`: Number
- `viewsCount`: Number (default 0)
- `publishedAt`: Date
- `createdAt` / `updatedAt`: Timestamps

#### 4.9 ContactMessage Model (`ContactMessage`)
- `_id`: ObjectId
- `name`: String (required)
- `email`: String (required)
- `subject`: String (required)
- `message`: String (required)
- `isRead`: Boolean (default false)
- `isReplied`: Boolean (default false)
- `createdAt` / `updatedAt`: Timestamps

#### 4.10 SiteSetting Model (`SiteSetting`)
- `_id`: ObjectId
- `siteTitle`: String
- `siteDescription`: String
- `logoUrl`: String
- `faviconUrl`: String
- `primaryColor`: String
- `socialLinks`: `{ github: String, linkedin: String, twitter: String, facebook: String, instagram: String }`
- `maintenanceMode`: Boolean (default false)
- `maintenanceMessage`: String
- `createdAt` / `updatedAt`: Timestamps

---

### 5. RESTful API Contracts & Endpoints

#### Standard Response Standard
```json
{
  "success": true,
  "message": "Human readable status message",
  "data": {},
  "meta": { "total": 0, "page": 1, "limit": 10 }
}
```

#### Standard Error Standard
```json
{
  "success": false,
  "message": "Error description message",
  "errors": [ { "field": "email", "message": "Invalid email address" } ]
}
```

#### API Matrix

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **AUTH** | | | |
| `POST` | `/api/v1/auth/login` | Public | Admin login, returns JWT token |
| `GET` | `/api/v1/auth/me` | Protected | Returns authenticated admin profile |
| `POST` | `/api/v1/auth/logout` | Protected | Clears authentication session |
| **PROFILE** | | | |
| `GET` | `/api/v1/profile` | Public | Retrieves public developer bio & stats |
| `PUT` | `/api/v1/profile` | Protected | Updates developer bio & stats |
| **SKILLS** | | | |
| `GET` | `/api/v1/skills` | Public | Fetch skills grouped or listed |
| `POST` | `/api/v1/skills` | Protected | Create new skill entry |
| `PUT` | `/api/v1/skills/:id` | Protected | Update existing skill entry |
| `DELETE` | `/api/v1/skills/:id` | Protected | Delete skill entry |
| **EXPERIENCE** | | | |
| `GET` | `/api/v1/experience` | Public | Fetch work experience timeline |
| `POST` | `/api/v1/experience` | Protected | Create new experience entry |
| `PUT` | `/api/v1/experience/:id` | Protected | Update experience entry |
| `DELETE` | `/api/v1/experience/:id` | Protected | Delete experience entry |
| **SERVICES** | | | |
| `GET` | `/api/v1/services` | Public | Fetch services offered |
| `POST` | `/api/v1/services` | Protected | Create new service item |
| `PUT` | `/api/v1/services/:id` | Protected | Update service item |
| `DELETE` | `/api/v1/services/:id` | Protected | Delete service item |
| **PROJECTS** | | | |
| `GET` | `/api/v1/projects` | Public | Fetch projects (supports filter, search) |
| `GET` | `/api/v1/projects/:slug` | Public | Fetch project details by slug |
| `POST` | `/api/v1/projects` | Protected | Create project item |
| `PUT` | `/api/v1/projects/:id` | Protected | Update project item |
| `DELETE` | `/api/v1/projects/:id` | Protected | Delete project item |
| **TESTIMONIALS** | | | |
| `GET` | `/api/v1/testimonials` | Public | Fetch approved testimonials |
| `POST` | `/api/v1/testimonials` | Protected | Create testimonial |
| `PUT` | `/api/v1/testimonials/:id` | Protected | Update testimonial |
| `DELETE` | `/api/v1/testimonials/:id` | Protected | Delete testimonial |
| **BLOG** | | | |
| `GET` | `/api/v1/blog` | Public | Fetch blog posts list |
| `GET` | `/api/v1/blog/:slug` | Public | Fetch post details by slug |
| `POST` | `/api/v1/blog` | Protected | Create blog post |
| `PUT` | `/api/v1/blog/:id` | Protected | Update blog post |
| `DELETE` | `/api/v1/blog/:id` | Protected | Delete blog post |
| **CONTACT** | | | |
| `POST` | `/api/v1/contact` | Public | Submit contact form message |
| `GET` | `/api/v1/contact` | Protected | List contact messages |
| `PATCH` | `/api/v1/contact/:id` | Protected | Update message status (isRead/isReplied) |
| `DELETE` | `/api/v1/contact/:id` | Protected | Delete contact message |
| **SETTINGS & STATS** | | | |
| `GET` | `/api/v1/settings` | Public | Get site configuration settings |
| `PUT` | `/api/v1/settings` | Protected | Update site configuration settings |
| `GET` | `/api/v1/analytics/summary` | Protected | Dashboard summary metrics |

---

### 6. Security & Performance Guardrails

1. **Authentication**: JWT tokens stored in localStorage/headers with expiration validation.
2. **Password Security**: Bcrypt salt rounds set to 10.
3. **HTTP Protection**: Express Helmet for secure headers, CORS configured with explicit allowed origins.
4. **Rate Limiting**: Express Rate Limit on API routes and strict rate limits on `/api/v1/auth/login` & `/api/v1/contact`.
5. **Sanitization & Validation**: Input payload validation via TypeScript interfaces & middleware sanitization.
6. **Error Handling**: Global error handling middleware returning sanitized user messages while masking stack trace details in production mode.

---

### 7. Seed & Initialization Strategy
A dedicated seed module (`npm run seed` in server) initializes:
- Default Admin Account (`admin@example.com` / `AdminPass123!`)
- Comprehensive seed data for Profile, Skills, Experience, Services, Projects, Testimonials, Blog Posts, and Site Settings.
