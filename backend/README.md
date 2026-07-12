# KaziNzuri Backend

Node.js + Express + PostgreSQL backend for KaziNzuri Job Marketplace

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
- Copy `.env.example` to `.env`
- Update database credentials
- Generate a strong JWT_SECRET

### 3. Create PostgreSQL Database
```bash
createdb kazinzuri_db
```

### 4. Initialize Database Schema
```bash
npm run init-db
```

### 5. Run Development Server
```bash
npm run dev
```

Server will run at `http://localhost:5000`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- POST `/api/auth/admin-login` - Admin login

### Jobs
- GET `/api/jobs` - Get all jobs
- GET `/api/jobs/:id` - Get single job
- POST `/api/jobs` - Create job (Protected)
- GET `/api/jobs/user/:userId` - Get user's jobs

### Applications
- POST `/api/applications` - Apply for job (Protected)
- GET `/api/applications/user/:userId` - Get user's applications
- GET `/api/applications/job/:jobId` - Get job applications (Protected)

### Users
- GET `/api/users/:id` - Get user profile
- GET `/api/users` - Get all users (Admin only)

### Admin
- GET `/api/admin/stats` - Admin dashboard stats
- GET `/api/admin/applications` - All applications (Admin only)

## Database Schema

### users
- id (UUID)
- name (varchar)
- phone (varchar)
- password (varchar - hashed)
- role (user/admin)
- created_at
- updated_at

### jobs
- id (UUID)
- user_id (FK)
- title (varchar)
- category (varchar)
- region (varchar)
- district (varchar)
- location_name (varchar)
- salary (varchar)
- salary_period (varchar)
- job_type (varchar)
- description (text)
- phone (varchar)
- created_at

### applications
- id (UUID)
- job_id (FK)
- user_id (FK)
- applicant_name (varchar)
- applicant_phone (varchar)
- applicant_bio (text)
- created_at

### payments
- id (UUID)
- user_id (FK)
- amount (decimal)
- payment_method (varchar)
- status (pending/completed)
- reference (varchar)
- created_at
