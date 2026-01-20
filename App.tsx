
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import FeatureCard from './components/FeatureCard';
import PlacementTestModal from './components/PlacementTestModal';
import VideoDemoModal from './components/VideoDemoModal';
import VocabularyDemoModal from './components/VocabularyDemoModal';
import SignOutModal from './components/SignOutModal'; // Import the new modal
import AuthPage, { AuthSource } from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Costs from './components/Costs';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Lock, Layers, Target, Twitter, Facebook, Globe, Instagram, CheckCircle2, Play, Captions, ArrowRight } from 'lucide-react';
import { DashboardTab } from './types';

type ViewState = 'landing' | 'auth' | 'dashboard' | 'about' | 'contact' | 'costs' | 'privacy';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('home');
  const [isPlacementOpen, setIsPlacementOpen] = useState(false);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState(false);
  const [isVocabDemoOpen, setIsVocabDemoOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false); // New state for sign out modal
  const [userLevel, setUserLevel] = useState<string>(""); 
  const [authSource, setAuthSource] = useState<AuthSource>('generic');

  // Handler for finishing the placement test
  const handleTestComplete = (level: string) => {
    setUserLevel(level);
    setIsPlacementOpen(false);
    setAuthSource('cefr');
    setView('auth');
  };

  // Handler for login success
  const handleLoginSuccess = () => {
    // If no level set yet, set a default
    if (!userLevel) setUserLevel("B1 (Intermediate)");
    setView('dashboard');
    setDashboardTab('home');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setView('landing');
    setAuthSource('generic');
    setUserLevel("");
    window.scrollTo(0, 0);
  };

  const handleSignOutRequest = () => {
    setIsSignOutModalOpen(true);
  };

  const handleConfirmSignOut = () => {
    setIsSignOutModalOpen(false);
    navigateToHome();
  };

  const navigateToPage = (page: ViewState) => {
    setView(page);
    window.scrollTo(0, 0);
  };

  // Handler for direct signup (skipping test) with specific context
  const handleDirectSignup = (source: AuthSource) => {
    setUserLevel(""); 
    setAuthSource(source);
    setView('auth');
  };

  if (view === 'auth') {
    return (
      <AuthPage 
        cefrLevel={userLevel} 
        sourceFeature={authSource}
        onLogin={handleLoginSuccess} 
        onBack={navigateToHome}
      />
    );
  }

  // Visual component for the 5-words card
  const FiveWordsChecklist = (
    <div className="bg-gray-50 rounded-xl p-4 w-full max-w-[200px] border border-gray-100 shadow-inner">
      <div className="space-y-2">
        {['Serendipity', 'Ephemeral', 'Resilient'].map((word, i) => (
          <div key={i} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
             <div className="text-green-500"><CheckCircle2 size={14} fill="currentColor" className="text-white" /></div>
             <span className="text-xs font-bold text-gray-700">{word}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 bg-white/50 p-2 rounded-lg border border-dashed border-gray-200">
           <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300"></div>
           <span className="text-xs text-gray-400">Word 4...</span>
        </div>
      </div>
    </div>
  );

  const CefrBadges = (
    <div className="flex justify-center items-end gap-2 h-12 mb-2">
        <div className="bg-brand-100 text-brand-600 px-2 py-1 rounded-md text-xs font-bold h-8 flex items-center">A1</div>
        <div className="bg-brand-200 text-brand-700 px-2 py-1 rounded-md text-sm font-bold h-10 flex items-center">B1</div>
        <div className="bg-brand-500 text-white px-2 py-1 rounded-md text-base font-bold h-12 flex items-center shadow-lg transform -translate-y-1">C1</div>
    </div>
  );

  const VideoPreview = (
    <div className="relative bg-gray-900 rounded-xl w-full max-w-[200px] h-[110px] shadow-lg overflow-hidden group">
      {/* Background Simulation */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 to-gray-800 opacity-80"></div>
      <img 
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
        alt="Video thumbnail" 
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
      />
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
           <Play size={16} fill="white" className="text-white ml-0.5" />
        </div>
      </div>

      {/* UI Elements */}
      <div className="absolute bottom-3 left-3 right-3">
         <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">LIVE</span>
            <div className="flex items-center gap-1 text-white/80">
              <Captions size={10} />
              <span className="text-[9px]">EN/ES</span>
            </div>
         </div>
         {/* Progress Bar */}
         <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-brand-400 rounded-full"></div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 pb-20 md:pb-0 flex flex-col">
      {view === 'dashboard' ? (
        <>
          {/* Hide Navbar on mobile when in dashboard, show on desktop */}
          <div className="hidden md:block">
            <Navbar 
              isLoggedIn={true} 
              onSignOut={handleSignOutRequest} 
              onSignIn={() => setView('auth')} 
              onProfileClick={() => setDashboardTab('profile')}
            />
          </div>
          <Dashboard 
            cefrLevel={userLevel || "B1 (Intermediate)"} 
            activeTab={dashboardTab}
            onTabChange={setDashboardTab}
          />
          <MobileNav 
            activeTab={dashboardTab} 
            onTabChange={(tab) => {
              // Convert generic string to specific DashboardTab type if valid
              if (tab === 'home' || tab === 'lessons' || tab === 'profile') {
                setDashboardTab(tab as DashboardTab);
              }
            }} 
          />
          <SignOutModal 
            isOpen={isSignOutModalOpen}
            onClose={() => setIsSignOutModalOpen(false)}
            onConfirm={handleConfirmSignOut}
          />
        </>
      ) : (
        <>
           <Navbar isLoggedIn={false} onSignOut={handleSignOutRequest} onSignIn={() => handleDirectSignup('generic')} />
          
           <div className="flex-grow">
            {/* Landing Page Content */}
            {view === 'landing' && (
              <>
                {/* Modals only needed for landing interactions */}
                <PlacementTestModal 
                  isOpen={isPlacementOpen} 
                  onClose={() => setIsPlacementOpen(false)} 
                  onComplete={handleTestComplete}
                />
                
                <VideoDemoModal
                  isOpen={isVideoDemoOpen}
                  onClose={() => setIsVideoDemoOpen(false)}
                  onSignup={() => {
                      setIsVideoDemoOpen(false);
                      handleDirectSignup('videos');
                  }}
                />

                <VocabularyDemoModal 
                  isOpen={isVocabDemoOpen}
                  onClose={() => setIsVocabDemoOpen(false)}
                  onSignup={() => {
                      setIsVocabDemoOpen(false);
                      handleDirectSignup('vocabulary');
                  }}
                />

                {/* Hero Section */}
                <header className="relative w-full max-w-7xl mx-auto px-6 pt-8 pb-20 md:pb-32 flex flex-col items-center">
                  <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden relative shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
                      alt="Student learning"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-xl">
                        Unlock English Listening. <br/>
                        <span className="text-brand-100">Five Words</span> at 1 Time
                      </h1>
                      <button 
                        onClick={() => setIsPlacementOpen(true)}
                        className="bg-white text-brand-700 px-8 py-3 rounded-full font-semibold w-fit hover:bg-brand-50 transition-colors shadow-lg"
                      >
                        Get Started Now
                      </button>
                    </div>
                  </div>
                </header>

                {/* Main Content Area */}
                <main className="max-w-7xl mx-auto px-6 -mt-20 md:-mt-32 relative z-10">
                  
                  {/* Section Heading */}
                  <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                      Unlock English Listening
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl font-light">
                      Personalize CEFR-Based Short Lessons
                    </p>
                  </div>

                  {/* Feature Cards Grid */}
                  <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <FeatureCard 
                      icon={<Lock size={48} strokeWidth={1.5} className="text-gray-800" />}
                      customVisual={CefrBadges}
                      title="Level Up with CEFR"
                      subtitle="Curriculum tailored to your exact proficiency, from Beginner (A1) to Advanced (C1)."
                      badgeCount={6}
                      ctaText="Select Level"
                      onClick={() => setIsPlacementOpen(true)}
                    />
                    <FeatureCard 
                      icon={<Layers size={48} strokeWidth={1.5} className="text-gray-800" />}
                      customVisual={VideoPreview}
                      title="Short Videos, Big Impact"
                      subtitle="Micro-learning designed for busy lives. Master concepts in just 5 minutes a day."
                      badgeCount={10}
                      ctaText="Start Listening"
                      onClick={() => setIsVideoDemoOpen(true)}
                    />
                    <FeatureCard 
                      icon={<Target size={48} strokeWidth={1.5} className="text-gray-800" />}
                      customVisual={FiveWordsChecklist}
                      title="Master 5 Words Per Lesson"
                      subtitle="Focus on high-frequency vocabulary in context to maximize retention and usage."
                      ctaText="Join 5-Word Challenge"
                      onClick={() => setIsVocabDemoOpen(true)}
                    />
                  </div>

                  {/* Get Started CTA */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-24">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 shrink-0">
                            <Target size={32} />
                         </div>
                         <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Ready to boost your fluency?</h3>
                            <p className="text-gray-500">Take the placement test and get your personalized plan today.</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => setIsPlacementOpen(true)}
                        className="w-full md:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-100"
                      >
                         Get Started Now <ArrowRight size={18} />
                      </button>
                  </div>
                </main>
              </>
            )}

            {/* Static Pages */}
            {view === 'about' && <AboutUs />}
            {view === 'contact' && <Contact />}
            {view === 'costs' && <Costs />}
            {view === 'privacy' && <PrivacyPolicy />}
           </div>

           {/* Footer */}
           <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                        <Lock size={16} />
                    </div>
                    <span className="text-lg font-bold text-gray-900">LinguaLift</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                    AI-powered English learning tailored to your CEFR level. Master a language, 5 words at a time.
                  </p>
                  <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-brand-600 transition-colors"><Twitter size={20} /></button>
                    <button className="text-gray-400 hover:text-brand-600 transition-colors"><Facebook size={20} /></button>
                    <button className="text-gray-400 hover:text-brand-600 transition-colors"><Instagram size={20} /></button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 mb-6">Product</h4>
                  <ul className="space-y-4 text-sm text-gray-500">
                    <li><button onClick={() => navigateToPage('landing')} className="hover:text-brand-600">Features</button></li>
                    <li><button onClick={() => navigateToPage('costs')} className="hover:text-brand-600">Pricing</button></li>
                    <li><button onClick={() => handleDirectSignup('generic')} className="hover:text-brand-600">Sign Up</button></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 mb-6">Company</h4>
                  <ul className="space-y-4 text-sm text-gray-500">
                    <li><button onClick={() => navigateToPage('about')} className="hover:text-brand-600">About Us</button></li>
                    <li><button onClick={() => navigateToPage('contact')} className="hover:text-brand-600">Contact</button></li>
                    <li><button onClick={() => navigateToPage('contact')} className="hover:text-brand-600">Careers</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
                  <ul className="space-y-4 text-sm text-gray-500">
                    <li><button onClick={() => navigateToPage('privacy')} className="hover:text-brand-600">Privacy Policy</button></li>
                    <li><button onClick={() => navigateToPage('privacy')} className="hover:text-brand-600">Terms of Service</button></li>
                    <li><button onClick={() => navigateToPage('privacy')} className="hover:text-brand-600">Cookie Policy</button></li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                <p>&copy; 2024 LinguaLift Inc. All rights reserved.</p>
                <div className="flex items-center gap-6">
                  <button className="hover:text-gray-600 flex items-center gap-2">
                    <Globe size={16} /> English (US)
                  </button>
                </div>
              </div>
            </div>
           </footer>
        </>
      )}
    </div>
  );
};

export default App;
