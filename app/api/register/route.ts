import { NextResponse } from 'next/server'
import { getMembersCollection } from '@/lib/db'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json()
    const members = await getMembersCollection()

    // Check for existing phone number
    const existingMember = await members.findOne({ phone })
    if (existingMember) {
      return NextResponse.json(
        { error: 'Phone number already registered' },
        { status: 400 }
      )
    }

    // Create new member
    const memberId = new ObjectId().toHexString()
    const result = await members.insertOne({
      _id: new ObjectId(),
      name,
      phone,
      memberId,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    if (result.acknowledged) {
      return NextResponse.json({
        message: 'Registration successful',
        memberId
      })
    }

    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}