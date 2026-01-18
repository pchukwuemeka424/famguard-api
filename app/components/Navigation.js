'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="landing-nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo" onClick={closeMenu}>
          <Image
            src="/logo.png"
            alt="FamGuard Logo"
            width={40}
            height={40}
            priority
            style={{ objectFit: 'contain' }}
          />
          <span className="nav-logo-text">FamGuard</span>
        </Link>
        
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link href="/about" className="nav-link" onClick={closeMenu}>About</Link>
          <Link href="/how-to-use" className="nav-link" onClick={closeMenu}>How to Use</Link>
          <Link href="/contact" className="nav-link" onClick={closeMenu}>Contact Us</Link>
        </div>
      </div>
    </nav>
  )
}
