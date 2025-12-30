'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

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
    <div className="delete-account-container">
      <div className="delete-account-card">
        <div className="delete-account-header">
          <Image
            src="/logo.png"
            alt="FamGuard Logo"
            width={80}
            height={80}
            priority
            style={{ objectFit: 'contain' }}
          />
          <h1 className="delete-account-title">FamGuard</h1>
          <h2 className="delete-account-subtitle">Delete Account</h2>
        </div>

        <div className="delete-account-content">
          <p className="delete-account-description">
            Enter your email address to permanently delete your account. 
            This action cannot be undone.
          </p>

          {error && (
            <div className="alert alert-error">{error}</div>
          )}

          {success && (
            <div className="alert alert-success">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="delete-account-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="delete-account-input"
              />
            </div>

            <div className="delete-account-actions">
              <button 
                type="submit" 
                className="btn btn-danger delete-account-btn" 
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete Account'}
              </button>
              <Link href="/" className="btn btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

