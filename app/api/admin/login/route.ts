import { NextResponse } from 'next/server'
import { compare } from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password required' },
        { status: 400 }
      )
    }

    const { MongoClient } = require('mongodb')
    const client = new MongoClient(process.env.MONGODB_URI)
    
    await client.connect()
    const db = client.db(process.env.MONGODB_DB)
    const admin = await db.collection('admins').findOne({ username })

    if (!admin) {
      return NextResponse.json(
        { error: 'Admin user not found' },
        { status: 401 }
      )
    }

    const passwordMatch = await compare(password, admin.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: admin._id,
        username: admin.username
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}