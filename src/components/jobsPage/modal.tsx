const Modal = ({ isOpen, onClose, title, message, actionLabel, onAction }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600 mt-2">{message}</p>
                <div className="mt-6 flex flex-col gap-2">
                    <button 
                        onClick={onAction}
                        className="w-full bg-[#41A8F4] text-white py-3 rounded-xl font-bold hover:bg-[#2a96e8] transition-colors"
                    >
                        {actionLabel}
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full text-gray-500 py-2 text-sm font-medium hover:text-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Modal;