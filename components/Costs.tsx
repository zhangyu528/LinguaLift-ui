import React from 'react';
import { Check, X } from 'lucide-react';

const Costs: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">Start for free, upgrade when you're ready to master the language.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Starter</h3>
          <p className="text-gray-500 mb-6">Perfect for casual learners.</p>
          <p className="text-5xl font-bold text-gray-900 mb-6">$0<span className="text-lg font-medium text-gray-400">/mo</span></p>
          
          <button className="w-full py-3.5 rounded-xl border-2 border-brand-600 text-brand-600 font-bold hover:bg-brand-50 transition-colors mb-8">
            Get Started Free
          </button>

          <ul className="space-y-4">
             <li className="flex items-center gap-3 text-gray-700"><div className="p-1 bg-green-100 rounded-full text-green-600"><Check size={14} strokeWidth={3} /></div> 1 Lesson per day</li>
             <li className="flex items-center gap-3 text-gray-700"><div className="p-1 bg-green-100 rounded-full text-green-600"><Check size={14} strokeWidth={3} /></div> A1 & A2 Levels only</li>
             <li className="flex items-center gap-3 text-gray-700"><div className="p-1 bg-green-100 rounded-full text-green-600"><Check size={14} strokeWidth={3} /></div> Daily 5-Word Challenge</li>
             <li className="flex items-center gap-3 text-gray-400"><div className="p-1 bg-gray-100 rounded-full text-gray-400"><X size={14} strokeWidth={3} /></div> No Video Mode</li>
             <li className="flex items-center gap-3 text-gray-400"><div className="p-1 bg-gray-100 rounded-full text-gray-400"><X size={14} strokeWidth={3} /></div> Limited Progress Stats</li>
          </ul>
        </div>
        
        {/* Pro Plan */}
        <div className="bg-brand-900 text-white p-8 md:p-10 rounded-3xl border border-brand-900 shadow-xl relative overflow-hidden transform md:-translate-y-4">
           <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">Most Popular</div>
          <h3 className="text-2xl font-bold mb-2">Pro Mastery</h3>
          <p className="text-brand-200 mb-6">For serious learners.</p>
          <p className="text-5xl font-bold mb-6">$9.99<span className="text-lg font-medium text-brand-300">/mo</span></p>
          
          <button className="w-full py-3.5 rounded-xl bg-white text-brand-900 font-bold hover:bg-brand-50 transition-colors mb-8 shadow-lg">
            Start 7-Day Free Trial
          </button>

          <ul className="space-y-4">
             <li className="flex items-center gap-3 text-white"><div className="p-1 bg-brand-700 rounded-full text-brand-300"><Check size={14} strokeWidth={3} /></div> <strong>Unlimited</strong> AI Lessons</li>
             <li className="flex items-center gap-3 text-white"><div className="p-1 bg-brand-700 rounded-full text-brand-300"><Check size={14} strokeWidth={3} /></div> All CEFR Levels (A1 - C1)</li>
             <li className="flex items-center gap-3 text-white"><div className="p-1 bg-brand-700 rounded-full text-brand-300"><Check size={14} strokeWidth={3} /></div> <strong>Interactive Video Mode</strong></li>
             <li className="flex items-center gap-3 text-white"><div className="p-1 bg-brand-700 rounded-full text-brand-300"><Check size={14} strokeWidth={3} /></div> Advanced Progress Analytics</li>
             <li className="flex items-center gap-3 text-white"><div className="p-1 bg-brand-700 rounded-full text-brand-300"><Check size={14} strokeWidth={3} /></div> Priority Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Costs;