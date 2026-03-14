import { HiOutlineTrash } from "react-icons/hi";

const categoryColors = {
  food: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  transport: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  hotel: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  shopping: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  tickets: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  other: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

const ExpenseTable = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return <p className="text-gray-400 dark:text-white/40 text-sm text-center py-4">No expenses recorded yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-white/10 text-left text-gray-500 dark:text-white/50">
            <th className="py-3 pr-4 font-medium">Title</th>
            <th className="py-3 pr-4 font-medium">Amount</th>
            <th className="py-3 pr-4 font-medium hidden sm:table-cell">Category</th>
            <th className="py-3 pr-4 font-medium hidden md:table-cell">Date</th>
            {onDelete && <th className="py-3 font-medium w-10"></th>}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition">
              <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{expense.title}</td>
              <td className="py-3 pr-4 text-gray-700 dark:text-white/70">₹{expense.amount.toLocaleString("en-IN")}</td>
              <td className="py-3 pr-4 hidden sm:table-cell">
                <span className={`text-xs px-2 py-0.5 rounded ${categoryColors[expense.category] || categoryColors.other}`}>
                  {expense.category}
                </span>
              </td>
              <td className="py-3 pr-4 text-gray-500 dark:text-white/40 hidden md:table-cell">
                {new Date(expense.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </td>
              {onDelete && (
                <td className="py-3">
                  <button onClick={() => onDelete(expense._id)} className="text-gray-400 hover:text-red-500 dark:text-white/30 dark:hover:text-red-400 transition p-1">
                    <HiOutlineTrash />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
