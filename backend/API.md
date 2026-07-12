# KaziNzuri API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require JWT token in Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Auth Endpoints

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "0712345678",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "phone": "0712345678",
    "role": "user"
  },
  "token": "JWT_TOKEN"
}
```

---

### Login User
```
POST /auth/login
```

**Request Body:**
```json
{
  "phone": "0712345678",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "phone": "0712345678",
    "role": "user"
  },
  "token": "JWT_TOKEN"
}
```

---

### Admin Login
```
POST /auth/admin-login
```

**Request Body:**
```json
{
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "message": "Admin login successful",
  "user": {
    "id": "admin",
    "name": "Admin",
    "phone": "admin",
    "role": "admin"
  },
  "token": "JWT_TOKEN"
}
```

---

## Job Endpoints

### Get All Jobs
```
GET /jobs
```

**Query Parameters:**
- `category` - Filter by category
- `region` - Filter by region
- `limit` - Results per page (default: 50)
- `offset` - Pagination offset (default: 0)

**Response (200):**
```json
{
  "message": "Jobs retrieved successfully",
  "jobs": [...],
  "count": 10
}
```

---

### Get Job By ID
```
GET /jobs/:id
```

**Response (200):**
```json
{
  "message": "Job retrieved successfully",
  "job": {
    "id": "uuid",
    "title": "House Cleaner",
    "category": "nyumbani",
    "salary": "50000",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### Create Job (Protected)
```
POST /jobs
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
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

**Response (201):**
```json
{
  "message": "Job created successfully",
  "job": {
    "id": "uuid",
    "user_id": "uuid",
    "title": "House Cleaner",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get User Jobs
```
GET /jobs/user/:userId
```

**Response (200):**
```json
{
  "message": "User jobs retrieved successfully",
  "jobs": [...],
  "count": 5
}
```

---

### Delete Job (Protected)
```
DELETE /jobs/:id
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "message": "Job deleted successfully"
}
```

---

## Application Endpoints

### Apply For Job (Protected)
```
POST /applications
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "jobId": "uuid",
  "applicantName": "Jane Doe",
  "applicantPhone": "0715678901",
  "applicantBio": "I have 5 years experience"
}
```

**Response (201):**
```json
{
  "message": "Application submitted successfully",
  "application": {
    "id": "uuid",
    "job_id": "uuid",
    "user_id": "uuid",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get User Applications (Protected)
```
GET /applications/user/:userId
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "message": "User applications retrieved successfully",
  "applications": [...],
  "count": 3
}
```

---

### Get Job Applications (Protected)
```
GET /applications/job/:jobId
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "message": "Job applications retrieved successfully",
  "applications": [...],
  "count": 5
}
```

---

### Get All Applications (Admin Only)
```
GET /applications
Authorization: Bearer ADMIN_TOKEN
```

**Response (200):**
```json
{
  "message": "All applications retrieved successfully",
  "applications": [...],
  "count": 50
}
```

---

## User Endpoints

### Get User Profile
```
GET /users/:id
```

**Response (200):**
```json
{
  "message": "User profile retrieved successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "phone": "0712345678",
    "role": "user",
    "created_at": "2024-01-10T15:20:00Z"
  }
}
```

---

### Get All Users (Admin Only)
```
GET /users
Authorization: Bearer ADMIN_TOKEN
```

**Response (200):**
```json
{
  "message": "All users retrieved successfully",
  "users": [...],
  "count": 100
}
```

---

## Admin Endpoints

### Get Admin Stats (Admin Only)
```
GET /users/admin/stats
Authorization: Bearer ADMIN_TOKEN
```

**Response (200):**
```json
{
  "message": "Admin stats retrieved successfully",
  "stats": {
    "totalUsers": 100,
    "totalJobs": 250,
    "totalApplications": 500,
    "activeListings": 180,
    "totalPayments": 50000
  }
}
```

---

## Payment Endpoints

### Process Payment (Protected)
```
POST /payments
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "amount": 200,
  "paymentMethod": "Vodacom M-Pesa",
  "token": "12345ABC"
}
```

**Response (201):**
```json
{
  "message": "Payment processed successfully",
  "payment": {
    "id": "uuid",
    "user_id": "uuid",
    "amount": 200,
    "status": "completed",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get User Payments (Protected)
```
GET /payments/user/:userId
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "message": "User payments retrieved successfully",
  "payments": [...],
  "count": 5
}
```

---

### Get All Payments (Admin Only)
```
GET /payments
Authorization: Bearer ADMIN_TOKEN
```

**Response (200):**
```json
{
  "message": "All payments retrieved successfully",
  "payments": [...],
  "count": 100
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Admin access required"
}
```

### 404 Not Found
```json
{
  "error": "Job not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Response Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

Not implemented yet. Consider adding for production.

---

## Pagination

Use `limit` and `offset` parameters:

```
GET /jobs?limit=20&offset=40
```

---

## Filtering

### By Category
```
GET /jobs?category=nyumbani
```

### By Region
```
GET /jobs?region=dar
```

---

## Database Schema

### users
- `id` - UUID primary key
- `name` - User's name
- `phone` - Unique phone number
- `password` - Hashed password
- `role` - user or admin
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### jobs
- `id` - UUID primary key
- `user_id` - Foreign key to users
- `title` - Job title
- `category` - Job category
- `region` - Region/State
- `district` - District/City
- `location_name` - Specific location
- `salary` - Salary amount
- `salary_period` - /siku, /mwezi, /kazi
- `job_type` - Full-time, part-time, etc.
- `description` - Job description
- `phone` - Contact phone
- `created_at` - Job posted timestamp

### applications
- `id` - UUID primary key
- `job_id` - Foreign key to jobs
- `user_id` - Foreign key to users
- `applicant_name` - Applicant's name
- `applicant_phone` - Applicant's phone
- `applicant_bio` - Short bio
- `created_at` - Application timestamp

### payments
- `id` - UUID primary key
- `user_id` - Foreign key to users
- `amount` - Payment amount
- `payment_method` - Vodacom, CRDB, etc.
- `status` - pending or completed
- `reference` - Payment reference/token
- `created_at` - Payment timestamp
