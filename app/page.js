import Image from 'next/image'
import Navigation from './components/Navigation'
import './globals.css'
import './landing.css'

export default function Home() {
  return (
    <div className="landing-container">
      <Navigation />
      <div className="landing-content">
        {/* Left Side - Logo, Write-up, and Download Buttons */}
        <div className="landing-left">
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
            <h1 className="app-title">FamGuard</h1>
          </div>
          
          <div className="app-writeup">
            <p className="app-description">
              FamGuard is a simple family safety app designed to help loved ones stay connected and protected. 
              It lets users share live location, send quick check ins, and instantly alert trusted family members 
              during emergencies even with poor or no internet connection.
            </p>
          </div>

          <div className="download-buttons">
            <a href="https://apps.apple.com/gb/app/famsguard/id6757821633" target="_blank" rel="noopener noreferrer" className="download-btn app-store">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.08-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor"/>
              </svg>
              <div className="btn-text">
                <span className="btn-text-small">Download on the</span>
                <span className="btn-text-large">App Store</span>
              </div>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.famguardacehubtech" target="_blank" rel="noopener noreferrer" className="download-btn google-play">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm-1.36-2.12l2.27 2.27L20.99 12l-2.28-2.28-2.27 2.28zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" fill="currentColor"/>
              </svg>
              <div className="btn-text">
                <span className="btn-text-small">GET IT ON</span>
                <span className="btn-text-large">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="landing-right">
          <Image
            src="/img.png"
            alt="FamGuard App"
            width={600}
            height={780}
            priority
            style={{ maxWidth: '100%', height: 'auto' }}
            className="app-image"
          />
        </div>
      </div>
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Acehub Technologies Ltd</p>
      </footer>
    </div>
  )
}
