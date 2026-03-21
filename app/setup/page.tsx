'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SetupPage() {
  const [status, setStatus] = useState<string>('checking')
  const [configured, setConfigured] = useState(false)

  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await fetch('/api/setup', { method: 'POST' })
        const data = await res.json()
        setConfigured(res.ok && data.status === 'CONFIGURED')
        setStatus(data.status || 'UNKNOWN')
      } catch (err) {
        setStatus('ERROR')
      }
    }

    checkSetup()
  }, [])

  if (configured) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Supabase Configured!
            </h1>
            <p className="text-gray-600 text-lg">
              Your Supabase connection is active. Now you need to set up the
              database tables.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="font-semibold text-blue-900 mb-4">Setup Instructions:</h2>
            <ol className="space-y-3">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-semibold mr-3 flex-shrink-0">
                  1
                </span>
                <span className="text-blue-900">
                  Go to{' '}
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Supabase Dashboard
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-semibold mr-3 flex-shrink-0">
                  2
                </span>
                <span className="text-blue-900">Select your project</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-semibold mr-3 flex-shrink-0">
                  3
                </span>
                <span className="text-blue-900">Click on "SQL Editor" in the sidebar</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-semibold mr-3 flex-shrink-0">
                  4
                </span>
                <span className="text-blue-900">
                  Click "New Query" and copy the SQL from{' '}
                  <code className="bg-gray-200 px-2 py-1 rounded text-sm">
                    /scripts/001-create-tables.sql
                  </code>
                </span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-semibold mr-3 flex-shrink-0">
                  5
                </span>
                <span className="text-blue-900">Paste and execute the SQL</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm font-semibold mr-3 flex-shrink-0">
                  6
                </span>
                <span className="text-blue-900">Wait for completion, then refresh this page</span>
              </li>
            </ol>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center">
          <div className="mb-4">
            {status === 'checking' && (
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full">
                <div className="animate-spin">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
            )}
            {status === 'ERROR' && (
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {status === 'checking' && 'Checking Setup...'}
            {status === 'ERROR' && 'Setup Error'}
            {status === 'NOT_CONFIGURED' && 'Configuration Required'}
          </h1>

          <p className="text-gray-600 text-lg">
            {status === 'checking' &&
              'Please wait while we check your Supabase configuration.'}
            {status === 'ERROR' &&
              'There was an error checking your setup. Please ensure Supabase environment variables are configured in your project settings.'}
            {status === 'NOT_CONFIGURED' &&
              'Your Supabase connection needs to be configured. Check your environment variables in project settings.'}
          </p>
        </div>
      </div>
    </div>
  )
}
