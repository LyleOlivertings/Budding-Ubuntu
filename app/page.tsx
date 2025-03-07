import Link from 'next/link'
import { Fingerprint, ShieldCheck, Leaf } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-800">
                Budding Ubuntu
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Cannabis Community Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A private members' collective promoting responsible use and cultivation
            under South African law
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Member Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <Fingerprint className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Member Access</h2>
              <p className="text-gray-600 mb-6">
                Register as a new member or access your existing account
              </p>
              <Link
                href="/register"
                className="inline-block w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Member Registration
              </Link>
            </div>
          </div>

          {/* Admin Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <ShieldCheck className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Administration</h2>
              <p className="text-gray-600 mb-6">
                Secure access to member management and club operations
              </p>
              <Link
                href="/admin/login"
                className="inline-block w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-16 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Budding Ubuntu. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Operating in compliance with South African cannabis regulations
          </p>
        </footer>
      </main>
    </div>
  )
}