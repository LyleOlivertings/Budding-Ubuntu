import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const { MongoClient } = require('mongodb')
    const client = new MongoClient(process.env.MONGODB_URI)
    
    await client.connect()
    const db = client.db(process.env.MONGODB_DB)
    
    const members = await db.collection('members')
      .find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { memberId: { $regex: search, $options: 'i' } }
        ]
      })
      .limit(50)
      .toArray()

    return NextResponse.json(members)

  } catch (error) {
    console.error('Failed to fetch members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}