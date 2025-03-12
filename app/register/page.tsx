'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^0[0-9]{9}$/, 'Invalid SA phone number')
})

export default function RegisterPage() {
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      if (response.ok) {
        setSuccess(result.memberId)
        setError(null)
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (err) {
      setError('Network error - please try again')
    }
  }

  return (
        <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
              Budding Ubuntu Registration
            </h1>
    
            {success ? (
              <div className="text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Welcome to the Community!
                </h2>
                <p className="text-gray-600">
                  Your unique member ID:
                </p>
                <div className="bg-emerald-100 p-4 rounded-lg font-mono text-lg text-emerald-700">
                  {success}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Present this ID when visiting the premises
                </p>
    
                <div className="text-center text-sm mt-4">
                <span className="text-gray-600">Check out our latest selection </span>
                <Link 
                  href="/products" 
                  className="text-emerald-600 hover:underline font-medium"
                >
                  Click here
                </Link>
              </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <div className="bg-red-100 p-3 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
    
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="082 123 4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
    
                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Register
                </button>
              </form>
            )}
          </div>
        </div>
      )
    }
