import Image from 'next/image'
import Navigation from '../components/Navigation'
import '../globals.css'
import '../landing.css'

export default function About() {
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
            <h1 className="app-title">About FamGuard</h1>
          </div>
        </div>
        
        <div className="page-body">
          <div className="content-section">
            <h2>Our Mission</h2>
            <p>
              FamGuard is a simple family safety app designed to help loved ones stay connected and protected. 
              We believe that family safety should be accessible, reliable, and easy to use for everyone.
            </p>
          </div>

          <div className="content-section">
            <h2>What We Do</h2>
            <p>
              FamGuard lets users share live location, send quick check-ins, and instantly alert trusted family members 
              during emergencies - even with poor or no internet connection. Our app ensures that your family stays informed 
              and protected, no matter where they are.
            </p>
          </div>

          <div className="content-section">
            <h2>Key Features</h2>
            <ul className="feature-list">
              <li>Real-time location sharing with trusted family members</li>
              <li>Quick check-in notifications</li>
              <li>Emergency alerts that work offline</li>
              <li>Secure and private family network</li>
              <li>Works even with poor internet connectivity</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>About Acehub Technologies Ltd</h2>
            <p>
              FamGuard is developed by Acehub Technologies Ltd, a company dedicated to creating innovative solutions 
              that help families stay safe and connected. We are committed to providing reliable, user-friendly 
              technology that makes a real difference in people's lives.
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
