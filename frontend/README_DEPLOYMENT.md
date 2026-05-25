# KaziNzuri - Job Platform

Jukwaa la kupata kazi na kumwajiri wafanyakazi kwenye Dar es Salaam.

## Features

✨ **Kwa Waajiri:**
- Tangaza kazi bure
- Tafuta wagombea
- Kusimamia maombi

👥 **Kwa Wagombea:**
- Tafuta kazi
- Omba kazi kupitia jukwaa
- Simamia profile yako
- Tafuta kwa region, wilaya, na kategori

🔐 **Admin Dashboard:**
- Kusimamia watumiaji
- Kusimamia kazi
- Kusimamia maombi
- Kuona takwimu

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Technology Stack

- **Frontend Framework:** React 18
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Styling:** CSS3
- **Icons:** Tabler Icons
- **State Management:** React Context API
- **Storage:** LocalStorage

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
├── context/            # Context API
├── data/               # Data files
├── styles/             # CSS files
└── main.jsx            # Entry point

public/
├── _redirects          # Netlify SPA routing
└── (static assets)
```

## Credentials

### Admin Login
- **URL:** `/admin-login`
- **Password:** `admin123`

### Demo User Login
- **URL:** `/login`
- **Phone:** (any number)
- **Password:** (any password)

## Deployment

### Deploy to Netlify

#### Automatic (Recommended)
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site"
4. Select GitHub repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`

#### Manual
```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for detailed instructions.

## Features

### User Management
- User registration
- User login/logout
- Profile page
- Role-based access (user/admin)

### Job Posting
- Post new jobs
- View posted jobs
- Track job applications

### Job Search
- Search by keyword
- Filter by category
- Filter by region
- Filter by district/wilaya

### Admin Panel
- Dashboard with statistics
- User management
- Job management
- Application tracking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## API Endpoints

Currently using mock data. Ready to integrate with backend API by updating environment variables.

## Environment Variables

Create `.env.local` file:

```
VITE_API_URL=https://api.example.com
VITE_ADMIN_PASSWORD=admin123
```

## Project Checklist

- [x] Frontend structure
- [x] User authentication
- [x] Job posting
- [x] Job search & filters
- [x] Admin dashboard
- [x] Responsive design
- [x] Production build
- [x] Netlify deployment config

## Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication
- [ ] Email notifications
- [ ] Payment integration
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Machine learning recommendations

## Support

For issues or questions:
1. Check [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)
2. Review browser console
3. Check deployment logs

## License

Private project - KaziNzuri 2026

---

**Built with ❤️ for Dar es Salaam**
