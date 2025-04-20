// src/Screens/Signup.tsx
import React, { useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { useNavigate, Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'

const Signup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Signup successful! Please check your email to confirm your account.')
      setTimeout(() => navigate('/Dashboard'), 3000)
    }
  }

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-200 p-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Account 🚀</h2>

        {error && <p className="text-sm text-center text-red-600">{error}</p>}
        {success && <p className="text-sm text-center text-green-600">{success}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition-all duration-200"
        >
          Sign Up
        </button>

        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-20 bg-gray-300"></span>
          <span className="text-gray-500 text-sm">or</span>
          <span className="h-px w-20 bg-gray-300"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center border py-2 rounded hover:bg-gray-100 transition-all duration-200"
        >
          <FcGoogle size={22} className="mr-2" />
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/Login" className="text-pink-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
