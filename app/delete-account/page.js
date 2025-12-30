'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DeleteAccountPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!email) {
      setError('Please enter an email address.')
      setLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'An error occurred')
      } else {
        setSuccess(data.success || 'Account successfully deleted.')
        setEmail('')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Delete Account</h1>
        <p>Enter your email address to delete your account.</p>

        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {success && (
          <div className="alert alert-success">{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

