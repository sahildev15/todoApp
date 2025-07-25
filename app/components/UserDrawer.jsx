'use client'

import { useState } from 'react'
import { FaTimes, FaUser, FaCheckCircle, FaClock, FaCalendarAlt, FaEnvelope, FaCalendar, FaIdCard } from 'react-icons/fa'

export default function UserDrawer({ isOpen, user, onClose }) {
  const [activeTab, setActiveTab] = useState('all') // 'all', 'pending', 'completed'

  if (!user) return null

  const todos = user.todos || []
  const completedTodos = todos.filter(todo => todo.completed)
  const pendingTodos = todos.filter(todo => !todo.completed)
  const completionRate = todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0

  const getFilteredTodos = () => {
    switch (activeTab) {
      case 'pending':
        return pendingTodos
      case 'completed':
        return completedTodos
      default:
        return todos
    }
  }

  const filteredTodos = getFilteredTodos()

  const getProfileImage = () => {
    if (user.profileImage) {
      return user.profileImage
    }
    return `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=3b82f6&color=fff&size=128`
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-all duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FaUser className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* User Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* User Profile Section */}
            <div className="text-center mb-6">
              <img
                src={getProfileImage()}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-24 w-24 rounded-full object-cover border-4 border-gray-200 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-500">{user.email}</p>
            </div>

            {/* User Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FaIdCard className="mr-2 text-blue-600" />
                Account Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FaEnvelope className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCalendar className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-sm font-medium text-gray-900">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaIdCard className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-sm font-medium text-gray-900 font-mono">{user.id?.slice(-8)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Todo Statistics */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Todo Statistics</h4>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <FaCalendarAlt className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-500">Total</p>
                  <p className="text-xl font-semibold text-gray-900">{todos.length}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <FaClock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-xl font-semibold text-gray-900">{pendingTodos.length}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <FaCheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-xl font-semibold text-gray-900">{completedTodos.length}</p>
                </div>
              </div>

              {/* Progress Bar */}
              {todos.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                    <span className="text-sm font-medium text-gray-900">{completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Todo Tabs */}
            <div className="mb-4">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'all'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All ({todos.length})
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'pending'
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Pending ({pendingTodos.length})
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'completed'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Completed ({completedTodos.length})
                </button>
              </div>
            </div>

            {/* Todo List */}
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h5 className="text-sm font-medium text-gray-900">
                  {activeTab === 'all' && 'All Todos'}
                  {activeTab === 'pending' && 'Pending Todos'}
                  {activeTab === 'completed' && 'Completed Todos'}
                  {' '}({filteredTodos.length})
                </h5>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {filteredTodos.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredTodos.map((todo) => (
                      <div key={todo.id} className="px-4 py-3">
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 mt-1 ${
                            todo.completed ? 'text-green-600' : 'text-gray-400'
                          }`}>
                            {todo.completed ? (
                              <FaCheckCircle className="h-4 w-4" />
                            ) : (
                              <FaClock className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${
                              todo.completed 
                                ? 'text-gray-500 line-through' 
                                : 'text-gray-900'
                            }`}>
                              {todo.text}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Created: {todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <div className={`mx-auto h-8 w-8 mb-2 ${
                      activeTab === 'completed' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {activeTab === 'completed' ? (
                        <FaCheckCircle className="h-8 w-8" />
                      ) : (
                        <FaClock className="h-8 w-8" />
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {activeTab === 'all' && 'No todos yet'}
                      {activeTab === 'pending' && 'No pending todos'}
                      {activeTab === 'completed' && 'No completed todos'}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {activeTab === 'all' && 'This user hasn\'t created any todos yet.'}
                      {activeTab === 'pending' && 'All todos are completed!'}
                      {activeTab === 'completed' && 'No todos have been completed yet.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 