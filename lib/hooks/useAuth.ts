import { useState, useEffect } from 'react'
import api from '@/lib/api'
import { User } from '@/types'
import { useAuthStore } from '@/lib/store/authStore'

export function useAuth() {
  const { user, setUser } = useAuthStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    const res = await api.post('/auth/login', { email, password })
    const { token, data } = res.data
    localStorage.setItem('token', token)
    setUser(data)
    return data
  }

  const register = async (name: string, email: string, password: string): Promise<User> => {
    const res = await api.post('/auth/register', { name, email, password })
    const { token, data } = res.data
    localStorage.setItem('token', token)
    setUser(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return { user, loading, login, register, logout }
}
