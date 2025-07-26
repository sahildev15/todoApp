/**
 * User object structure
 * @typedef {Object} User
 * @property {string} id - Unique user identifier
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {string} password - User's password (hashed in production)
 * @property {string} profileImage - Base64 encoded profile image
 * @property {string} createdAt - User creation timestamp
 * @property {Array<Todo>} todos - User's todos array
 */

/**
 * Todo object structure
 * @typedef {Object} Todo
 * @property {string|number} id - Unique todo identifier
 * @property {string} text - Todo text content
 * @property {boolean} completed - Todo completion status
 * @property {string} createdAt - Todo creation timestamp
 * @property {string} [updatedAt] - Todo last update timestamp
 */

/**
 * Form data structure for user registration/login
 * @typedef {Object} AuthFormData
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */

/**
 * Profile update form data
 * @typedef {Object} ProfileFormData
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {string} [profileImage] - Base64 encoded profile image
 */

/**
 * API response structure
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Request success status
 * @property {any} [data] - Response data
 * @property {string} [error] - Error message
 */

/**
 * File upload result
 * @typedef {Object} FileUploadResult
 * @property {boolean} success - Upload success status
 * @property {string} [data] - Base64 encoded file data
 * @property {string} [error] - Error message
 */

/**
 * Todo filter options
 * @typedef {Object} TodoFilter
 * @property {string} status - Filter by status ('all', 'pending', 'completed')
 * @property {string} search - Search term
 * @property {string} sortBy - Sort field ('createdAt', 'text', 'completed')
 * @property {string} sortOrder - Sort order ('asc', 'desc')
 */

/**
 * User statistics
 * @typedef {Object} UserStats
 * @property {number} totalTodos - Total number of todos
 * @property {number} completedTodos - Number of completed todos
 * @property {number} pendingTodos - Number of pending todos
 * @property {number} completionRate - Completion rate percentage
 */

/**
 * Global application statistics
 * @typedef {Object} AppStats
 * @property {number} totalUsers - Total number of users
 * @property {number} totalTodos - Total number of todos across all users
 * @property {number} completedTodos - Total completed todos
 * @property {number} pendingTodos - Total pending todos
 */

/**
 * Notification object
 * @typedef {Object} Notification
 * @property {string} id - Unique notification identifier
 * @property {string} type - Notification type ('success', 'error', 'info', 'warning')
 * @property {string} title - Notification title
 * @property {string} message - Notification message
 * @property {boolean} read - Read status
 * @property {string} createdAt - Creation timestamp
 */

/**
 * Drawer component props
 * @typedef {Object} DrawerProps
 * @property {boolean} isOpen - Drawer open state
 * @property {Function} onClose - Close drawer callback
 */

/**
 * User drawer props
 * @typedef {Object} UserDrawerProps
 * @property {boolean} isOpen - Drawer open state
 * @property {User} user - User object to display
 * @property {Function} onClose - Close drawer callback
 */

/**
 * Profile drawer props
 * @typedef {Object} ProfileDrawerProps
 * @property {boolean} isOpen - Drawer open state
 * @property {Function} onClose - Close drawer callback
 */

/**
 * Todo form props
 * @typedef {Object} TodoFormProps
 * @property {Function} onAddTodo - Add todo callback
 * @property {Function} [onCancel] - Cancel callback
 * @property {string} [initialValue] - Initial todo text
 */

/**
 * Todo list props
 * @typedef {Object} TodoListProps
 * @property {Array<Todo>} todos - Todos array
 * @property {Function} onToggle - Toggle todo callback
 * @property {Function} onDelete - Delete todo callback
 * @property {Function} onEdit - Edit todo callback
 */

/**
 * Todo item props
 * @typedef {Object} TodoItemProps
 * @property {Todo} todo - Todo object
 * @property {Function} onToggle - Toggle todo callback
 * @property {Function} onDelete - Delete todo callback
 * @property {Function} onEdit - Edit todo callback
 */

// Export types for use in components
export const TODO_STATUS = {
  ALL: 'all',
  PENDING: 'pending',
  COMPLETED: 'completed'
}

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
}

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc'
}

export const SORT_FIELDS = {
  CREATED_AT: 'createdAt',
  TEXT: 'text',
  COMPLETED: 'completed'
} 