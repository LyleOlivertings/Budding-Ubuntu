'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole } from 'lucide-react'
import { setCookie } from 'cookies-next'
import Link from 'next/link'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()
      
      if (response.ok) {
        // Store basic session in localStorage
        localStorage.setItem('isAuthenticated', 'true')
        router.push('/admin') // Force redirect
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (err) {
      setError('Login failed')
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <LockKeyhole className="h-12 w-12 text-emerald-600 mx-auto" />
          <h1 className="text-2xl font-bold mt-2 text-black">Admin Login</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div>
            <label className="block text-black-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-black"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700"
          >
            Sign In
          </button>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Need an admin account? </span>
            <Link 
              href="/admin/register" 
              className="text-emerald-600 hover:underline font-medium"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

