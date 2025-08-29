# Dashboard Integration Setup Guide

## 🎯 Overview

This guide explains how to set up and run the integrated dashboard system for LearnSmart. The system includes:

- **Main Application**: Project_VG/frontend (Port 5173)
- **Student Dashboard**: studentdash (Port 5174)
- **Teacher Dashboard**: teacherdash (Port 5175)
- **Backend API**: Project_VG/backend (Port 5000)

## 🚀 Quick Start

### 1. Start the Backend
```bash
cd Project_VG/backend
npm install
npm start
```
Backend will run on: `http://localhost:5000`

### 2. Start the Main Frontend
```bash
cd Project_VG/frontend
npm install
npm run dev
```
Main app will run on: `http://localhost:5173`

### 3. Start Student Dashboard
```bash
cd studentdash
npm install
npm run dev -- --port 5174
```
Student dashboard will run on: `http://localhost:5174`

### 4. Start Teacher Dashboard
```bash
cd teacherdash
npm install
npm run dev -- --port 5175
```
Teacher dashboard will run on: `http://localhost:5175`

## 🔐 Authentication Flow

### Login Process:
1. User visits main app: `http://localhost:5173`
2. User logs in with email/password
3. System checks user role:
   - **Student** → Redirects to `http://localhost:5174`
   - **Tutor** → Redirects to `http://localhost:5175`
   - **Admin** → Shows admin dashboard (coming soon)

### Role-Based Access:
- **Students** can only access student dashboard
- **Tutors** can only access teacher dashboard
- **Admins** can access admin dashboard

## 📁 Project Structure

```
Team-63/
├── Project_VG/
│   ├── frontend/          # Main application (Port 5173)
│   │   ├── src/
│   │   │   ├── App.jsx    # Main routing logic
│   │   │   ├── config/
│   │   │   │   └── dashboardConfig.js  # Dashboard URLs
│   │   │   └── Components/
│   │   │       └── Auth/
│   │   │           └── Auth.jsx         # Login/Register
│   │   └── package.json
│   └── backend/           # API server (Port 5000)
│       ├── routes/
│       ├── controllers/
│       └── app.js
├── studentdash/           # Student dashboard (Port 5174)
│   ├── src/
│   └── package.json
└── teacherdash/           # Teacher dashboard (Port 5175)
    ├── src/
    └── package.json
```

## 🔧 Configuration

### Dashboard URLs (config/dashboardConfig.js)
```javascript
export const DASHBOARD_CONFIG = {
  student: {
    url: 'http://localhost:5174',
    name: 'Student Dashboard'
  },
  tutor: {
    url: 'http://localhost:5175', 
    name: 'Teacher Dashboard'
  },
  admin: {
    url: 'http://localhost:5176',
    name: 'Admin Dashboard'
  }
};
```

### Environment Variables
Create `.env` files in each project:

**Backend (.env):**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000
```

## 🧪 Testing

### Test User Accounts

**Student Login:**
```json
{
  "email": "student@test.com",
  "password": "password123"
}
```

**Tutor Login:**
```json
{
  "email": "tutor@test.com", 
  "password": "password123"
}
```

**Admin Login:**
```json
{
  "email": "admin@test.com",
  "password": "password123"
}
```

### Test Flow:
1. Visit `http://localhost:5173`
2. Click "Sign In"
3. Enter credentials
4. Should redirect to appropriate dashboard

## 🛠️ Troubleshooting

### Common Issues:

**1. CORS Errors**
- Ensure backend CORS is configured for all frontend ports
- Check that all services are running on correct ports

**2. Authentication Issues**
- Verify JWT token is being stored in localStorage
- Check that user role is correctly set in database

**3. Redirect Not Working**
- Verify dashboard URLs in config file
- Ensure dashboard apps are running on correct ports

**4. Port Conflicts**
- Use different ports for each application
- Check if ports are already in use

### Debug Steps:
1. Check browser console for errors
2. Verify all services are running
3. Check network tab for API calls
4. Verify localStorage has token and user data

## 📝 Development Notes

### Adding New Dashboards:
1. Create new dashboard app
2. Add configuration to `dashboardConfig.js`
3. Update routing in `App.jsx`
4. Add role-based protection

### Modifying Redirect Logic:
- Edit `Auth.jsx` for login redirects
- Edit `App.jsx` for route protection
- Edit `dashboardConfig.js` for URLs

## 🔒 Security Considerations

- JWT tokens are stored in localStorage
- Role-based access control on frontend and backend
- Protected routes require authentication
- API endpoints validate user permissions

## 📞 Support

For issues or questions:
1. Check this setup guide
2. Review console errors
3. Verify all services are running
4. Check network connectivity between apps 