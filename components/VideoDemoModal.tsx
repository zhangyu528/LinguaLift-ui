
import React, { useState } from 'react';
import { X, Play, Pause, ChevronRight, Captions, Volume2, CheckCircle2 } from 'lucide-react';

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup?: () => void;
  onComplete?: () => void;
  mode?: 'demo' | 'user';
  customTitle?: string;
  customButtonText?: string;
}

const VideoDemoModal: React.FC<VideoDemoModalProps> = ({ 
  isOpen, 
  onClose, 
  onSignup, 
  onComplete,
  mode = 'demo',
  customTitle,
  customButtonText
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);

  if (!isOpen) return null;

  const handleWordClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDefinition(!showDefinition);
    setIsPlaying(false); // Auto pause when interaction happens
  };

  const handleAction = () => {
    if (mode === 'user' && onComplete) {
      onComplete();
    } else if (onSignup) {
      onSignup();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
           <div className="flex items-center gap-2 text-white/90">
              <span className="bg-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">LIVE</span>
              <span className="text-sm font-medium">
                {customTitle || (mode === 'user' ? 'Daily Challenge: Video Comprehension' : 'Daily Inspiration')}
              </span>
           </div>
           <button onClick={onClose} className="text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-colors">
             <X size={20} />
           </button>
        </div>

        {/* Video Area (Simulated) */}
        <div className="relative aspect-video bg-gray-800 flex items-center justify-center group overflow-hidden cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
           <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
            alt="Video Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
           />
           
           {/* Play/Pause Overlay */}
           {!isPlaying && (
             <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-transform group-hover:scale-110">
                <Play size={32} fill="white" className="text-white ml-1" />
             </div>
           )}

           {/* Subtitles Overlay */}
           <div className="absolute bottom-12 left-0 w-full px-8 text-center">
              <div className="inline-block bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg text-lg md:text-xl text-white font-medium leading-relaxed shadow-lg">
                "Success is not final, failure is not <span 
                  onClick={handleWordClick}
                  className={`border-b-2 border-brand-400 cursor-pointer hover:text-brand-300 hover:border-brand-300 transition-colors ${showDefinition ? 'text-brand-300 bg-brand-900/50 px-1 rounded' : ''}`}
                >fatal</span>: it is the <span className="text-brand-200">courage</span> to continue that counts."
              </div>
           </div>

           {/* Definition Popover */}
           {showDefinition && (
             <div className="absolute bottom-28 bg-white text-gray-900 p-4 rounded-xl shadow-xl w-64 animate-in slide-in-from-bottom-2">
                <div className="flex justify-between items-start mb-1">
                   <h4 className="text-lg font-bold">Fatal</h4>
                   <button className="text-brand-600 hover:bg-brand-50 rounded-full p-1">
                     <Volume2 size={16} />
                   </button>
                </div>
                <div className="text-xs text-gray-500 italic mb-2">adj. /feɪ.təl/</div>
                <p className="text-sm text-gray-700 leading-snug">Causing death, or leading to failure or disaster.</p>
                <div className="mt-3 text-xs bg-gray-100 p-2 rounded text-gray-600">
                   "A fatal mistake."
                </div>
             </div>
           )}

           {/* Controls Bar */}
           <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
              <div className={`h-full bg-brand-500 relative ${isPlaying ? 'w-full transition-all duration-[10s] ease-linear' : 'w-1/3'}`}>
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm scale-0 group-hover:scale-100 transition-transform"></div>
              </div>
           </div>
        </div>

        {/* Action Footer */}
        <div className="bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <div>
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                 <Captions size={20} className="text-brand-600" />
                 Interactive Subtitles
              </h3>
              <p className="text-sm text-gray-500">Tap any word in the video to instantly see its meaning.</p>
           </div>
           <button 
             onClick={handleAction}
             className={`w-full md:w-auto px-6 py-3 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap ${
               mode === 'user' 
                 ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' 
                 : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-200'
             }`}
           >
             {customButtonText ? (
                 <>
                    {customButtonText} <CheckCircle2 size={18} />
                 </>
             ) : (
                mode === 'user' ? (
                    <>Complete Daily Challenge <CheckCircle2 size={18} /></>
                ) : (
                    <>Try Full Lesson <ChevronRight size={18} /></>
                )
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default VideoDemoModal;
