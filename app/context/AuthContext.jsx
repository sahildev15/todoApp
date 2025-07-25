'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  // Register new user
  const register = async (userData) => {
    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Check if email already exists
      const userExists = existingUsers.find(user => user.email === userData.email)
      if (userExists) {
        throw new Error('User with this email already exists')
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        todos: [] // Initialize empty todos array
      }

      // Save to users list
      existingUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(existingUsers))

      // Log in the new user
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))

      return { success: true, user: newUser }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      // Check for admin login
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@gmail.com',
          createdAt: new Date().toISOString(),
          todos: []
        }
        setUser(adminUser)
        localStorage.setItem('user', JSON.stringify(adminUser))
        return { success: true, user: adminUser }
      }

      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Find user by email
      const user = users.find(u => u.email === email)
      if (!user) {
        throw new Error('User not found')
      }

      // Check password (in real app, this would be hashed)
      if (user.password !== password) {
        throw new Error('Invalid password')
      }

      // Log in user
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))

      return { success: true, user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Logout user
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/login')
  }

  // Update user data (for todos, etc.)
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))

    // Also update in users list
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userIndex = users.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex] = updatedUser
      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  // Add todo to user
  const addTodo = (todo) => {
    const updatedTodos = [...(user.todos || []), todo]
    updateUser({ todos: updatedTodos })
  }

  // Update todo
  const updateTodo = (todoId, updates) => {
    const updatedTodos = (user.todos || []).map(todo =>
      todo.id === todoId ? { ...todo, ...updates } : todo
    )
    updateUser({ todos: updatedTodos })
  }

  // Delete todo
  const deleteTodo = (todoId) => {
    const updatedTodos = (user.todos || []).filter(todo => todo.id !== todoId)
    updateUser({ todos: updatedTodos })
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUser,
    addTodo,
    updateTodo,
    deleteTodo,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 