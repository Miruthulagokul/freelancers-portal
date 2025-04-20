// src/Screens/Dashboard.tsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { useNavigate } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error
      } = await supabase.auth.getUser()

      if (error) {
        console.error("Error fetching user:", error.message)
        return
      }

      setUserEmail(user?.email || null)
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      navigate('/login')
    } else {
      console.error("Logout error:", error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard!</h1>
      <p className="text-lg text-gray-700 mb-6">You are logged in as: <span className="font-semibold">{userEmail}</span></p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard
