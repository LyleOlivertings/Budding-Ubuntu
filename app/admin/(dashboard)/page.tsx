'use client'
import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/router'


export default function Dashboard() {
  
  const [members, setMembers] = useState<{ _id: string; name: string; phone: string; createdAt: string }[]>([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    // Fetch members directly
    fetch(`/api/members?search=${encodeURIComponent(search)}`)
      .then(res => res.json())
      .then(setMembers)
  }, [search])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-black-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className='text-black'>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Member Since</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.phone}</td>
                <td className="px-6 py-4">
                  {new Date(member.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}