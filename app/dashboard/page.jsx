'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../context/NotificationContext'
import TodoList from '../components/forms/TodoList'
import TodoForm from '../components/forms/TodoForm'
import Header from '../components/layout/Header'
import NotificationDrawer from '../components/drawers/NotificationDrawer'
import ProfileDrawer from '../components/drawers/ProfileDrawer'
import { FaSearch, FaBell, FaPlus, FaCalendarAlt, FaCheckCircle, FaClock } from 'react-icons/fa'

export default function Dashboard() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddTodo, setShowAddTodo] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const { user, loading, logout, addTodo, updateTodo, deleteTodo, isAuthenticated } = useAuth()
  const { unreadCount, createTodoNotification, completeTodoNotification, deleteTodoNotification } = useNotifications()
  const router = useRouter()

  // Redirect if not authenticated or if admin
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    } else if (!loading && isAuthenticated && user?.email === 'admin@gmail.com') {
      router.push('/admin')
    }
  }, [loading, isAuthenticated, user, router])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading if not authenticated
  if (!isAuthenticated) {
    return null
  }

  const todos = user?.todos || []
  const upcomingTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  // Filter todos based on search term
  const filteredTodos = todos.filter(todo => 
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }
    addTodo(newTodo)
    setShowAddTodo(false)
    
    // Create notification for new todo
    createTodoNotification(text)
  }

  const handleToggleTodo = (id) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      const wasCompleted = todo.completed
      updateTodo(id, { completed: !todo.completed })
      
      // Create notification for completed todo
      if (!wasCompleted) {
        completeTodoNotification(todo.text)
      }
    }
  }

  const handleDeleteTodo = (id) => {
    const todo = todos.find(t => t.id === id)
    if (todo) {
      deleteTodo(id)
      
      // Create notification for deleted todo
      deleteTodoNotification(todo.text)
    }
  }

  const handleEditTodo = (id, newText) => {
    updateTodo(id, { text: newText })
  }

  const clearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed)
    completedTodos.forEach(todo => {
      deleteTodo(todo.id)
      deleteTodoNotification(todo.text)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Company Name */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-blue-600">Sahil</span> Software
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search todos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <button 
                onClick={() => setShowNotifications(true)}
                className="relative p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaBell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(true)}
                    className="group relative"
                  >
                    <img
                      className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold object-cover border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 cursor-pointer"
                      src={user?.profileImage || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=3b82f6&color=fff`}
                      alt="Profile"
                    />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 border-2 border-white rounded-full"></div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">Edit</span>
                    </div>
                  </button>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-gray-500 text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}! 👋
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your tasks today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaClock className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Upcoming</p>
                <p className="text-2xl font-semibold text-gray-900">{upcomingTodos.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{completedTodos.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaCalendarAlt className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-semibold text-gray-900">{todos.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Todo Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddTodo(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            Add New Todo
          </button>
        </div>

        {/* Add Todo Modal */}
        {showAddTodo && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Todo</h3>
                <TodoForm onAddTodo={handleAddTodo} />
                <div className="mt-4">
                  <button
                    onClick={() => setShowAddTodo(false)}
                    className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Todo Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Todos */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FaClock className="mr-2 text-blue-600" />
                Upcoming Tasks ({upcomingTodos.length})
              </h3>
            </div>
            <div className="p-6">
              {upcomingTodos.length > 0 ? (
                <TodoList
                  todos={upcomingTodos.filter(todo => 
                    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
                  )}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ) : (
                <div className="text-center py-8">
                  <FaClock className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming tasks</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding a new todo.</p>
                </div>
              )}
            </div>
          </div>

          {/* Completed Todos */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FaCheckCircle className="mr-2 text-green-600" />
                Completed Tasks ({completedTodos.length})
              </h3>
            </div>
            <div className="p-6">
              {completedTodos.length > 0 ? (
                <div>
                  <TodoList
                    todos={completedTodos.filter(todo => 
                      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
                    )}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                  />
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={clearCompleted}
                      className="w-full px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                    >
                      Clear All Completed
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No completed tasks</h3>
                  <p className="mt-1 text-sm text-gray-500">Complete some tasks to see them here.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* All Todos Section */}
        {searchTerm && (
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Search Results for "{searchTerm}" ({filteredTodos.length})
              </h3>
            </div>
            <div className="p-6">
              {filteredTodos.length > 0 ? (
                <TodoList
                  todos={filteredTodos}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ) : (
                <div className="text-center py-8">
                  <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No todos found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* Profile Drawer */}
      <ProfileDrawer 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
    </div>
  )
} 