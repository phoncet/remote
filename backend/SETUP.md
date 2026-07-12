# KaziNzuri Backend - Setup Guide

## Prerequisites

- Node.js 16+ installed
- PostgreSQL 12+ installed and running
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Create PostgreSQL Database

Open PostgreSQL terminal and create database:

```sql
CREATE DATABASE kazinzuri_db;
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kazinzuri_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
PORT=5000
NODE_ENV=development
JWT_SECRET=generate_a_strong_random_string_here
ADMIN_PASSWORD=admin123
```

Generate JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Initialize Database Tables

```bash
npm run init-db
```

This will create all necessary tables and indexes.

### 5. Start Development Server

```bash
npm run dev
```

Server will run at `http://localhost:5000`

## API Testing

Use Postman or similar tool to test endpoints:

### Register User
```
POST /api/auth/register
Body: {
  "name": "John Doe",
  "phone": "0712345678",
  "password": "password123"
}
```

### Login User
```
POST /api/auth/login
Body: {
  "phone": "0712345678",
  "password": "password123"
}
```

### Create Job (Requires Auth Token)
```
POST /api/jobs
Headers: {
  "Authorization": "Bearer YOUR_TOKEN"
}
Body: {
  "title": "House Cleaner",
  "category": "nyumbani",
  "region": "dar",
  "district": "kinondoni",
  "locationName": "Kariakoo",
  "salary": "50000",
  "salaryPeriod": "/siku",
  "jobType": "Muda kamili",
  "description": "Looking for someone to clean house",
  "phone": "0712345678"
}
```

## Deployment to Render.com

### 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Create Render Account

Visit https://render.com and sign up

### 3. Create PostgreSQL Database

- New → PostgreSQL
- Name: kazinzuri-db
- Region: Choose closest
- Create database

### 4. Deploy Backend

- New → Web Service
- Connect GitHub repository
- Name: kazinzuri-backend
- Environment: Node
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - DB_HOST: (from PostgreSQL instance)
  - DB_PORT: 5432
  - DB_NAME: kazinzuri_db
  - DB_USER: (from PostgreSQL)
  - DB_PASSWORD: (from PostgreSQL)
  - JWT_SECRET: (generate strong secret)
  - ADMIN_PASSWORD: admin123

### 5. Initialize Database on Render

After deployment, run init script in Render's Shell:

```bash
npm run init-db
```

## Production Considerations

- Set `NODE_ENV=production`
- Use strong JWT_SECRET
- Use strong ADMIN_PASSWORD
- Enable HTTPS
- Add rate limiting
- Add input validation
- Implement proper error logging
- Setup monitoring and alerts

## Common Issues

### Connection Refused
- Check PostgreSQL is running
- Verify DATABASE_URL is correct
- Check firewall settings

### Tables Already Exist
- Tables are created only if they don't exist
- Safe to run `npm run init-db` multiple times

### Authentication Issues
- Verify JWT_SECRET is set
- Check token expiration
- Ensure correct token format in Authorization header
