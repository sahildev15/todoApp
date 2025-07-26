import { useState, useEffect } from 'react'

/**
 * Custom hook for localStorage operations
 * @param {string} key - Storage key
 * @param {any} initialValue - Initial value if key doesn't exist
 * @returns {Array} [storedValue, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Remove value from localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}

/**
 * Custom hook for managing user data in localStorage
 * @returns {Array} [user, setUser, removeUser]
 */
export const useUserStorage = () => {
  return useLocalStorage('user', null)
}

/**
 * Custom hook for managing users list in localStorage
 * @returns {Array} [users, setUsers, removeUsers]
 */
export const useUsersStorage = () => {
  return useLocalStorage('users', [])
}

/**
 * Custom hook for managing theme in localStorage
 * @returns {Array} [theme, setTheme, removeTheme]
 */
export const useThemeStorage = () => {
  return useLocalStorage('theme', 'light')
} 