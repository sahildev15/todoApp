import { themeColors } from './colors'

// Theme utility functions for easy customization

/**
 * Get a color from the theme
 * @param {string} category - Color category (primary, secondary, success, etc.)
 * @param {string} shade - Color shade (50, 100, 200, ..., 900)
 * @returns {string} Color value
 */
export function getThemeColor(category, shade = '500') {
  return themeColors[category]?.[shade] || themeColors.neutral[500]
}

/**
 * Get all colors for a category
 * @param {string} category - Color category
 * @returns {object} All shades for the category
 */
export function getColorCategory(category) {
  return themeColors[category] || themeColors.neutral
}

/**
 * Update a specific color in the theme
 * @param {string} category - Color category
 * @param {string} shade - Color shade
 * @param {string} value - New color value (hex, rgb, etc.)
 */
export function updateThemeColor(category, shade, value) {
  if (themeColors[category]) {
    themeColors[category][shade] = value
    // Update CSS variable
    document.documentElement.style.setProperty(`--${category}-${shade}`, value)
  }
}

/**
 * Update entire color category
 * @param {string} category - Color category
 * @param {object} colors - New color values for the category
 */
export function updateColorCategory(category, colors) {
  if (themeColors[category]) {
    themeColors[category] = { ...themeColors[category], ...colors }
    // Update CSS variables
    Object.entries(colors).forEach(([shade, value]) => {
      document.documentElement.style.setProperty(`--${category}-${shade}`, value)
    })
  }
}

/**
 * Apply a complete theme
 * @param {object} newTheme - Complete theme object
 */
export function applyTheme(newTheme) {
  Object.entries(newTheme).forEach(([category, shades]) => {
    if (typeof shades === 'object') {
      Object.entries(shades).forEach(([shade, value]) => {
        document.documentElement.style.setProperty(`--${category}-${shade}`, value)
      })
    } else {
      document.documentElement.style.setProperty(`--${category}`, shades)
    }
  })
}

/**
 * Reset theme to default values
 */
export function resetTheme() {
  // Re-apply default theme colors
  Object.entries(themeColors).forEach(([category, shades]) => {
    if (typeof shades === 'object') {
      Object.entries(shades).forEach(([shade, value]) => {
        document.documentElement.style.setProperty(`--${category}-${shade}`, value)
      })
    } else {
      document.documentElement.style.setProperty(`--${category}`, shades)
    }
  })
}

/**
 * Get CSS variable value
 * @param {string} variable - CSS variable name
 * @returns {string} CSS variable value
 */
export function getCSSVariable(variable) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable)
}

/**
 * Set CSS variable value
 * @param {string} variable - CSS variable name
 * @param {string} value - CSS variable value
 */
export function setCSSVariable(variable, value) {
  document.documentElement.style.setProperty(variable, value)
}

// Predefined color schemes
export const colorSchemes = {
  blue: {
    primary: {
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    }
  },
  purple: {
    primary: {
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
    }
  },
  green: {
    primary: {
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    }
  },
  red: {
    primary: {
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    }
  },
  orange: {
    primary: {
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
    }
  },
  pink: {
    primary: {
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
    }
  }
}

/**
 * Apply a predefined color scheme
 * @param {string} schemeName - Name of the color scheme
 */
export function applyColorScheme(schemeName) {
  const scheme = colorSchemes[schemeName]
  if (scheme) {
    Object.entries(scheme).forEach(([category, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        document.documentElement.style.setProperty(`--${category}-${shade}`, value)
      })
    })
  }
} 