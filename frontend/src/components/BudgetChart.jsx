const BudgetChart = ({ totalBudget, totalSpent }) => {
  const percent = totalBudget > 0 ? Math.min((totalSpent / totalBudget) * 100, 100) : 0;
  const remaining = Math.max(totalBudget - totalSpent, 0);
  const isOver = totalSpent > totalBudget;

  let barColor = "bg-emerald-500";
  let textColor = "text-emerald-600 dark:text-emerald-400";
  let label = "On track";

  if (percent > 90) {
    barColor = "bg-red-500";
    textColor = "text-red-600 dark:text-red-400";
    label = isOver ? "Over budget!" : "Almost exceeded";
  } else if (percent > 60) {
    barColor = "bg-amber-500";
    textColor = "text-amber-600 dark:text-amber-400";
    label = "Watch spending";
  }

  return (
    <div className="card">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-white/60 mb-4 uppercase tracking-wider">Budget Overview</h3>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-white/40 mb-1">Budget</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">₹{totalBudget.toLocaleString("en-IN")}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-white/40 mb-1">Spent</p>
          <p className={`text-lg font-bold ${textColor}`}>₹{totalSpent.toLocaleString("en-IN")}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-white/40 mb-1">Remaining</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">₹{remaining.toLocaleString("en-IN")}</p>
        </div>
      </div>

      <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3 mb-2">
        <div className={`h-3 rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${percent}%` }} />
      </div>

      <div className="flex justify-between items-center">
        <span className={`text-xs font-medium ${textColor}`}>{label}</span>
        <span className="text-xs text-gray-400 dark:text-white/30">{percent.toFixed(0)}% used</span>
      </div>
    </div>
  );
};

export default BudgetChart;
