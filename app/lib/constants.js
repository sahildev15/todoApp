// Application Constants
export const APP_NAME = 'Todo App'
export const APP_DESCRIPTION = 'Stay organized and boost your productivity'

// Admin Configuration
export const ADMIN_EMAIL = 'admin@gmail.com'
export const ADMIN_PASSWORD = 'admin123'

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'user',
  USERS: 'users',
  THEME: 'theme'
}

// File Upload Limits
export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
}

// UI Constants
export const UI = {
  ANIMATION_DURATION: 300,
  DRAWER_WIDTH: 384, // 96 * 4 (w-96)
  MAX_TODO_LENGTH: 500
}

// API Endpoints (for future use)
export const API_ENDPOINTS = {
  USERS: '/api/users',
  TODOS: '/api/todos',
  AUTH: '/api/auth'
}

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  EMAIL_REQUIRED: 'Email is required',
  NAME_REQUIRED: 'Name is required',
  FILE_TOO_LARGE: 'File size should be less than 5MB',
  INVALID_FILE_TYPE: 'Please select a valid image file',
  USER_NOT_FOUND: 'User not found',
  INVALID_PASSWORD: 'Invalid password',
  EMAIL_EXISTS: 'User with this email already exists'
}

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully',
  TODO_ADDED: 'Todo added successfully',
  TODO_UPDATED: 'Todo updated successfully',
  TODO_DELETED: 'Todo deleted successfully',
  USER_REGISTERED: 'User registered successfully',
  LOGIN_SUCCESS: 'Login successful'
} 