
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, CheckCircle2, XCircle, Volume2, Volume1, VolumeX, Award, ChevronDown, ChevronUp, Lock, RefreshCcw, Captions } from 'lucide-react';
import { Lesson } from '../types';

interface VideoLessonViewProps {
  lesson: Lesson | any;
  onBack: () => void;
  onComplete: () => void;
}

// Reuse the quiz data structure as the main content source
const getVocabularyTasks = () => [
  { 
    id: 1,
    word: "Resilient", 
    context: "To understand this deeply, we must be resilient in the face of adversity.",
    question: "Which situation best describes someone being 'Resilient'?", 
    options: ["Quitting immediately when things get hard", "Recovering quickly from a difficult situation", "Complaining loudly about problems"], 
    correct: 1 
  },
  { 
    id: 2,
    word: "Fatal", 
    context: "Failure is not fatal: it is the courage to continue that counts.",
    question: "What is the meaning of 'Fatal' in this context?", 
    options: ["Causing death or complete failure", "Full of happiness and joy", "Minor and unimportant"], 
    correct: 0 
  },
  { 
    id: 3,
    word: "Alleviate", 
    context: "Many people alleviate their stress by focusing on small goals.",
    question: "Select the synonym for 'Alleviate':", 
    options: ["To worsen", "To make easier or less severe", "To ignore completely"], 
    correct: 1 
  },
  { 
    id: 4,
    word: "Inevitably", 
    context: "Inevitably, you will face challenges.",
    question: "If something is 'Inevitable', it is:", 
    options: ["Certain to happen", "Rarely happening", "Avoidable"], 
    correct: 0 
  },
  { 
    id: 5,
    word: "Endeavor", 
    context: "Let's endeavor to make the most of every opportunity.",
    question: "To 'Endeavor' means to:", 
    options: ["Give up", "Try hard to achieve something", "Wait for luck"], 
    correct: 1 
  },
];

const VideoLessonView: React.FC<VideoLessonViewProps> = ({ lesson, onBack, onComplete }) => {
  const [videoStarted, setVideoStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  // Vocabulary Task State
  const [tasks] = useState(getVocabularyTasks());
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  const [completedTaskIds, setCompletedTaskIds] = useState<number[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState<number[]>([]);
  // NEW: Track specifically selected wrong options to style them red
  const [wrongOptionSelections, setWrongOptionSelections] = useState<{taskId: number, optionIndex: number}[]>([]);

  const videoDuration = 100; // Simulated duration units

  // Simulate Video Progress
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= videoDuration) {
            setIsPlaying(false);
            return videoDuration;
          }
          return prev + 0.2; // Slower progress for demo
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle auto-completion when all tasks are done
  useEffect(() => {
    if (completedTaskIds.length === tasks.length) {
      // Small delay to show the final checkmark before success screen
      setTimeout(() => {
         // Trigger success logic passed from parent or internal state if needed
      }, 1000);
    }
  }, [completedTaskIds, tasks.length]);

  const handlePlayClick = () => {
    if (!videoStarted) {
      setVideoStarted(true);
    }
    if (progress >= videoDuration) {
      setProgress(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) setIsMuted(false);
    if (newVol === 0) setIsMuted(true);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) setVolume(0.5);
    } else {
      setIsMuted(true);
    }
  };

  const toggleTaskExpansion = (id: number) => {
    if (completedTaskIds.includes(id)) return; // Don't expand completed tasks
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const handleAnswer = (taskId: number, optionIndex: number, correctIndex: number) => {
    if (optionIndex === correctIndex) {
      // Correct
      setCompletedTaskIds(prev => [...prev, taskId]);
      setExpandedTaskId(null); // Close card
      
      // Clear any wrong selections for this task since it's now done
      setWrongOptionSelections(prev => prev.filter(selection => selection.taskId !== taskId));

      // Auto expand next unfinished task
      const nextTask = tasks.find(t => t.id > taskId && !completedTaskIds.includes(t.id));
      if (nextTask) {
        setTimeout(() => setExpandedTaskId(nextTask.id), 500);
      }

    } else {
      // Wrong
      setWrongAttempts(prev => [...prev, taskId]); // Triggers card shake
      setWrongOptionSelections(prev => [...prev, { taskId, optionIndex }]); // Triggers button red style
      
      setTimeout(() => {
         setWrongAttempts(prev => prev.filter(id => id !== taskId));
      }, 1000);
    }
  };

  // Determine current subtitle based on progress
  const currentTaskIndex = Math.min(Math.floor((progress / videoDuration) * tasks.length), tasks.length - 1);
  const currentTask = tasks[currentTaskIndex];

  // Determine which Volume Icon to show
  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  // Helper to render subtitle text with highlighted clickable word
  const renderSubtitle = () => {
    if (!currentTask) return null;
    
    // Simple regex split to find the word (case insensitive)
    const parts = currentTask.context.split(new RegExp(`(${currentTask.word})`, 'gi'));
    
    return (
      <span>
        {parts.map((part, i) => {
           if (part.toLowerCase() === currentTask.word.toLowerCase()) {
             return (
               <span 
                 key={i}
                 onClick={(e) => {
                   e.stopPropagation();
                   setIsPlaying(false); // Pause video so user can focus
                   setExpandedTaskId(currentTask.id); // Expand the card
                 }}
                 className="text-brand-300 font-bold border-b-2 border-brand-400 cursor-pointer hover:text-brand-200 hover:bg-brand-900/50 rounded px-1 transition-colors"
               >
                 {part}
               </span>
             );
           }
           return part;
        })}
      </span>
    );
  };

  // Success View (All words mastered)
  if (completedTaskIds.length === tasks.length) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center animate-in fade-in duration-500">
        <div className="text-center p-8 max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-in zoom-in duration-500 delay-100">
            <Award size={48} strokeWidth={2} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Challenge Completed!</h2>
          <p className="text-gray-500 mb-8">You watched the video and mastered all 5 key words.</p>
          
          <button 
            onClick={onComplete}
            className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold shadow-xl shadow-brand-200 transition-all flex items-center justify-center gap-2"
          >
            Collect Progress & Return
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black lg:bg-gray-900 flex flex-col lg:flex-row h-full overflow-hidden animate-in slide-in-from-right duration-300">
      
      {/* 1. VIDEO AREA */}
      {/* Mobile: w-full aspect-video (top) */}
      {/* Desktop: flex-1 h-full (left), centered video */}
      <div className="relative w-full aspect-video lg:aspect-auto lg:flex-1 lg:h-full bg-black shrink-0 shadow-lg z-20 flex items-center justify-center group">
        
        {/* Back Button Overlay */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-30 pointer-events-none">
          <button onClick={onBack} className="pointer-events-auto text-white/90 hover:text-white flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full hover:bg-black/60 transition-colors shadow-sm">
            <ArrowLeft size={18} /> <span className="text-sm font-medium">Exit Lesson</span>
          </button>
        </div>

        {/* Video Container (Maintains aspect ratio on desktop center) */}
        <div className="w-full h-full lg:w-full lg:h-auto lg:max-h-full lg:aspect-video relative">
            <img 
            src={lesson?.thumbnail || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"} 
            alt="Video" 
            className={`w-full h-full object-cover transition-opacity duration-500 ${videoStarted ? 'opacity-80' : 'opacity-60'}`}
            />

            {/* Play Button Overlay (Center) */}
            <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={handlePlayClick}
            >
            {!isPlaying && (
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/40 group-hover:scale-110 transition-transform shadow-2xl">
                <Play size={36} fill="white" className="text-white ml-1.5" />
                </div>
            )}
            {!videoStarted && (
                <p className="absolute mt-28 text-white font-bold tracking-wide text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">Tap to Watch</p>
            )}
            </div>

            {/* Video Controls (Only if started) */}
            {videoStarted && (
                <div className="absolute bottom-0 left-0 w-full">
                    {/* Subtitles Overlay */}
                    <div className="absolute bottom-16 left-0 w-full px-8 text-center pointer-events-none">
                        <div className="inline-block bg-black/70 backdrop-blur-md px-6 py-3 rounded-xl text-lg md:text-xl text-white font-medium leading-relaxed shadow-lg pointer-events-auto animate-in slide-in-from-bottom-2 fade-in duration-300">
                           {renderSubtitle()}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/20 cursor-pointer group/progress">
                        <div 
                            className="h-full bg-brand-500 transition-all duration-100 ease-linear relative"
                            style={{ width: `${(progress / videoDuration) * 100}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-sm"></div>
                        </div>
                    </div>
                    {/* Simulated Controls Bar */}
                    <div className="bg-gradient-to-t from-black/80 to-transparent p-3 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <button onClick={handlePlayClick} className="text-white hover:text-brand-300">
                                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                            </button>
                            
                            {/* Volume Control */}
                            <div className="flex items-center gap-2 group/volume relative">
                                <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
                                    <VolumeIcon size={20} />
                                </button>
                                <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300 ease-out flex items-center">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="1" 
                                        step="0.1"
                                        value={isMuted ? 0 : volume}
                                        onChange={handleVolumeChange}
                                        className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
                                    />
                                </div>
                            </div>

                            <span className="text-xs font-mono text-white/80">
                                0:{Math.floor(progress).toString().padStart(2, '0')} / 0:50
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-white/90 bg-white/10 px-2 py-1 rounded text-xs">
                                <Captions size={14} /> 
                                <span className="font-bold">EN</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* 2. LIST AREA */}
      {/* Mobile: flex-1 (bottom) */}
      {/* Desktop: Fixed width sidebar (right) */}
      <div className="flex-1 lg:flex-none lg:w-[400px] xl:w-[450px] overflow-y-auto bg-gray-50 flex flex-col h-full border-l border-gray-200">
        <div className="p-6 pb-24 lg:pb-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                        Video Vocabulary
                    </h3>
                    <p className="text-sm text-gray-500">Master these 5 words to complete.</p>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm text-sm font-bold text-brand-700">
                    {completedTaskIds.length} / 5
                </div>
            </div>

            <div className="space-y-4">
                {tasks.map((task) => {
                    const isCompleted = completedTaskIds.includes(task.id);
                    const isExpanded = expandedTaskId === task.id;
                    const isWrong = wrongAttempts.includes(task.id);
                    const isCurrentContext = currentTaskIndex === tasks.indexOf(task) && isPlaying;

                    return (
                        <div 
                            key={task.id}
                            id={`task-${task.id}`}
                            className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden scroll-mt-4 ${
                                isCompleted 
                                    ? 'border-green-200 bg-green-50/30' 
                                    : isExpanded 
                                        ? 'border-brand-500 shadow-md ring-1 ring-brand-100' 
                                        : isCurrentContext
                                            ? 'border-brand-300 bg-brand-50/30'
                                            : 'border-gray-200 shadow-sm hover:border-brand-300'
                            } ${isWrong ? 'animate-shake border-red-300' : ''}`}
                        >
                            {/* Card Header (Always Visible) */}
                            <div 
                                onClick={() => toggleTaskExpansion(task.id)}
                                className="p-4 flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                                        isCompleted 
                                            ? 'bg-green-500 text-white' 
                                            : isCurrentContext 
                                                ? 'bg-brand-100 text-brand-600 ring-2 ring-brand-200'
                                                : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        {isCompleted ? <CheckCircle2 size={20} /> : <span className="font-bold text-sm">{task.id}</span>}
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-lg ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
                                            {task.word}
                                        </h4>
                                        {!isExpanded && !isCompleted && (
                                            <p className="text-xs text-gray-400">
                                                {isCurrentContext ? 'Now playing...' : 'Tap to take quiz'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="text-gray-400">
                                    {isCompleted ? null : isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </div>

                            {/* Expanded Content (Quiz) */}
                            {isExpanded && !isCompleted && (
                                <div className="px-4 pb-6 pt-0 animate-in slide-in-from-top-2">
                                    <div className="mb-4 p-3 bg-brand-50 rounded-lg border border-brand-100">
                                        <p className="text-sm text-gray-600 italic">"{task.context}"</p>
                                    </div>
                                    
                                    <h5 className="font-medium text-gray-800 mb-3 text-sm">{task.question}</h5>
                                    
                                    <div className="space-y-2">
                                        {task.options.map((option, idx) => {
                                            const isWrongSelection = wrongOptionSelections.some(w => w.taskId === task.id && w.optionIndex === idx);
                                            
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswer(task.id, idx, task.correct)}
                                                    className={`w-full text-left p-3 rounded-lg border transition-all text-sm font-medium flex justify-between items-center group
                                                        ${isWrongSelection 
                                                            ? 'border-red-300 bg-red-50 text-red-700' 
                                                            : 'border-gray-200 hover:border-brand-500 hover:bg-brand-50 text-gray-700'
                                                        }
                                                    `}
                                                >
                                                    {option}
                                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors
                                                        ${isWrongSelection ? 'border-red-400 bg-red-100' : 'border-gray-300 group-hover:border-brand-400'}
                                                    `}>
                                                        {isWrongSelection && <XCircle size={12} className="text-red-500" />}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Completed Footer */}
                            {isCompleted && (
                                <div className="px-4 py-2 bg-green-100/50 border-t border-green-100 flex items-center gap-2">
                                    <Award size={14} className="text-green-600" />
                                    <span className="text-xs font-bold text-green-700">Mastered</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            
            {!videoStarted && (
                <div className="mt-8 text-center p-4 rounded-xl border border-dashed border-gray-300 text-gray-400 bg-gray-50/50">
                    <p className="text-sm">Start the video to hear these words in context.</p>
                </div>
            )}
        </div>
      </div>

    </div>
  );
};

export default VideoLessonView;
