import Image from 'next/image'
import Navigation from '../components/Navigation'
import '../globals.css'
import '../landing.css'

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with FamGuard support. Contact Acehub Technologies Ltd for questions, feedback, or technical support. Email, phone, and address information.',
  openGraph: {
    title: 'Contact FamGuard - Get Support',
    description: 'Contact FamGuard support team for questions, feedback, or technical assistance.',
  },
}

export default function Contact() {
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
            <h1 className="app-title">Contact Us</h1>
          </div>
        </div>
        
        <div className="page-body">
          <div className="content-section">
            <h2>Get in Touch</h2>
            <p>
              Have questions, feedback, or need support? We're here to help! Reach out to us through any of the following channels.
            </p>
          </div>

          <div className="content-section">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <div className="contact-item">
                <h3>Email</h3>
                <p>
                  <a href="mailto:info@acehubtechnologiesltd.co.uk" className="contact-link">
                    info@acehubtechnologiesltd.co.uk
                  </a>
                </p>
              </div>
              
              <div className="contact-item">
                <h3>Phone</h3>
                <p>
                  <a href="tel:+447463057427" className="contact-link">
                    +44 7463 057427
                  </a>
                </p>
              </div>
              
              <div className="contact-item">
                <h3>Address</h3>
                <p>
                  36 St. Chads Drive<br />
                  GRAVESEND<br />
                  DA12 4EL<br />
                  United Kingdom
                </p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>Support</h2>
            <p>
              For technical support or app-related questions, please email us at{' '}
              <a href="mailto:info@acehubtechnologiesltd.co.uk" className="contact-link">
                info@acehubtechnologiesltd.co.uk
              </a>
              {' '}and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="content-section">
            <h2>Business Hours</h2>
            <p>
              Our support team is available Monday through Friday, 9:00 AM - 5:00 PM GMT.
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
