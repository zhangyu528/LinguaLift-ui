
import React from 'react';
import { LogOut, X } from 'lucide-react';

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SignOutModal: React.FC<SignOutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <LogOut size={32} strokeWidth={2} className="ml-1" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Sign Out?</h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Are you sure you want to end your session? Your daily progress has been saved.
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={onConfirm}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-100"
            >
              Yes, Sign Out
            </button>
            <button 
              onClick={onClose}
              className="w-full py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl font-bold transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
