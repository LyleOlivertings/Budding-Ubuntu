import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
const dbName = process.env.MONGODB_DB!

let cachedClient: MongoClient | null = null

export async function connectToDatabase() {
  if (cachedClient) return cachedClient
  
  const client = await MongoClient.connect(uri)
  cachedClient = client
  return client
}

export async function getMembersCollection() {
  const client = await connectToDatabase()
  return client.db(dbName).collection('members')
}