'use client'

import { useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FaTimes, FaEdit, FaCamera, FaUser, FaCheckCircle, FaClock, FaCalendarAlt, FaSpinner, FaUpload } from 'react-icons/fa'

export default function ProfileDrawer({ isOpen, onClose }) {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  })
  const [profileImage, setProfileImage] = useState(user?.profileImage || null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const todos = user?.todos || []
  const completedTodos = todos.filter(todo => todo.completed)
  const pendingTodos = todos.filter(todo => !todo.completed)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      setIsUploading(true)
      
      try {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target.result)
          setIsUploading(false)
        }
        reader.onerror = () => {
          alert('Error reading image file')
          setIsUploading(false)
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Error processing image:', error)
        alert('Error processing image')
        setIsUploading(false)
      }
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedUser = {
        ...user,
        ...formData,
        profileImage: imagePreview || profileImage
      }
      
      await updateUser(updatedUser)
      setProfileImage(imagePreview || profileImage)
      setImagePreview(null)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || ''
    })
    setProfileImage(user?.profileImage || null)
    setImagePreview(null)
    setIsEditing(false)
  }

  const getProfileImage = () => {
    if (imagePreview) {
      return imagePreview
    }
    if (profileImage) {
      return profileImage
    }
    return `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=3b82f6&color=fff&size=128`
  }

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
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
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Profile Image Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block group">
                <div className="relative">
                  <img
                    src={getProfileImage()}
                    alt="Profile"
                    className={`h-24 w-24 rounded-full object-cover border-4 border-gray-200 transition-all duration-300 ${
                      isUploading ? 'opacity-50' : ''
                    }`}
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaSpinner className="h-6 w-6 text-blue-600 animate-spin" />
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={triggerImageUpload}
                      disabled={isUploading}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isUploading ? (
                        <FaSpinner className="h-4 w-4 animate-spin" />
                      ) : (
                        <FaCamera className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
                
                {/* Hover overlay for non-editing state */}
                {!isEditing && (
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <FaCamera className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <h3 className="text-xl font-semibold text-gray-900 mt-3">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-gray-500">{formData.email}</p>
              
              {/* Image upload hint */}
              {isEditing && (
                <p className="text-xs text-gray-400 mt-2">
                  Click the camera icon to upload a new image
                </p>
              )}
            </div>

            {/* Edit Button */}
            <div className="mb-6">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaEdit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <FaSpinner className="h-4 w-4 animate-spin" />
                    ) : (
                      <FaCheckCircle className="h-4 w-4" />
                    )}
                    <span>{isSaving ? 'Updating...' : 'Update Profile'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Profile Form */}
            {isEditing && (
              <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            )}

            {/* Todo Statistics */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Todo Statistics</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaClock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
                      <p className="text-2xl font-semibold text-gray-900">{pendingTodos.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaCheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Completed Tasks</p>
                      <p className="text-2xl font-semibold text-gray-900">{completedTodos.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaCalendarAlt className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                      <p className="text-2xl font-semibold text-gray-900">{todos.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {todos.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {Math.round((completedTodos.length / todos.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(completedTodos.length / todos.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Member since</span>
                  <span className="text-sm text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Account ID</span>
                  <span className="text-sm text-gray-900 font-mono">{user?.id?.slice(-8)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 