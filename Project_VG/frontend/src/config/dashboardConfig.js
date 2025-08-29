// Dashboard Configuration
export const DASHBOARD_CONFIG = {
  // Student Dashboard
  student: {
    url: 'http://localhost:5174', // studentdash port
    name: 'Student Dashboard'
  },
  
  // Teacher Dashboard  
  tutor: {
    url: 'http://localhost:5175', // teacherdash port
    name: 'Teacher Dashboard'
  },
  
  // Admin Dashboard
  admin: {
    url: 'http://localhost:5176', // admindash port (if you create one)
    name: 'Admin Dashboard'
  }
};

// Get dashboard URL by role
export const getDashboardUrl = (role) => {
  return DASHBOARD_CONFIG[role]?.url || '/';
};

// Get dashboard name by role
export const getDashboardName = (role) => {
  return DASHBOARD_CONFIG[role]?.name || 'Dashboard';
}; 