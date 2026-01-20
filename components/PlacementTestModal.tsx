
import React, { useState } from 'react';
import { X, Check, ChevronRight, Award, Loader2, BookA } from 'lucide-react';

interface PlacementTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (level: string) => void;
}

type Step = 'intro' | 'question' | 'analyzing' | 'result';

const questions = [
  {
    id: 1,
    targetWord: "Journey",
    level: "A2",
    options: ["A long trip from one place to another", "To cook food in an oven", "A very loud noise", "Writing on paper"],
    correct: 0
  },
  {
    id: 2,
    targetWord: "Reluctant",
    level: "B1",
    options: ["Eager and excited", "Unwilling and hesitant", "Fast and efficient", "Smooth and shiny"],
    correct: 1
  },
  {
    id: 3,
    targetWord: "Precise",
    level: "B2",
    options: ["Vague or unclear", "Large in size", "Exact and accurate", "Expensive to buy"],
    correct: 2
  },
  {
    id: 4,
    targetWord: "Inevitably",
    level: "C1",
    options: ["By pure luck", "Certain to happen", "Rarely occurring", "With great difficulty"],
    correct: 1
  }
];

const PlacementTestModal: React.FC<PlacementTestModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState<Step>('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const handleStart = () => setStep('question');

  const handleAnswer = (optionIndex: number) => {
    const isCorrect = optionIndex === questions[currentQIndex].correct;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setStep('analyzing');
      // Calculate result based on score logic
      setTimeout(() => setStep('result'), 1500);
    }
  };

  const getCalculatedLevel = () => {
    // Simple logic: 
    // 0-1 correct -> A2
    // 2 correct -> B1
    // 3 correct -> B2
    // 4 correct -> C1
    if (score <= 1) return "A2 (Elementary)";
    if (score === 2) return "B1 (Intermediate)";
    if (score === 3) return "B2 (Upper Intermediate)";
    return "C1 (Advanced)";
  };

  const finalLevel = getCalculatedLevel();

  const handleFinish = () => {
    onComplete(finalLevel);
  };

  const reset = () => {
    setStep('intro');
    setCurrentQIndex(0);
    setAnswers([]);
    setScore(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={reset}></div>

      {/* Modal Content */}
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800">
            {step === 'result' ? 'Proficiency Report' : 'Vocabulary Check'}
          </h3>
          <button onClick={reset} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 overflow-y-auto">
          
          {/* STEP 1: INTRO */}
          {step === 'intro' && (
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-600">
                <BookA size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Vocabulary Level Test</h2>
              <p className="text-gray-600 mb-8">
                We'll show you a series of English words. Simply select the correct meaning for each word to determine your CEFR level.
              </p>
              <button 
                onClick={handleStart}
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-brand-200"
              >
                Start Vocabulary Test
              </button>
              <p className="text-xs text-gray-400 mt-4">Takes about 1 minute</p>
            </div>
          )}

          {/* STEP 2: QUESTIONS */}
          {step === 'question' && (
            <div>
              <div className="mb-6 flex justify-between items-center text-sm font-medium text-gray-500">
                <span>Word {currentQIndex + 1} of {questions.length}</span>
                <span className="text-brand-600">{Math.round(((currentQIndex) / questions.length) * 100)}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
                <div 
                  className="bg-brand-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">What is the meaning of:</p>
                <div className="inline-block px-8 py-4 bg-gray-900 text-white text-3xl font-bold rounded-2xl shadow-md">
                   {questions[currentQIndex].targetWord}
                </div>
              </div>

              <div className="space-y-3">
                {questions[currentQIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left px-5 py-4 rounded-xl border border-gray-200 hover:border-brand-500 hover:bg-brand-50 transition-all font-medium text-gray-700 group flex justify-between items-center"
                  >
                    {option}
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-brand-500 flex items-center justify-center">
                       <div className="w-2.5 h-2.5 rounded-full bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: ANALYZING */}
          {step === 'analyzing' && (
            <div className="text-center py-10">
              <Loader2 size={48} className="animate-spin text-brand-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Evaluating Vocabulary...</h3>
              <p className="text-gray-500">Matching your results to CEFR standards.</p>
            </div>
          )}

          {/* STEP 4: REVEAL RESULT */}
          {step === 'result' && (
            <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
               <div className="inline-block p-3 rounded-full bg-green-100 text-green-600 mb-4 ring-8 ring-green-50">
                  <Award size={32} strokeWidth={2} />
               </div>
               <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Level: {finalLevel.split(' ')[0]}</h2>
               <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                 Based on your vocabulary, you fit into the <strong>{finalLevel}</strong> category. We have tailored the course for you.
               </p>

               <div className="bg-brand-50 rounded-xl p-5 mb-8 text-left border border-brand-100">
                  <h4 className="font-bold text-brand-800 mb-2 text-sm uppercase tracking-wide">Your Personalized Plan</h4>
                  <ul className="space-y-3 text-sm text-brand-900">
                    <li className="flex items-start gap-2">
                        <Check size={16} className="mt-0.5 text-brand-600" /> 
                        <span>Learn 5 new {finalLevel.split(' ')[0]} words daily</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <Check size={16} className="mt-0.5 text-brand-600" /> 
                        <span>Read short stories adapted to your level</span>
                    </li>
                  </ul>
               </div>

               <button 
                onClick={handleFinish}
                className="w-full py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
               >
                 Start {finalLevel.split(' ')[0]} Course <ChevronRight size={18} />
               </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PlacementTestModal;
