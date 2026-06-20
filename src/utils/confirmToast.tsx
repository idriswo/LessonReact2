import toast from 'react-hot-toast';

export const confirmToast = (message: string, onConfirm: () => void) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-sm w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl pointer-events-auto flex flex-col overflow-hidden border border-gray-100`}
    >
      <div className="p-5 flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 pt-1">
          <p className="text-[0.95rem] font-bold text-gray-800">
            Подтверждение
          </p>
          <p className="mt-1 text-sm text-gray-500 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50/50 px-5 py-3 border-t border-gray-100 flex gap-2 justify-end">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
        >
          Отмена
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
        >
          Удалить
        </button>
      </div>
    </div>
  ), { 
    duration: 8000, 
    position: 'top-center'
  });
};
