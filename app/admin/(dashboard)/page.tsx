"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Check mount state and authentication
  useEffect(() => {
    setIsMounted(true);

    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("isAuthenticated")
    ) {
      router.push("/admin/login");
    }
  }, [router]);

  // Fetch members with error handling
  useEffect(() => {
    if (!isMounted) return;

    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/members?search=${encodeURIComponent(search)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMembers(data);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [search, isMounted]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Member Management</h1>
          <button
            onClick={() => {
              localStorage.removeItem("isAuthenticated");
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search members by name, phone, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading members...</div>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded-lg text-red-700">{error}</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Member ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Joined Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono">
                      {member.memberId}
                    </td>
                    <td className="px-6 py-4 text-sm">{member.name}</td>
                    <td className="px-6 py-4 text-sm">{member.phone}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(member.createdAt).toLocaleDateString("en-ZA", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link
              href="/admin/products/create"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Add New Product
            </Link>

            {members.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                No members found matching your search
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
