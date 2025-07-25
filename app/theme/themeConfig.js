// 🎨 THEME CONFIGURATION - CUSTOMIZE YOUR COLORS HERE!
// 
// To change colors, simply update the values below and restart your dev server.
// All colors are organized by category and shade for easy management.

export const themeConfig = {
  // 🌈 PRIMARY COLORS - Main brand colors (buttons, links, etc.)
  primary: {
    50: '#eff6ff',   // Very light blue
    100: '#dbeafe',  // Light blue
    200: '#bfdbfe',  // Lighter blue
    300: '#93c5fd',  // Light blue
    400: '#60a5fa',  // Medium blue
    500: '#3b82f6',  // Main blue (most used)
    600: '#2563eb',  // Darker blue
    700: '#1d4ed8',  // Dark blue
    800: '#1e40af',  // Very dark blue
    900: '#1e3a8a',  // Darkest blue
  },

  // 🎯 SECONDARY COLORS - Supporting colors (text, backgrounds)
  secondary: {
    50: '#f8fafc',   // Very light gray
    100: '#f1f5f9',  // Light gray
    200: '#e2e8f0',  // Lighter gray
    300: '#cbd5e1',  // Light gray
    400: '#94a3b8',  // Medium gray
    500: '#64748b',  // Main gray
    600: '#475569',  // Darker gray
    700: '#334155',  // Dark gray
    800: '#1e293b',  // Very dark gray
    900: '#0f172a',  // Darkest gray
  },

  // ✨ ACCENT COLORS - Highlight colors (special elements)
  accent: {
    50: '#fdf4ff',   // Very light purple
    100: '#fae8ff',  // Light purple
    200: '#f5d0fe',  // Lighter purple
    300: '#f0abfc',  // Light purple
    400: '#e879f9',  // Medium purple
    500: '#d946ef',  // Main purple
    600: '#c026d3',  // Darker purple
    700: '#a21caf',  // Dark purple
    800: '#86198f',  // Very dark purple
    900: '#701a75',  // Darkest purple
  },

  // ✅ SUCCESS COLORS - Success states (completed todos, etc.)
  success: {
    50: '#f0fdf4',   // Very light green
    100: '#dcfce7',  // Light green
    200: '#bbf7d0',  // Lighter green
    300: '#86efac',  // Light green
    400: '#4ade80',  // Medium green
    500: '#22c55e',  // Main green
    600: '#16a34a',  // Darker green
    700: '#15803d',  // Dark green
    800: '#166534',  // Very dark green
    900: '#14532d',  // Darkest green
  },

  // ⚠️ WARNING COLORS - Warning states
  warning: {
    50: '#fffbeb',   // Very light yellow
    100: '#fef3c7',  // Light yellow
    200: '#fde68a',  // Lighter yellow
    300: '#fcd34d',  // Light yellow
    400: '#fbbf24',  // Medium yellow
    500: '#f59e0b',  // Main yellow
    600: '#d97706',  // Darker yellow
    700: '#b45309',  // Dark yellow
    800: '#92400e',  // Very dark yellow
    900: '#78350f',  // Darkest yellow
  },

  // ❌ ERROR COLORS - Error states (delete buttons, etc.)
  error: {
    50: '#fef2f2',   // Very light red
    100: '#fee2e2',  // Light red
    200: '#fecaca',  // Lighter red
    300: '#fca5a5',  // Light red
    400: '#f87171',  // Medium red
    500: '#ef4444',  // Main red
    600: '#dc2626',  // Darker red
    700: '#b91c1c',  // Dark red
    800: '#991b1b',  // Very dark red
    900: '#7f1d1d',  // Darkest red
  },

  // 🎨 BACKGROUND COLORS - Page and component backgrounds
  background: {
    primary: '#ffffff',    // Main background (white)
    secondary: '#f8fafc',  // Secondary background (light gray)
    tertiary: '#f1f5f9',   // Tertiary background (lighter gray)
  },

  // 📝 TEXT COLORS - Text colors throughout the app
  text: {
    primary: '#171717',    // Main text (dark)
    secondary: '#525252',  // Secondary text (medium gray)
    tertiary: '#737373',   // Tertiary text (light gray)
    inverse: '#ffffff',    // Text on dark backgrounds (white)
  },

  // 🔲 BORDER COLORS - Border colors for inputs, cards, etc.
  border: {
    primary: '#e5e5e5',    // Main borders (light gray)
    secondary: '#f5f5f5',  // Secondary borders (very light gray)
    focus: '#3b82f6',      // Focus state borders (blue)
  },
}

// 🚀 QUICK COLOR SCHEMES - Predefined color combinations
export const colorSchemes = {
  // Blue theme (current)
  blue: {
    primary: {
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    }
  },
  
  // Purple theme
  purple: {
    primary: {
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
    }
  },
  
  // Green theme
  green: {
    primary: {
      500: '#10b981',
      600: '#059669',
      700: '#047857',
    }
  },
  
  // Red theme
  red: {
    primary: {
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    }
  },
  
  // Orange theme
  orange: {
    primary: {
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
    }
  },
  
  // Pink theme
  pink: {
    primary: {
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
    }
  }
}

// 📋 HOW TO CUSTOMIZE:
// 
// 1. Change individual colors:
//    - Find the color you want to change in the themeConfig object above
//    - Replace the hex value with your desired color
//    - Example: primary: { 500: '#your-color-here' }
//
// 2. Apply a predefined scheme:
//    - Use one of the colorSchemes (blue, purple, green, etc.)
//    - Copy the values to the main themeConfig
//
// 3. Create your own scheme:
//    - Add a new object to colorSchemes
//    - Follow the same structure as existing schemes
//
// 4. After making changes:
//    - Save the file
//    - Restart your development server (npm run dev)
//    - The new colors will be applied throughout the app 