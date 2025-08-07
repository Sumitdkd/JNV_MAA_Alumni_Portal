import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4 bg-surface rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-on-surface">Privacy Policy</h1>
            <div className="space-y-6 text-muted prose lg:prose-lg">
                <p><strong>Effective Date:</strong> August 01, 2025</p>

                <p>
                    At <strong>JNV MAA (Jawahar Navodaya Vidyalaya Mandaphia Alumni Association)</strong>, we are committed to protecting your privacy and handling your personal information with transparency and care. This Privacy Policy describes the types of data we collect, how we use it, and the measures we take to safeguard it.
                </p>

                <h2 className="text-2xl font-bold text-on-surface">1. Information We Collect</h2>
                <p>We collect information to provide, maintain, and improve our services. This includes:</p>
                <ul>
                    <li><strong>Identity Data:</strong> Full name, email address, date of birth</li>
                    <li><strong>Educational Data:</strong> Batch year, admission number</li>
                    <li><strong>Contact Data:</strong> Phone number (optional)</li>
                    <li><strong>Professional Data:</strong> Current organization or institution, location, LinkedIn profile (optional)</li>
                    <li><strong>User-Generated Content:</strong> Profile details, posts, comments, and group chat messages</li>
                </ul>

                <h2 className="text-2xl font-bold text-on-surface">2. How We Use Your Information</h2>
                <p>Your information is used strictly for purposes that enhance your experience and support the alumni network. These include:</p>
                <ul>
                    <li><strong>Authentication and Access:</strong> To verify your identity and grant secure access to your account</li>
                    <li><strong>Directory Services:</strong> To display verified profiles within the alumni directory and facilitate networking</li>
                    <li><strong>Communication:</strong> To deliver important updates, including account approvals, policy changes, and relevant notifications</li>
                    <li><strong>Engagement:</strong> To associate content (posts, chats, comments) with your identity within the platform</li>
                    <li><strong>Community Recognition:</strong> To highlight members on special occasions, such as birthdays</li>
                </ul>

                <h2 className="text-2xl font-bold text-on-surface">3. Data Security</h2>
                <p>We implement robust technical and organizational measures to protect your personal data against unauthorized access, disclosure, or loss. These include:</p>
                <ul>
                    <li>Encrypted storage using a secure, cloud-hosted MongoDB database</li>
                    <li>Industry-standard password hashing using bcrypt; passwords are never stored in plain text</li>
                    <li>Strict access controls and privacy protections for the Alumni Directory, limited to authenticated and approved users only</li>
                </ul>

                <h2 className="text-2xl font-bold text-on-surface">4. Data Sharing and Disclosure</h2>
                <p>
                    We do <strong>not</strong> sell, rent, or otherwise disclose your personal information to advertisers or third-party marketing entities. Information may only be shared:
                </p>
                <ul>
                    <li>With your explicit consent</li>
                    <li>As required by law, regulation, or legal process</li>
                    <li>To protect the rights, property, or safety of users or the platform</li>
                </ul>

                <h2 className="text-2xl font-bold text-on-surface">5. Your Rights and Choices</h2>
                <p>
                    You maintain control over your personal information. Optional fields such as professional details, bio, and location can be updated or removed at any time via the Profile page. You may also request correction or deletion of your data by contacting the portal administrator.
                </p>

                <h2 className="text-2xl font-bold text-on-surface">6. Contact Us</h2>
                <p>
                    If you have questions, concerns, or requests related to your data or this policy, please contact the administrator of <strong>JNV MAA</strong> through the official channels provided on the portal.
                </p>
            </div>

            <div className="text-center mt-8">
                <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-[#0A192F]">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
