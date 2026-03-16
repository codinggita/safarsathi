const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Are you sure?',
  description = 'This action cannot be undone'
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm
                      bg-white dark:bg-[#111827]
                      border border-gray-200
                      dark:border-[#1F2937]
                      rounded-2xl p-6 shadow-xl">

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100
                       dark:bg-[#1F2937]
                       text-gray-700 dark:text-gray-300
                       font-medium py-2.5 rounded-xl
                       hover:bg-gray-200
                       dark:hover:bg-[#374151]
                       transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500
                       hover:bg-red-600
                       text-white font-medium
                       py-2.5 rounded-xl
                       transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal