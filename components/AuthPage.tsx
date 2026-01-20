
import React, { useState } from 'react';
import { Bot, Mail, Lock, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

export type AuthSource = 'generic' | 'cefr' | 'vocabulary' | 'videos';

interface AuthPageProps {
  cefrLevel?: string;
  sourceFeature?: AuthSource;
  onLogin: () => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ cefrLevel, sourceFeature = 'generic', onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  // Dynamic content based on source
  const getContent = () => {
    switch (sourceFeature) {
      case 'vocabulary':
        return {
          title: <span>Build your vocabulary,<br/><span className="text-brand-400">5 words</span> a day.</span>,
          desc: "Consistent micro-learning is the key to fluency. Track your daily streak and never forget a word again.",
          icon: <CheckCircle2 size={20} />
        };
      case 'videos':
        return {
          title: <span>Learn with <br/><span className="text-brand-400">Short Videos</span>.</span>,
          desc: "Turn your spare moments into language learning opportunities. Watch, learn, and grow in just 5 minutes.",
          icon: <TrendingUp size={20} />
        };
      case 'cefr':
      default:
        return {
          title: <span>Master English, <br/><span className="text-brand-400">One Level</span> at a time.</span>,
          desc: "\"One language sets you in a corridor for life. Two languages open every door along the way.\"",
          icon: <Bot size={20} />
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Panel - Visual & Motivation */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
           </svg>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white">
                {content.icon}
            </div>
            <span className="text-xl font-bold tracking-tight">LinguaLift</span>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            {content.title}
          </h2>
          <p className="text-brand-200 text-lg leading-relaxed mb-8">
            {content.desc}
          </p>
          <div className="flex items-center gap-4">
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-900 bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                ))}
             </div>
             <p className="text-sm font-medium text-brand-100">Join 12,000+ learners today</p>
          </div>
        </div>

        <div className="relative z-10 text-sm text-brand-400 opacity-60">
          © 2024 LinguaLift Inc.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600 mb-8 flex items-center gap-1">
             &larr; Back to Home
          </button>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome back' : 'Create Account'}
            </h1>
            <p className="text-gray-500">
              {isLogin 
                ? 'Enter your details to access your lessons.' 
                : cefrLevel 
                  ? <span>Save your <span className="font-bold text-brand-600">{cefrLevel}</span> progress.</span>
                  : sourceFeature === 'vocabulary' 
                    ? 'Start your daily vocabulary streak.' 
                    : 'Get started with your personalized plan.'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="password" 
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-200/50 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? 'Processing...' : (
                <>
                  {isLogin ? 'Sign In' : 'Start Learning'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-brand-600 hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
