'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const productSchema = z.object({
  name: z.string().min(2),
  category: z.enum(['Indica', 'Sativa', 'Hybrid', 'Edible', 'Accessory']),
  description: z.string().min(10),
  thcContent: z.number().min(0).max(100),
  cbdContent: z.number().min(0).max(100),
  pricePerGram: z.number().min(0),
  stock: z.number().min(0),
  effects: z.string().transform(val => val.split(',')),
})

export default function ProductCreate() {
  const router = useRouter()
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema)
  })
  


  const uploadImage = async (file: string | Blob | null) => {
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    }
    formData.append('upload_preset', 'your_cloudinary_preset')

    const response = await fetch('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', {
      method: 'POST',
      body: formData
    })
    return response.json()
  }

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      
      // Upload image first
      const imageData = await uploadImage(image)
      const productData = {
        ...data,
        imageUrl: imageData.secure_url,
        createdAt: new Date()
      }

      // Save product
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })

      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Creation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Product Image</label>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0])
              }
            }}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-emerald-100 file:text-emerald-800"
          />
        </div>

        <div>
          <label>Product Name</label>
          <input {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label>Category</label>
          <select {...register('category')}>
            {['Indica', 'Sativa', 'Hybrid', 'Edible', 'Accessory'].map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Description</label>
          <textarea {...register('description')} rows={4} />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>THC Content (%)</label>
            <input type="number" step="0.1" {...register('thcContent', { valueAsNumber: true })} />
          </div>
          <div>
            <label>CBD Content (%)</label>
            <input type="number" step="0.1" {...register('cbdContent', { valueAsNumber: true })} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Price per Gram (ZAR)</label>
            <input type="number" {...register('pricePerGram', { valueAsNumber: true })} />
          </div>
          <div>
            <label>Stock Quantity (grams)</label>
            <input type="number" {...register('stock', { valueAsNumber: true })} />
          </div>
        </div>

        <div>
          <label>Effects (comma separated)</label>
          <input {...register('effects')} placeholder="relaxation, pain relief, sleep" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {loading ? 'Creating...' : 'Add Product'}
        </button>
      </form>
    </div>
  )
}