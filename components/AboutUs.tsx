import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
      <div className="prose prose-lg text-gray-600">
        <p className="mb-6 leading-relaxed">
          LinguaLift was born from a simple idea: language learning shouldn't feel like a chore. 
          We believe in the power of <span className="font-bold text-brand-600">micro-learning</span>—small, consistent steps that lead to massive progress over time.
        </p>
        <p className="mb-6 leading-relaxed">
          Traditional education often focuses on rote memorization and long, exhausting study sessions. 
          We flipped the script. By combining the international CEFR standard with cutting-edge generative AI, 
          we created a learning experience that adapts to you, not the other way around.
        </p>
        <p className="mb-6 leading-relaxed">
          Our team of linguists, educators, and engineers works tirelessly to ensure that every 5-minute lesson 
          you take is more effective than an hour in a traditional classroom.
        </p>
        <h3 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Our Mission</h3>
        <p className="leading-relaxed">
          To unlock global communication by making language mastery accessible, personalized, and engaging for everyone, everywhere.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;