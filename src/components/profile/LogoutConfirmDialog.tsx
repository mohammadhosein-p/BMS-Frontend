import React from 'react';

interface LogoutConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white w-[90%] max-w-sm rounded-2xl p-6 shadow-xl transform transition-all"
        dir="rtl"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </div>
          
          <h3 className="text-lg font-bold text-slate-800">خروج از حساب کاربری</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            آیا از حساب کاربری خود خارج می شوید؟
          </p>
        </div>


        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-sm shadow-red-200"
          >
            بله
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmDialog;
