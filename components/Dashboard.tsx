
import React, { useState } from 'react';
import { generateLesson } from '../services/geminiService';
import { GeneratedLesson, DashboardTab, Lesson } from '../types';
import { Loader2, BookOpen, Volume2, ArrowRight, Star, Clock, Flame, Settings, Plus, Play, CheckCircle2, Award, Zap, ArrowLeft, MoreVertical } from 'lucide-react';
import VideoDemoModal from './VideoDemoModal';
import VideoLessonView from './VideoLessonView'; // Import the new view

interface DashboardProps {
  cefrLevel: string;
  activeTab: DashboardTab;
  onTabChange?: (tab: DashboardTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ cefrLevel, activeTab, onTabChange }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<GeneratedLesson | null>(null);
  
  // State for the new independent video lesson view
  const [activeVideoLesson, setActiveVideoLesson] = useState<Lesson | null>(null);
  const [dailyProgress, setDailyProgress] = useState(0); // 0 or 5

  // Mock Data
  const recentLessons: (Lesson & { thumbnail: string; duration: string })[] = [
    {
      id: '1',
      topic: 'Coffee Culture',
      cefrLevel: 'B1',
      date: '2 hours ago',
      status: 'completed',
      vocabulary: [],
      shortStory: '',
      thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
      duration: '4:20'
    },
    {
      id: '2',
      topic: 'Job Interview Tips',
      cefrLevel: 'B1',
      date: 'Yesterday',
      status: 'in-progress',
      vocabulary: [],
      shortStory: '',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
      duration: '3:15'
    },
    {
      id: '3',
      topic: 'Airport Navigation',
      cefrLevel: 'A2',
      date: '2 days ago',
      status: 'completed',
      vocabulary: [],
      shortStory: '',
      thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop',
      duration: '5:00'
    },
    {
      id: '4',
      topic: 'Healthy Cooking',
      cefrLevel: 'B2',
      date: '3 days ago',
      status: 'completed',
      vocabulary: [],
      shortStory: '',
      thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop',
      duration: '6:30'
    }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    
    setLoading(true);
    setCurrentLesson(null);
    try {
      const data = await generateLesson(topic, cefrLevel);
      setCurrentLesson(data);
    } catch (err) {
      alert("Failed to generate lesson. Please check API key.");
    } finally {
      setLoading(false);
    }
  };

  const startDailyChallenge = () => {
    // Create a mock lesson object for the daily challenge
    const challengeLesson: Lesson = {
       id: 'daily',
       topic: 'Resilience in Business',
       cefrLevel: cefrLevel,
       date: 'Today',
       status: 'in-progress',
       vocabulary: [],
       shortStory: '',
       // @ts-ignore - Mock properties for UI
       thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop'
    };
    setActiveVideoLesson(challengeLesson);
  };

  const handleVideoLessonComplete = () => {
    setDailyProgress(5);
    setActiveVideoLesson(null);
  };

  // If a video lesson is active, render it FULL SCREEN, overriding tabs
  if (activeVideoLesson) {
    return (
      <VideoLessonView 
        lesson={activeVideoLesson} 
        onBack={() => setActiveVideoLesson(null)} 
        onComplete={handleVideoLessonComplete} 
      />
    );
  }

  /* --- VIEW: HOME --- */
  const HomeView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Banner */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Good Morning, Learner!</h1>
          <p className="text-gray-500">You are on a <span className="text-orange-500 font-bold">3 day streak</span>. Keep it up!</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-brand-100 rounded-lg text-brand-600"><Star size={20} fill="currentColor" /></div>
              <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">Level</span>
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">{cefrLevel.split(' ')[0]}</p>
                <p className="text-xs text-gray-400 font-medium">Intermediate</p>
            </div>
         </div>
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-orange-100 rounded-lg text-orange-500"><Flame size={20} fill="currentColor" /></div>
              <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">Streak</span>
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-400 font-medium">Days</p>
            </div>
         </div>
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-500"><BookOpen size={20} /></div>
              <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">Words</span>
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">{42 + dailyProgress}</p>
                <p className="text-xs text-gray-400 font-medium">Learned</p>
            </div>
         </div>
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-500"><Clock size={20} /></div>
              <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md">Time</span>
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">2h 15m</p>
                <p className="text-xs text-gray-400 font-medium">Total</p>
            </div>
         </div>
      </div>

      {/* Daily Goal Card (Full Width) */}
      <div className={`w-full rounded-3xl p-8 text-white relative overflow-hidden shadow-xl transition-colors duration-500 ${dailyProgress === 5 ? 'bg-gradient-to-br from-green-600 to-green-500' : 'bg-gradient-to-br from-brand-900 to-brand-800'}`}>
         <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-10">
             <Award size={140} />
         </div>
         <div className="relative z-10">
             <div className={`flex items-center gap-2 mb-4 text-sm font-bold uppercase tracking-wider ${dailyProgress === 5 ? 'text-green-100' : 'text-brand-200'}`}>
                <Zap size={16} /> Daily Goal
             </div>
             <h3 className="text-3xl font-bold mb-2">Today's Video Challenge</h3>
             <p className={`${dailyProgress === 5 ? 'text-green-50' : 'text-brand-100'} mb-8 max-w-xl text-lg`}>
               {dailyProgress === 5 ? "You've crushed your daily goal! Come back tomorrow to keep your streak." : "Watch a short video clip and master 5 new words in context to complete your daily streak."}
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => dailyProgress < 5 && startDailyChallenge()}
                  disabled={dailyProgress === 5}
                  className={`px-8 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${dailyProgress === 5 ? 'bg-white/20 text-white cursor-default' : 'bg-white text-brand-900 hover:bg-brand-50'}`}
                >
                   {dailyProgress === 5 ? (
                     <>Challenge Completed <CheckCircle2 size={18} /></>
                   ) : (
                     <>Start Challenge <Play size={18} fill="currentColor" /></>
                   )}
                </button>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm w-fit">
                    <div className="text-2xl font-bold">{dailyProgress}/5</div>
                    <div className={`text-xs leading-tight ${dailyProgress === 5 ? 'text-green-100' : 'text-brand-200'}`}>Words<br/>Mastered</div>
                </div>
             </div>
         </div>
      </div>

      {/* Video History Grid (Below Daily Goal) */}
      <div>
         <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
               <Play size={20} className="text-brand-600" /> Watch History
            </h3>
            <button className="text-sm font-medium text-brand-600 hover:text-brand-700">View All</button>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentLessons.map((lesson) => (
               <div 
                  key={lesson.id} 
                  onClick={() => setActiveVideoLesson(lesson)}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
               >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-200 overflow-hidden">
                     <img 
                        src={lesson.thumbnail} 
                        alt={lesson.topic}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                           <Play size={18} className="text-brand-600 ml-0.5" fill="currentColor" />
                        </div>
                     </div>
                     <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {lesson.duration}
                     </span>
                     {lesson.status === 'completed' && (
                        <div className="absolute top-2 left-2 bg-green-500/90 text-white p-1 rounded-full shadow-sm">
                           <CheckCircle2 size={12} />
                        </div>
                     )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-brand-600 transition-colors">{lesson.topic}</h4>
                     </div>
                     <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">{lesson.cefrLevel}</span>
                        <span>•</span>
                        <span>{lesson.date}</span>
                     </div>
                     
                     <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                         <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <BookOpen size={14} /> 5 Words
                         </div>
                         <div className="w-20 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className={`h-full rounded-full ${lesson.status === 'completed' ? 'bg-green-500 w-full' : 'bg-orange-400 w-1/3'}`}></div>
                         </div>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );

  /* --- VIEW: LESSONS --- */
  const LessonsView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">My Lessons</h2>
          <button className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 px-4 py-2 rounded-lg">
             <Plus size={16} /> New Playlist
          </button>
       </div>

       {/* Generator Section */}
       <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-brand-50 p-6 md:p-8 border-b border-brand-100">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-brand-600 rounded-lg text-white"><BookOpen size={20} /></div>
                    <h2 className="text-xl font-bold text-brand-900">AI Lesson Generator</h2>
                </div>
                <p className="text-brand-700 max-w-xl">Enter any topic, and our AI will generate a personalized {cefrLevel} lesson with vocabulary and reading practice.</p>
            </div>
            <div className="p-6 md:p-8">
                <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
                    <input 
                        type="text" 
                        placeholder="e.g., Football, Cooking, Space Travel..." 
                        className="flex-1 px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none text-base"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-brand-100"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Generate Lesson'}
                    </button>
                </form>
            </div>
        </div>

        {/* Display Generated Lesson */}
        {currentLesson && (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <span className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1 block">New Lesson</span>
                        <h3 className="text-2xl font-bold text-gray-900 capitalize">{currentLesson.topic}</h3>
                    </div>
                    <button className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-brand-600 hover:bg-brand-50 transition-colors">
                        <Volume2 size={24} />
                    </button>
                </div>

                <div className="p-8">
                    <div className="mb-10">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                            <BookOpen size={16} /> 5 Key Words
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            {currentLesson.vocabulary.map((vocab, idx) => (
                                <div key={idx} className="bg-brand-50/50 p-4 rounded-xl border border-brand-100 hover:border-brand-300 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-bold text-lg text-brand-800">{vocab.word}</span>
                                        <button className="text-brand-300 hover:text-brand-600">
                                            <Volume2 size={16} />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-600 leading-snug">{vocab.definition}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Reading Practice</h4>
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-lg text-gray-800 leading-relaxed font-serif">
                            {currentLesson.shortStory}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg">
                            Complete Lesson <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Library Section */}
        {!currentLesson && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {recentLessons.map(lesson => (
                 <div key={lesson.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                          <BookOpen size={18} />
                       </div>
                       <span className={`text-xs font-bold px-2 py-1 rounded-md ${lesson.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                          {lesson.status === 'completed' ? 'Done' : 'In Progress'}
                       </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{lesson.topic}</h3>
                    <p className="text-sm text-gray-500 mb-4">{lesson.date} • {lesson.cefrLevel}</p>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                       <div className={`h-full rounded-full ${lesson.status === 'completed' ? 'bg-green-500 w-full' : 'bg-orange-500 w-1/3'}`}></div>
                    </div>
                 </div>
               ))}
               
               {/* Empty State / Add New */}
               <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-400 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50 transition-all cursor-pointer min-h-[180px]">
                   <Plus size={32} className="mb-2" />
                   <span className="font-medium">Create New Lesson</span>
               </div>
           </div>
        )}
    </div>
  );

  /* --- VIEW: PROFILE --- */
  const ProfileView = () => (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        {/* Back Button */}
        <button 
          onClick={() => onTabChange && onTabChange('home')}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-600 transition-colors font-medium"
        >
           <ArrowLeft size={20} /> Back to Home
        </button>

        {/* Profile Card */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-brand-600 to-brand-400"></div>
            <div className="relative z-10 -mt-4">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 mx-auto mb-4 overflow-hidden shadow-lg">
                    <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Alex Learner</h2>
                <p className="text-gray-500 mb-6">alex@example.com</p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full font-bold text-sm">
                    <Star size={14} fill="currentColor" /> {cefrLevel}
                </div>
            </div>
        </div>

        {/* Settings List */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Account Settings</h3>
            </div>
            <div className="divide-y divide-gray-100">
                <button className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors text-left">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Settings size={18} /></div>
                        <span className="font-medium text-gray-700">General Preferences</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-400" />
                </button>
                <button className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors text-left">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Award size={18} /></div>
                        <span className="font-medium text-gray-700">Subscription Plan</span>
                    </div>
                    <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500">Free</span>
                </button>
            </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-3xl shadow-lg text-white text-center">
            <h3 className="font-bold text-xl mb-2">Upgrade to Pro</h3>
            <p className="text-purple-100 mb-6 max-w-sm mx-auto">Get unlimited AI lessons, advanced statistics, and video mode.</p>
            <button className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors shadow-lg">
                View Plans
            </button>
        </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 pb-24 md:pb-8">
      {activeTab === 'home' && <HomeView />}
      {activeTab === 'lessons' && <LessonsView />}
      {activeTab === 'profile' && <ProfileView />}
    </div>
  );
};

export default Dashboard;
