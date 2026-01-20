import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-gray max-w-none">
        <p className="text-sm text-gray-500 mb-8">Last updated: May 24, 2024</p>
        
        <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect information you provide directly to us, such as when you create an account, update your profile, generate a lesson, or contact us for support.</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Account Information: Name, email address, password.</li>
                <li>Learning Data: Vocabulary progress, CEFR levels, lesson history.</li>
                <li>Usage Data: Interactions with our features and content.</li>
            </ul>
        </section>

        <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to provide, maintain, and improve our services, specifically:</p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>To generate personalized AI lessons tailored to your proficiency.</li>
                <li>To track your progress and adjust difficulty levels automatically.</li>
                <li>To process payments for Pro subscriptions.</li>
                <li>To send you technical notices and support messages.</li>
            </ul>
        </section>

        <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Data Security</h2>
            <p className="text-gray-600">We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. Your password is encrypted, and we do not sell your personal data to third parties.</p>
        </section>
        
        <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Contact Us</h2>
            <p className="text-gray-600">If you have any questions about this Privacy Policy, please contact us at <a href="#" className="text-brand-600 hover:underline">privacy@lingualift.com</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;