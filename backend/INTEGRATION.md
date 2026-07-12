# Frontend-Backend Integration Guide

## Step 1: Update Frontend Environment

Create `.env` file in frontend folder:

```env
VITE_API_URL=http://localhost:5000/api
```

For production (Render):
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## Step 2: Create API Service

Create `src/services/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  register: async (name, phone, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, password }),
    });
    return res.json();
  },

  login: async (phone, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });
    return res.json();
  },

  adminLogin: async (password) => {
    const res = await fetch(`${API_URL}/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    return res.json();
  },

  // Jobs endpoints
  getAllJobs: async (category, region) => {
    let url = `${API_URL}/jobs`;
    if (category) url += `?category=${category}`;
    if (region) url += `?region=${region}`;
    const res = await fetch(url);
    return res.json();
  },

  getJob: async (id) => {
    const res = await fetch(`${API_URL}/jobs/${id}`);
    return res.json();
  },

  createJob: async (jobData, token) => {
    const res = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(jobData),
    });
    return res.json();
  },

  getUserJobs: async (userId) => {
    const res = await fetch(`${API_URL}/jobs/user/${userId}`);
    return res.json();
  },

  // Applications endpoints
  applyForJob: async (application, token) => {
    const res = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(application),
    });
    return res.json();
  },

  getUserApplications: async (userId) => {
    const res = await fetch(`${API_URL}/applications/user/${userId}`);
    return res.json();
  },

  // Users endpoints
  getUserProfile: async (userId) => {
    const res = await fetch(`${API_URL}/users/${userId}`);
    return res.json();
  },

  // Payments endpoints
  processPayment: async (paymentData, token) => {
    const res = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return res.json();
  },

  // Admin endpoints
  getAdminStats: async (token) => {
    const res = await fetch(`${API_URL}/users/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  },
};

export default api;
```

---

## Step 3: Update UserContext

Modify `src/context/UserContext.jsx` to use backend API:

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api.js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      setCurrentUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Save to localStorage
  const saveToStorage = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  const register = async (name, phone, password) => {
    try {
      setLoading(true);
      const response = await api.register(name, phone, password);
      if (response.user) {
        setCurrentUser(response.user);
        setToken(response.token);
        saveToStorage(response.user, response.token);
        return response;
      }
      throw new Error(response.error || 'Registration failed');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (phone, password) => {
    try {
      setLoading(true);
      const response = await api.login(phone, password);
      if (response.user) {
        setCurrentUser(response.user);
        setToken(response.token);
        saveToStorage(response.user, response.token);
        return response;
      }
      throw new Error(response.error || 'Login failed');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (password) => {
    try {
      setLoading(true);
      const response = await api.adminLogin(password);
      if (response.user) {
        setCurrentUser({ ...response.user, role: 'admin' });
        setToken(response.token);
        saveToStorage({ ...response.user, role: 'admin' }, response.token);
        return response;
      }
      throw new Error(response.error || 'Admin login failed');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addPostedJob = async (jobData) => {
    try {
      setLoading(true);
      const response = await api.createJob(jobData, token);
      if (response.job) {
        setPostedJobs([...postedJobs, response.job]);
        return response;
      }
      throw new Error(response.error || 'Job posting failed');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadUserJobs = async (userId) => {
    try {
      const response = await api.getUserJobs(userId);
      if (response.jobs) {
        setPostedJobs(response.jobs);
      }
    } catch (error) {
      console.error('Error loading user jobs:', error);
    }
  };

  const loadUserApplications = async (userId) => {
    try {
      const response = await api.getUserApplications(userId);
      if (response.applications) {
        setAppliedJobs(response.applications);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
    }
  };

  const addAppliedJob = async (application) => {
    try {
      setLoading(true);
      const response = await api.applyForJob(application, token);
      if (response.application) {
        setAppliedJobs([...appliedJobs, response.application]);
        return response;
      }
      throw new Error(response.error || 'Application failed');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setPostedJobs([]);
    setAppliedJobs([]);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      token,
      postedJobs,
      appliedJobs,
      loading,
      register,
      login,
      adminLogin,
      addPostedJob,
      addAppliedJob,
      loadUserJobs,
      loadUserApplications,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
```

---

## Step 4: Update Post Modal

Update `src/components/PostModal.jsx` to send payment data:

```javascript
const verifyToken = async () => {
  if (!token.trim()) {
    setTokenErr("Tafadhali weka token yako.");
    return;
  }
  if (token.length < 4) {
    setTokenErr("Token si sahihi.");
    return;
  }
  
  // Process payment in backend
  try {
    const paymentRes = await api.processPayment(
      {
        amount: 200,
        paymentMethod: "Vodacom M-Pesa", // or CRDB
        token: token,
      },
      currentUser.token
    );
    
    if (paymentRes.payment) {
      setTokenErr("");
      setStep("form");
    } else {
      setTokenErr(paymentRes.error || "Payment verification failed");
    }
  } catch (error) {
    setTokenErr("Payment verification failed");
  }
};
```

---

## Step 5: Install Dependencies

```bash
npm install
```

---

## Step 6: Running Both Services

### Terminal 1 - Frontend
```bash
cd frontend
npm run dev
```

### Terminal 2 - Backend
```bash
cd backend
npm run dev
```

---

## Step 7: Testing

1. Register user: http://localhost:5173/register
2. Login: http://localhost:5173/login
3. Post job: http://localhost:5173/post-job
4. Check backend at: http://localhost:5000/health

---

## Database Backup

To backup PostgreSQL database:

```bash
pg_dump kazinzuri_db > backup.sql
```

To restore:

```bash
psql kazinzuri_db < backup.sql
```

---

## Troubleshooting

### CORS Issues
If you see CORS errors, ensure backend is running and has CORS enabled.

### Database Connection Failed
Check .env file has correct PostgreSQL credentials.

### Token Errors
Clear localStorage and login again.

### Backend Not Running
Make sure `npm run dev` is running in backend folder.

---

## Environment Variables Summary

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

**Backend (.env)**
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kazinzuri_db
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
JWT_SECRET=your_secret
ADMIN_PASSWORD=admin123
```

---

## Next Steps

1. ✅ Backend created and running
2. ✅ Frontend API service created
3. ✅ UserContext updated
4. ⏳ Deploy to Render.com (Backend)
5. ⏳ Deploy to Netlify (Frontend)
6. ⏳ Setup CI/CD pipeline
7. ⏳ Add monitoring and logging
