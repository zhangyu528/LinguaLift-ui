
import React, { useState } from 'react';
import { X, Check, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

interface VocabularyDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup?: () => void;
  onComplete?: () => void;
  mode?: 'demo' | 'user';
}

const words = [
  { word: "Resilient", def: "Able to withstand or recover quickly from difficult conditions." },
  { word: "Inevitably", def: "As is certain to happen; unavoidably." },
  { word: "Profound", def: "Very great or intense; showing great knowledge." },
  { word: "Alleviate", def: "Make (suffering, deficiency, or a problem) less severe." },
  { word: "Endeavor", def: "Try hard to do or achieve something." }
];

const VocabularyDemoModal: React.FC<VocabularyDemoModalProps> = ({ 
  isOpen, 
  onClose, 
  onSignup, 
  onComplete,
  mode = 'demo' 
}) => {
  const [learnedCount, setLearnedCount] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleWordClick = (index: number) => {
    if (activeWordIndex === index) return; // Already active
    setActiveWordIndex(index);
    // If not already learned (logic simplified for demo flow), increment count
    if (learnedCount < words.length) {
        setLearnedCount(prev => Math.min(prev + 1, words.length));
    }
  };

  const isComplete = learnedCount === words.length;

  const handleAction = () => {
    if (mode === 'demo' && onSignup) {
      onSignup();
    } else if (mode === 'user' && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>

      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <BookOpen size={18} className="text-brand-600" />
              Daily 5-Word Challenge
            </h3>
            <p className="text-xs text-gray-500 mt-1">Tap words to learn their meaning</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-white p-1.5 rounded-full border border-gray-200 hover:border-gray-300 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between text-sm font-bold text-gray-600 mb-2">
                    <span>Progress</span>
                    <span className={isComplete ? "text-green-500" : "text-brand-600"}>{learnedCount} / 5 Words</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ease-out ${isComplete ? 'bg-green-500' : 'bg-brand-500'}`}
                        style={{ width: `${(learnedCount / 5) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Word List */}
            <div className="space-y-3 mb-8">
                {words.map((item, idx) => {
                    const isActive = activeWordIndex === idx;
                    const isChecked = idx < learnedCount;
                    
                    return (
                        <div 
                            key={item.word}
                            onClick={() => handleWordClick(idx)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${isActive ? 'bg-brand-50 border-brand-200 ring-1 ring-brand-200' : 'bg-white border-gray-100 hover:border-brand-200 hover:shadow-sm'}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className={`text-lg font-bold ${isActive ? 'text-brand-800' : 'text-gray-700'}`}>{item.word}</span>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isChecked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-300'}`}>
                                    <Check size={14} strokeWidth={3} />
                                </div>
                            </div>
                            
                            {/* Definition Expansion */}
                            <div className={`grid transition-all duration-300 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                <div className="overflow-hidden text-sm text-gray-600 leading-relaxed">
                                    {item.def}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Context Story */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-sm text-gray-600 italic leading-relaxed mb-4">
                "To make <strong className="text-brand-700">profound</strong> progress, one must <strong className="text-brand-700">endeavor</strong> to be <strong className="text-brand-700">resilient</strong>. Challenges will <strong className="text-brand-700">inevitably</strong> arise, but knowledge helps <strong className="text-brand-700">alleviate</strong> the struggle."
            </div>

        </div>

        {/* Footer Action */}
        <div className="p-6 bg-white border-t border-gray-100">
             <button 
                onClick={handleAction}
                disabled={!isComplete}
                className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${isComplete ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
             >
                {isComplete ? (
                    <>
                        <Sparkles size={18} /> {mode === 'demo' ? 'Claim Your 5-Word Streak' : 'Complete Challenge'}
                    </>
                ) : (
                    <>
                        Tap all words to finish
                    </>
                )}
             </button>
             {mode === 'demo' && <p className="text-center text-xs text-gray-400 mt-3">Join free to save your daily progress</p>}
        </div>

      </div>
    </div>
  );
};

export default VocabularyDemoModal;
