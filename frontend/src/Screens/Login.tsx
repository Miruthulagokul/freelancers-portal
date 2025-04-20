// src/Screens/Login.tsx
import React, { useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { useNavigate, Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      setError('')
      navigate('/Dashboard')
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      setError(error.message)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password.')
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/ResetPassword', // Change as needed
    })

    if (error) {
      setError(error.message)
    } else {
      setError('Password reset email sent. Check your inbox.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-200 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back 👋</h2>

        {error && <p className="text-sm text-center text-red-600">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span></span>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-200"
        >
          Login
        </button>

        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-20 bg-gray-300"></span>
          <span className="text-gray-500 text-sm">or</span>
          <span className="h-px w-20 bg-gray-300"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition-all duration-200"
        >
          <FcGoogle size={22} className="mr-2" />
          Login with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/Signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
