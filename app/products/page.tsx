'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { z } from 'zod';

export default function MemberDashboard() {
  type Product = {
    _id: string;
    name: string;
    category: 'Indica' | 'Sativa' | 'Hybrid' | 'Edible' | 'Accessory';
    description: string;
    thcContent: number;
    cbdContent: number;
    pricePerGram: number;
    stock: number;
    imageUrl: string;
    effects: string[];
  };

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-emerald-800 mb-8">Our Current Selection</h1>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-md animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 mb-4">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              
              <h2 className="text-xl font-semibold text-emerald-800 mb-2">
                {product.name}
              </h2>
              
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                  {product.category}
                </span>
                <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                  THC: {product.thcContent}%
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  CBD: {product.cbdContent}%
                </span>
              </div>

              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-emerald-800">
                    R{product.pricePerGram}/g
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.stock}g in stock
                  </p>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                  Pre-order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}