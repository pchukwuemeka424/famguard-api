import Image from 'next/image'
import Navigation from '../components/Navigation'
import '../globals.css'
import '../landing.css'

export const metadata = {
  title: 'How to Use',
  description: 'Learn how to use FamGuard - get started with location sharing, check-ins, and emergency alerts. Step-by-step guide for family safety app.',
  openGraph: {
    title: 'How to Use FamGuard - Step-by-Step Guide',
    description: 'Learn how to use FamGuard for location sharing, check-ins, and emergency alerts.',
  },
}

export default function HowToUse() {
  return (
    <div className="landing-container">
      <Navigation />
      <div className="page-content">
        <div className="page-header">
          <div className="app-header">
            <div className="app-logo">
              <Image
                src="/logo.png"
                alt="FamGuard Logo"
                width={120}
                height={120}
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h1 className="app-title">How to Use FamGuard</h1>
          </div>
        </div>
        
        <div className="page-body">
          <div className="content-section">
            <h2>Getting Started</h2>
            <ol className="instruction-list">
              <li>
                <strong>Download the App</strong>
                <p>Download FamGuard from the App Store or Google Play Store on your mobile device.</p>
              </li>
              <li>
                <strong>Create Your Account</strong>
                <p>Sign up with your email address and create a secure password to get started.</p>
              </li>
              <li>
                <strong>Add Family Members</strong>
                <p>Invite your trusted family members to join your FamGuard network by sending them an invitation.</p>
              </li>
            </ol>
          </div>

          <div className="content-section">
            <h2>Sharing Your Location</h2>
            <ol className="instruction-list">
              <li>
                <strong>Enable Location Sharing</strong>
                <p>Grant FamGuard permission to access your location when prompted.</p>
              </li>
              <li>
                <strong>Select Family Members</strong>
                <p>Choose which family members can see your live location and for how long.</p>
              </li>
              <li>
                <strong>Start Sharing</strong>
                <p>Your location will be automatically shared with selected family members in real-time.</p>
              </li>
            </ol>
          </div>

          <div className="content-section">
            <h2>Sending Check-Ins</h2>
            <ol className="instruction-list">
              <li>
                <strong>Quick Check-In</strong>
                <p>Tap the check-in button to send a quick notification to your family that you're safe.</p>
              </li>
              <li>
                <strong>Custom Messages</strong>
                <p>Add a custom message to your check-in to provide more context if needed.</p>
              </li>
            </ol>
          </div>

          <div className="content-section">
            <h2>Emergency Alerts</h2>
            <ol className="instruction-list">
              <li>
                <strong>Trigger Emergency Alert</strong>
                <p>In case of an emergency, use the emergency alert feature to instantly notify all trusted family members.</p>
              </li>
              <li>
                <strong>Offline Functionality</strong>
                <p>FamGuard's emergency alerts work even with poor or no internet connection, ensuring your family is always notified.</p>
              </li>
            </ol>
          </div>

          <div className="content-section">
            <h2>Privacy & Security</h2>
            <p>
              FamGuard takes your privacy seriously. You have full control over who can see your location and when. 
              All data is encrypted and securely stored. You can revoke access at any time.
            </p>
          </div>
        </div>
      </div>
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Acehub Technologies Ltd</p>
      </footer>
    </div>
  )
}
