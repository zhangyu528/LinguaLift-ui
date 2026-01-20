import React, { useState } from 'react';
import { generateLesson } from '../services/geminiService';
import { GeneratedLesson, CEFRLevel } from '../types';
import { Loader2, BookOpen, Volume2, ArrowRight } from 'lucide-react';

const LiveDemo: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<string>(Object.keys(CEFRLevel)[0]);
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<GeneratedLesson | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    
    setLoading(true);
    setLesson(null);
    try {
      const selectedLevel = CEFRLevel[level as keyof typeof CEFRLevel];
      const data = await generateLesson(topic, selectedLevel);
      setLesson(data);
    } catch (err) {
      alert("Failed to generate lesson. Please check API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-16 px-4 bg-brand-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Try it Yourself</h2>
          <p className="text-gray-600">Experience the power of AI-generated personalized lessons.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <input 
                type="text" 
                placeholder="e.g., Travel, Business, Coffee" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                {Object.entries(CEFRLevel).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed h-[50px]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Generate Lesson'}
              </button>
            </div>
          </form>

          {lesson && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                 <div>
                    <h3 className="text-xl font-bold text-gray-900 capitalize">{lesson.topic}</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-brand-100 text-brand-700 rounded-full">{lesson.cefrLevel}</span>
                 </div>
                 <button className="text-gray-400 hover:text-brand-600 transition-colors">
                    <Volume2 size={24} />
                 </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <BookOpen size={16} /> 5 Key Words
                    </h4>
                    <ul className="space-y-3">
                        {lesson.vocabulary.map((vocab, idx) => (
                            <li key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="font-bold text-brand-700 block">{vocab.word}</span>
                                <span className="text-sm text-gray-600 leading-snug">{vocab.definition}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">In Context</h4>
                    <div className="bg-brand-50 p-6 rounded-xl border border-brand-100 text-gray-800 leading-relaxed italic">
                        "{lesson.shortStory}"
                    </div>
                    <div className="mt-6 flex justify-end">
                         <button className="text-brand-600 text-sm font-semibold flex items-center gap-1 hover:underline">
                            Start Full Lesson <ArrowRight size={16} />
                         </button>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;