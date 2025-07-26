import { FILE_LIMITS, ERROR_MESSAGES } from './constants'

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString()
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return 'N/A'
  
  const now = new Date()
  const targetDate = new Date(date)
  const diffInSeconds = Math.floor((now - targetDate) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return formatDate(date)
}

/**
 * Generate avatar URL from name
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {number} size - Avatar size (default: 128)
 * @returns {string} Avatar URL
 */
export const generateAvatarUrl = (firstName, lastName, size = 128) => {
  const name = `${firstName || ''} ${lastName || ''}`.trim()
  if (!name) return `https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&size=${size}`
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff&size=${size}`
}

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @returns {Object} Validation result with success and error message
 */
export const validateFile = (file) => {
  if (!file) {
    return { success: false, error: 'No file selected' }
  }

  if (!FILE_LIMITS.ALLOWED_TYPES.includes(file.type)) {
    return { success: false, error: ERROR_MESSAGES.INVALID_FILE_TYPE }
  }

  if (file.size > FILE_LIMITS.MAX_SIZE) {
    return { success: false, error: ERROR_MESSAGES.FILE_TOO_LARGE }
  }

  return { success: true }
}

/**
 * Convert file to base64
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Calculate completion rate
 * @param {Array} todos - Array of todos
 * @returns {number} Completion rate percentage
 */
export const calculateCompletionRate = (todos) => {
  if (!todos || todos.length === 0) return 0
  const completed = todos.filter(todo => todo.completed).length
  return Math.round((completed / todos.length) * 100)
}

/**
 * Filter todos by status
 * @param {Array} todos - Array of todos
 * @param {string} status - Status to filter by ('all', 'pending', 'completed')
 * @returns {Array} Filtered todos
 */
export const filterTodosByStatus = (todos, status) => {
  if (!todos) return []
  
  switch (status) {
    case 'pending':
      return todos.filter(todo => !todo.completed)
    case 'completed':
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
}

/**
 * Search todos by text
 * @param {Array} todos - Array of todos
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered todos
 */
export const searchTodos = (todos, searchTerm) => {
  if (!todos || !searchTerm) return todos
  
  const term = searchTerm.toLowerCase()
  return todos.filter(todo => 
    todo.text.toLowerCase().includes(term)
  )
}

/**
 * Search users by name or email
 * @param {Array} users - Array of users
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered users
 */
export const searchUsers = (users, searchTerm) => {
  if (!users || !searchTerm) return users
  
  const term = searchTerm.toLowerCase()
  return users.filter(user => 
    user.firstName?.toLowerCase().includes(term) ||
    user.lastName?.toLowerCase().includes(term) ||
    user.email?.toLowerCase().includes(term)
  )
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
} 