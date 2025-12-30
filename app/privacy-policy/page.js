export default function PrivacyPolicyPage() {
  return (
    <div className="container">
      <div className="card">
        <h1>Privacy Policy</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Last Updated: January 2025</p>
        
        <div style={{ lineHeight: '1.8' }}>
          <h2>Introduction</h2>
          <p>
            FamGuard (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services.
          </p>
          <p>
            By using FamGuard, you agree to the collection and use of information in accordance with this policy.
          </p>

          <h2>1. Information We Collect</h2>
          
          <h3>1.1 Information You Provide</h3>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, phone number, and password</li>
            <li><strong>Profile Information:</strong> Profile photo, emergency contacts, and emergency notes</li>
            <li><strong>Location Data:</strong> Real-time and historical location information when you enable location sharing</li>
            <li><strong>Incident Reports:</strong> Information about safety incidents you report, including location, description, and photos</li>
            <li><strong>Check-in Data:</strong> Scheduled check-in times and status</li>
            <li><strong>Connection Information:</strong> Information about your connections with other users</li>
            <li><strong>Settings Preferences:</strong> App settings, notification preferences, and privacy controls</li>
          </ul>

          <h3>1.2 Automatically Collected Information</h3>
          <p>We automatically collect certain information when you use our services:</p>
          <ul>
            <li><strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
            <li><strong>Usage Data:</strong> How you interact with the app, features used, and time spent</li>
            <li><strong>Location Data:</strong> GPS coordinates, location accuracy, and location update frequency</li>
            <li><strong>Log Data:</strong> IP address, access times, and error logs</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>

          <h3>2.1 Core Services</h3>
          <ul>
            <li><strong>Location Sharing:</strong> Share your location with your connected family members and trusted contacts</li>
            <li><strong>Safety Features:</strong> Provide incident alerts, travel advisories, and emergency notifications</li>
            <li><strong>Check-in System:</strong> Enable scheduled check-ins and missed check-in alerts</li>
            <li><strong>Connection Management:</strong> Facilitate connections between users and manage your safety network</li>
          </ul>

          <h3>2.2 Service Improvement</h3>
          <ul>
            <li>Analyze usage patterns to improve app functionality</li>
            <li>Develop new features and services</li>
            <li>Troubleshoot technical issues</li>
            <li>Ensure app security and prevent fraud</li>
          </ul>

          <h3>2.3 Communication</h3>
          <ul>
            <li>Send push notifications about incidents, check-ins, and safety alerts</li>
            <li>Respond to your support requests</li>
            <li>Send important service updates and announcements</li>
          </ul>

          <h3>2.4 Legal Compliance</h3>
          <ul>
            <li>Comply with legal obligations</li>
            <li>Enforce our Terms of Service</li>
            <li>Protect our rights and the rights of our users</li>
          </ul>

          <h2>3. Information Sharing and Disclosure</h2>

          <h3>3.1 With Your Connections</h3>
          <p>
            Your location and safety information is shared only with users you have explicitly connected with through the app. You control who can see your information through connection management features.
          </p>

          <h3>3.2 Legal Requirements</h3>
          <p>We may disclose your information if required by law or in response to:</p>
          <ul>
            <li>Court orders or legal processes</li>
            <li>Government requests</li>
            <li>Enforcement of our Terms of Service</li>
            <li>Protection of rights, property, or safety</li>
          </ul>

          <h3>3.3 We Do Not Sell Your Data</h3>
          <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>

          <h2>4. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your information:</p>
          <ul>
            <li><strong>Encryption:</strong> Data is encrypted in transit and at rest</li>
            <li><strong>Authentication:</strong> Secure authentication through Supabase</li>
            <li><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</li>
            <li><strong>Regular Security Audits:</strong> Ongoing security assessments and updates</li>
            <li><strong>Secure Storage:</strong> Industry-standard secure storage practices</li>
          </ul>
          <p>
            However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
          </p>

          <h2>5. Your Rights and Choices</h2>
          <p>You have the following rights regarding your personal information:</p>

          <h3>5.1 Access and Update</h3>
          <ul>
            <li>Access your personal information through the app settings</li>
            <li>Update your profile information at any time</li>
            <li>Review your connection list and location sharing settings</li>
          </ul>

          <h3>5.2 Location Sharing Controls</h3>
          <ul>
            <li>Enable or disable location sharing at any time</li>
            <li>Control location accuracy and update frequency</li>
            <li>Choose which connections can see your location</li>
            <li>Set location sharing schedules (e.g., sleep mode)</li>
          </ul>

          <h3>5.3 Notification Preferences</h3>
          <ul>
            <li>Customize which notifications you receive</li>
            <li>Disable push notifications in device settings</li>
            <li>Configure notification filters and quiet hours</li>
          </ul>

          <h3>5.4 Data Deletion</h3>
          <ul>
            <li>Delete your account and all associated data through the app settings</li>
            <li>Request data deletion by contacting us at privacy@famguard.app</li>
            <li>Location data is automatically deleted after a specified retention period</li>
          </ul>

          <h3>5.5 Account Deletion</h3>
          <p>You can delete your account at any time. Upon account deletion:</p>
          <ul>
            <li>Your profile information will be removed</li>
            <li>Your location history will be deleted</li>
            <li>Your connections will be removed</li>
            <li>Incident reports you created may be anonymized (location and type retained for community safety)</li>
          </ul>
          <p>Account deletion is permanent and cannot be undone.</p>

          <h2>6. Data Retention</h2>
          <p>We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:</p>
          <ul>
            <li><strong>Active Accounts:</strong> Data is retained while your account is active</li>
            <li><strong>Location History:</strong> Retained for up to 30 days (configurable)</li>
            <li><strong>Incident Reports:</strong> Retained for the duration specified in the incident (typically 24-72 hours)</li>
            <li><strong>Account Data:</strong> Retained until account deletion</li>
            <li><strong>Legal Requirements:</strong> Some data may be retained longer to comply with legal obligations</li>
          </ul>

          <h2>7. Children&apos;s Privacy</h2>
          <p>
            FamGuard is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately, and we will delete that information.
          </p>

          <h2>8. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
          <ul>
            <li>Posting the new Privacy Policy in the app</li>
            <li>Updating the &quot;Last Updated&quot; date</li>
            <li>Sending you a notification (for material changes)</li>
          </ul>
          <p>Your continued use of the service after changes become effective constitutes acceptance of the updated Privacy Policy.</p>

          <h2>9. California Privacy Rights</h2>
          <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to know if personal information is sold or disclosed</li>
            <li>Right to opt-out of the sale of personal information (we do not sell your data)</li>
            <li>Right to access your personal information</li>
            <li>Right to request deletion of your personal information</li>
            <li>Right to non-discrimination for exercising your privacy rights</li>
          </ul>

          <h2>10. European Privacy Rights (GDPR)</h2>
          <p>If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR):</p>
          <ul>
            <li>Right of access to your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent</li>
          </ul>

          <h2>11. Contact Us</h2>
          <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
          <ul>
            <li><strong>Email:</strong> privacy@famguard.app</li>
            <li><strong>Support:</strong> support@famguard.app</li>
            <li><strong>Legal:</strong> legal@famguard.app</li>
          </ul>
          <p>
            <strong>Mailing Address:</strong> AceHub Technologies Ltd (UK) [Your Address] United Kingdom
          </p>

          <h2>12. Data Protection Officer</h2>
          <p>For privacy-related inquiries, you can contact our Data Protection Officer at:</p>
          <p><strong>Email:</strong> dpo@famguard.app</p>

          <h2>13. Complaints</h2>
          <p>If you believe we have not addressed your privacy concerns, you have the right to file a complaint with your local data protection authority.</p>

          <p style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
            By using FamGuard, you acknowledge that you have read and understood this Privacy Policy and agree to the collection and use of your information as described herein.
          </p>
        </div>
      </div>
    </div>
  )
}
