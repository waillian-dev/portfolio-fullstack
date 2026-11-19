# MERN Stack Personal Portfolio & CMS

A modern, responsive, production-ready personal portfolio website and Content Management System (CMS) built with the **MERN stack**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Key Features

- **Content-Driven Architecture**: Public portfolio pulls all data (Bio, Skills, Experience, Services, Projects, Testimonials, Articles) directly from MongoDB through the REST API.
- **Admin CMS Dashboard**: Protected area (`/admin`) with JWT authentication for full CRUD operations over portfolio content.
- **Dark / Light / System Theme**: Dynamic Theme Engine with localStorage persistence.
- **Interactive Data Visualizations**: Dashboard analytics powered by Recharts.
- **SEO & Performance**: Open Graph metadata, semantic HTML5, and responsive mobile-first UI.
- **Database Seeder**: Out-of-the-box database initialization script with pre-populated projects, bio, skills, and admin account.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Glassmorphism UI tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State & Data Fetching**: TanStack Query (React Query) + Axios

### Backend
- **Runtime**: Node.js + Express.js + TypeScript
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + Bcrypt password hashing
- **Security**: Helmet headers + Express Rate Limiting + CORS

---

## 📂 Monorepo Structure

```text
portfolio/
├── package.json                   # Root monorepo workspace scripts
├── specification.md               # Technical specification document
├── README.md                      # Setup & usage manual
├── client/                        # React Frontend App
│   ├── src/
│   │   ├── components/            # UI components (Button, Modal, Card, Navbar)
│   │   ├── context/               # Auth & Theme context providers
│   │   ├── pages/                 # Public & Admin pages
│   │   ├── sections/              # Public Landing sections
│   │   ├── services/              # API Client (Axios)
│   │   └── types/                 # Shared TypeScript types
├── server/                        # Node.js + Express Backend App
│   ├── src/
│   │   ├── config/                # Environment & Database config
│   │   ├── controllers/           # REST API route handlers
│   │   ├── middleware/            # Auth, rate limiting & error handling
│   │   ├── models/                # Mongoose Document Schemas
│   │   ├── routes/                # Express API Endpoints
│   │   └── seed/                  # Database seeder scripts
```

---

## ⚡ Quick Start & Setup

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI.

### 2. Installation
Install dependencies for root, server, and client:
```bash
npm run install:all
```

### 3. Environment Configuration
Create `.env` files based on `.env.example`:

**Server (`server/.env`)**:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Client (`client/.env`)**:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 4. Seed Database
Initialize sample data and default admin credentials:
```bash
npm run seed
```

**Default Admin Credentials**:
- **Email**: `admin@example.com`
- **Password**: `AdminPass123!`

### 5. Run Development Servers
Start both backend API server (port 5000) and frontend Vite dev server (port 5173) concurrently:
```bash
npm run dev
```

---

## 🔐 Default Routes

- **Public Portfolio Landing**: `http://localhost:5173/`
- **Project Detail**: `http://localhost:5173/projects/:slug`
- **Blog Article**: `http://localhost:5173/blog/:slug`
- **Admin Login**: `http://localhost:5173/admin/login`
- **Admin Dashboard**: `http://localhost:5173/admin`
- **Backend API Health Check**: `http://localhost:5000/health`
