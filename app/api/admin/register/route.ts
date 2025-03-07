import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { username, password, secretKey } = await request.json()

    // Validate secret key
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Invalid secret key' },
        { status: 401 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    const { MongoClient } = require('mongodb')
    const client = new MongoClient(process.env.MONGODB_URI)
    
    await client.connect()
    const db = client.db(process.env.MONGODB_DB)

    // Check if username exists
    const existingAdmin = await db.collection('admins').findOne({ username })
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create admin
    const result = await db.collection('admins').insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date()
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}