import { useState, useEffect } from 'react'

/**
 * Custom hook for debouncing values
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} Debounced value
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Custom hook for debouncing search terms
 * @param {string} searchTerm - Search term to debounce
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {string} Debounced search term
 */
export const useSearchDebounce = (searchTerm, delay = 300) => {
  return useDebounce(searchTerm, delay)
} 