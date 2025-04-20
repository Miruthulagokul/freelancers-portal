// App.tsx
import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import Login from './Screens/Login'
import Signup from './Screens/Signup'
import Dashboard from './Screens/Dashboard' // Assuming you have a separate Dashboard screen
import ProtectedRoute from './components/ProtectedRoute'
import ResetPassword from './Screens/ResetPassword'

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        navigate('/Dashboard')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/ResetPassword" element={<ResetPassword />} />

    </Routes>
  )
}

export default App
