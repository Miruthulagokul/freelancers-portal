// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../supabaseClient'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/Login')
      } else {
        setSession(session)
      }
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <div>Loading...</div>
  return <>{children}</>
}

export default ProtectedRoute
