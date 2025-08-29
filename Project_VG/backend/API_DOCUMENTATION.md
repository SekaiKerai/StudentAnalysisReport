# LearnSmart Backend API Documentation

## API Structure

The API is organized into modular routes for better maintainability:

- **Authentication Routes**: `/api/auth/*`
- **Profile Routes**: `/api/profile/*`
- **Admin Routes**: `/api/admin/*`

## Authentication Endpoints

### Base URL
```
http://localhost:5000/api/auth
```

### 1. User Registration
**POST** `/register`

Register a new user (student, tutor, or admin).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "phone": "1234567890",
  "centerId": "center_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "phone": "1234567890"
    },
    "token": "jwt_token_here"
  }
}
```

### 2. User Login
**POST** `/login`

Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "phone": "1234567890",
      "centerId": "center_id"
    },
    "token": "jwt_token_here"
  }
}
```

### 3. User Logout
**POST** `/logout`

Logout user (client-side token removal).

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Profile Endpoints

### Base URL
```
http://localhost:5000/api/profile
```

**Note:** All profile endpoints require authentication.

### 1. Get Current User
**GET** `/me`

Get current user information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "phone": "1234567890",
      "centerId": "center_id",
      "isActive": true,
      "lastLogin": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 2. Get User Profile with Role Details
**GET** `/profile`

Get detailed user profile including role-specific information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "phone": "1234567890",
      "centerId": "center_id",
      "isActive": true,
      "lastLogin": "2024-01-01T00:00:00.000Z"
    },
    "student": {
      "userId": "user_id",
      "centerId": "center_id",
      "dateOfBirth": "2000-01-01T00:00:00.000Z",
      "gender": "Male",
      "address": "123 Main St",
      "guardianName": "Jane Doe",
      "admissionDate": "2024-01-01T00:00:00.000Z",
      "academicRecords": [],
      "feedbackHistory": [],
      "scholarships": []
    },
    "center": {
      "id": "center_id",
      "name": "Learning Center",
      "address": "456 Center St"
    }
  }
}
```

### 3. Update User Profile
**PATCH** `/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "0987654321"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Smith",
      "email": "john@example.com",
      "role": "student",
      "phone": "0987654321",
      "centerId": "center_id"
    }
  }
}
```

### 4. Change Password
**PATCH** `/change-password`

Change user password.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

## Admin Endpoints

### Base URL
```
http://localhost:5000/api/admin
```

**Note:** All admin endpoints require admin authentication.

### 1. Get All Users
**GET** `/users`

Get all users in the system.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "phone": "1234567890",
      "centerId": "center_id",
      "isActive": true
    }
  ]
}
```

### 2. Get Users by Role
**GET** `/users/role/:role`

Get users filtered by role.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "phone": "1234567890",
      "centerId": "center_id",
      "isActive": true
    }
  ]
}
```

### 3. Get User by ID
**GET** `/users/:id`

Get specific user by ID.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "phone": "1234567890",
    "centerId": "center_id",
    "isActive": true
  }
}
```

### 4. Update User
**PATCH** `/users/:id`

Update user information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "phone": "0987654321",
  "role": "tutor",
  "centerId": "new_center_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "user_id",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "role": "tutor",
    "phone": "0987654321",
    "centerId": "new_center_id"
  }
}
```

### 5. Toggle User Status
**PATCH** `/users/:id/toggle-status`

Activate or deactivate a user account.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "User deactivated successfully",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "isActive": false
  }
}
```

### 6. Delete User
**DELETE** `/users/:id`

Delete a user account.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message here",
  "statusCode": 400
}
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Role-Based Access

- **Student**: Can access their own profile and basic user functions
- **Tutor**: Can access student functions plus tutor-specific features
- **Admin**: Can access all functions including user management

## Input Validation

The API includes comprehensive input validation:

- **Email**: Must be a valid email format
- **Password**: Minimum 6 characters
- **Phone**: Must be 10 digits
- **Role**: Must be 'student', 'tutor', or 'admin'
- **Required Fields**: All required fields must be provided

## Environment Variables

Make sure to set these environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Project Structure

```
backend/
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── profileController.js   # Profile management logic
│   └── userController.js      # User management logic
├── middleware/
│   ├── authMiddleware.js      # JWT authentication
│   ├── roleMiddleware.js      # Role-based access control
│   └── validationMiddleware.js # Input validation
├── models/
│   ├── User.js               # User model
│   ├── Student.js            # Student model
│   └── Tutor.js              # Tutor model
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── profileRoutes.js      # Profile routes
│   └── userRoutes.js         # Admin user routes
└── app.js                    # Main application file
``` 