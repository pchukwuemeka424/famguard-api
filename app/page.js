import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

export default function Home() {
  return (
    <div className="instructions-container">
      <div className="instructions-card">
        <div className="logo-container">
          <Image
            src="/logo.png"
            alt="FamGuard Logo"
            width={120}
            height={120}
            priority
            style={{ objectFit: 'contain' }}
          />
          <h1 className="app-title">FamGuard</h1>
          <p className="app-subtitle">Family Account Management System</p>
        </div>

        <div className="instructions-section">
          <h2>Welcome to FamGuard</h2>
          <ul className="instructions-list">
            <li>
              <strong>Account Management</strong>
              <span>
                FamGuard helps you manage your family accounts securely. 
                You can delete accounts, check database connections, and manage your privacy settings.
              </span>
            </li>
            <li>
              <strong>Getting Started</strong>
              <span>
                Use the navigation buttons below to access different features of the application. 
                Each section provides specific functionality for managing your account.
              </span>
            </li>
            <li>
              <strong>Security & Privacy</strong>
              <span>
                Your data security is our priority. All operations are performed securely 
                and in compliance with privacy regulations.
              </span>
            </li>
            <li>
              <strong>Database Connection</strong>
              <span>
                If you experience any connection issues, use the database check tool 
                to verify your connection status and troubleshoot problems.
              </span>
            </li>
          </ul>
        </div>

        <div className="navigation-buttons">
          <Link href="/delete-account" className="btn btn-danger">
            Delete Account
          </Link>
          <Link href="/check-database" className="btn">
            Check Database
          </Link>
          <Link href="/privacy-policy" className="btn">
            Privacy Policy
          </Link>
          <Link href="/setup-policy" className="btn">
            Setup Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
