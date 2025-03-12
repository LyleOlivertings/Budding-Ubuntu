// Add POST handler

import { NextResponse } from 'next/server'
import { getProductsCollection } from '@/lib/db'

export async function GET() {
  try {
    const products = await getProductsCollection()
    const results = await products.find({}).sort({ category: 1 }).toArray()
    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
    try {
      const productData = await request.json()
      const products = await getProductsCollection()
      
      const result = await products.insertOne({
        ...productData,
        createdAt: new Date()
      })
  
      const newProduct = await products.findOne({ _id: result.insertedId })
      return NextResponse.json(newProduct, { status: 201 })
      
    } catch (error) {
      return NextResponse.json(
        { error: 'Product creation failed' },
        { status: 500 }
      )
    }
  }