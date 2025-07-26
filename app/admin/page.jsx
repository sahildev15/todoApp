'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import UserDrawer from '../components/drawers/UserDrawer'
import { FaUsers, FaSearch, FaUser, FaCheckCircle, FaClock, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa'

export default function AdminPage() {
  const { user, loading, logout, isAuthenticated } = useAuth()
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserDrawer, setShowUserDrawer] = useState(false)
  const router = useRouter()

  // Check if user is admin
  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.email !== 'admin@gmail.com')) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, user, router])

  // Load all users
  useEffect(() => {
    if (user?.email === 'admin@gmail.com') {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
      setUsers(allUsers)
    }
  }, [user])

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

  // Show loading if not authenticated or not admin
  if (!isAuthenticated || user?.email !== 'admin@gmail.com') {
    return null
  }

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUserClick = (user) => {
    setSelectedUser(user)
    setShowUserDrawer(true)
  }

  const getTotalStats = () => {
    const totalUsers = users.length
    const totalTodos = users.reduce((sum, user) => sum + (user.todos?.length || 0), 0)
    const completedTodos = users.reduce((sum, user) => 
      sum + (user.todos?.filter(todo => todo.completed)?.length || 0), 0
    )
    const pendingTodos = totalTodos - completedTodos

    return { totalUsers, totalTodos, completedTodos, pendingTodos }
  }

  const stats = getTotalStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Admin Title */}
            <div className="flex items-center">
              <FaUsers className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Admin Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-gray-500 text-sm font-medium flex items-center"
              >
                <FaSignOutAlt className="mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            User Management 👥
          </h2>
          <p className="text-gray-600">
            Manage and monitor all registered users and their activities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaUsers className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaCalendarAlt className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Todos</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalTodos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaClock className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Todos</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingTodos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FaCheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed Todos</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.completedTodos}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              All Users ({filteredUsers.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                const userTodos = user.todos || []
                const completedTodos = userTodos.filter(todo => todo.completed)
                const pendingTodos = userTodos.filter(todo => !todo.completed)
                const completionRate = userTodos.length > 0 
                  ? Math.round((completedTodos.length / userTodos.length) * 100) 
                  : 0

                return (
                  <div 
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            className="h-12 w-12 rounded-full object-cover border-2 border-gray-200"
                            src={user.profileImage || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=3b82f6&color=fff&size=48`}
                            alt={`${user.firstName} ${user.lastName}`}
                          />
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </h4>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">
                            Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        {/* Todo Stats */}
                        <div className="text-right">
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-blue-600">
                              <FaClock className="inline mr-1" />
                              {pendingTodos.length} pending
                            </span>
                            <span className="text-green-600">
                              <FaCheckCircle className="inline mr-1" />
                              {completedTodos.length} completed
                            </span>
                            <span className="text-gray-600">
                              <FaCalendarAlt className="inline mr-1" />
                              {userTodos.length} total
                            </span>
                          </div>
                          
                          {/* Progress Bar */}
                          {userTodos.length > 0 && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span>Completion Rate</span>
                                <span>{completionRate}%</span>
                              </div>
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${completionRate}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* View Details Arrow */}
                        <div className="text-gray-400">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="px-6 py-12 text-center">
                <FaUsers className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'Try adjusting your search terms.' : 'No users have registered yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Drawer */}
      <UserDrawer 
        isOpen={showUserDrawer}
        user={selectedUser}
        onClose={() => {
          setShowUserDrawer(false)
          setSelectedUser(null)
        }}
      />
    </div>
  )
} 