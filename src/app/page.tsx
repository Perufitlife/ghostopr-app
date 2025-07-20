'use client'

import { useState } from 'react'
import { useAuth } from '../../lib/auth-context'
import Dashboard from '../../components/Dashboard'

export default function Home() {
  const { user, signIn, signUp, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-cyan-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  // If user is authenticated, show dashboard
  if (user) {
    return <Dashboard />
  }

  // If user is not authenticated, show login form
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password)

      if (error) {
        setMessage(error.message)
      } else {
        if (isSignUp) {
          setMessage('Please check your email for confirmation!')
        } else {
          setMessage('Signed in successfully!')
        }
      }
    } catch (err) {
      setMessage('An unexpected error occurred')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-cyan-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">✅ GhostOpr</h1>
          <p className="text-gray-600">✨ ULTRA-SAFE DEPLOY SYSTEM ✨</p>
          <p className="text-sm text-emerald-600 mt-2">🔒 With Automatic Rollback Protection</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="your@email.com"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="••••••••"
              disabled={isLoading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setMessage('')
              }}
              className="text-emerald-600 hover:text-emerald-700 text-sm"
              disabled={isLoading}
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-md ${
            message.includes('error') || message.includes('Invalid') 
              ? 'bg-red-50 border border-red-200' 
              : 'bg-emerald-50 border border-emerald-200'
          }`}>
            <p className={`text-sm ${
              message.includes('error') || message.includes('Invalid')
                ? 'text-red-800'
                : 'text-emerald-800'
            }`}>
              {message}
            </p>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          🎯 BULLETPROOF CI/CD • ZERO-DOWNTIME DEPLOYS 🎯
        </div>
      </div>
    </div>
  )
}
