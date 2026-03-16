import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const COLORS = {
  food: '#F59E0B',
  travel: '#6366F1',
  stay: '#10B981',
  activities: '#EC4899',
  other: '#9CA3AF'
}

const LABELS = {
  food: 'Food',
  travel: 'Travel',
  stay: 'Stay',
  activities: 'Activities',
  other: 'Other'
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111827] border border-[#1F2937]
                      rounded-xl px-4 py-2 shadow-lg">
        <p className="text-sm font-semibold text-white">
          {payload[0].name}
        </p>
        <p className="text-sm text-indigo-400">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

const BudgetChart = ({ expenses = [], totalBudget = 0 }) => {

  // Category wise total calculate karo
  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.category?.toLowerCase() || 'other'
    acc[category] = (acc[category] || 0) + Number(expense.amount)
    return acc
  }, {})

  const totalSpent = Object.values(categoryTotals)
    .reduce((sum, val) => sum + val, 0)

  const remaining = totalBudget - totalSpent
  const spentPercent = totalBudget > 0
    ? Math.min((totalSpent / totalBudget) * 100, 100)
    : 0

  const chartData = Object.entries(categoryTotals)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => ({
      name: LABELS[key] || key,
      value,
      color: COLORS[key] || COLORS.other
    }))

  const getBarColor = () => {
    if (spentPercent >= 80) return 'bg-red-500'
    if (spentPercent >= 60) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-[#111827]
                      border border-gray-200 dark:border-[#1F2937]
                      rounded-2xl p-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No expenses added yet
        </p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-600">
          Add expenses to see budget breakdown
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Total Budget */}
        <div className="bg-white dark:bg-[#111827]
                        border border-gray-200 dark:border-[#1F2937]
                        rounded-2xl p-5">
          <div className="flex items-center justify-center w-10 h-10 mb-3 bg-indigo-100 rounded-xl dark:bg-indigo-500/20">
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">₹</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalBudget.toLocaleString()}
          </p>
          <p className="text-xs font-medium uppercase
                        tracking-wide mt-0.5
                        text-gray-500 dark:text-gray-400">
            Total Budget
          </p>
        </div>

        {/* Total Spent */}
        <div className="bg-white dark:bg-[#111827]
                        border border-gray-200 dark:border-[#1F2937]
                        rounded-2xl p-5">
          <div className="flex items-center justify-center w-10 h-10 mb-3 rounded-xl bg-amber-100 dark:bg-amber-500/20">
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">₹</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{totalSpent.toLocaleString()}
          </p>
          <p className="text-xs font-medium uppercase
                        tracking-wide mt-0.5
                        text-gray-500 dark:text-gray-400">
            Total Spent
          </p>
        </div>

        {/* Remaining */}
        <div className="bg-white dark:bg-[#111827]
                        border border-gray-200 dark:border-[#1F2937]
                        rounded-2xl p-5">
          <div className={`w-10 h-10 rounded-xl
                          flex items-center justify-center mb-3
                          ${remaining >= 0
                            ? 'bg-emerald-100 dark:bg-emerald-500/20'
                            : 'bg-red-100 dark:bg-red-500/20'}`}>
            <span className={`text-sm font-bold
                             ${remaining >= 0
                               ? 'text-emerald-600 dark:text-emerald-400'
                               : 'text-red-600 dark:text-red-400'}`}>
              ₹
            </span>
          </div>
          <p className={`text-2xl font-bold
                        ${remaining >= 0
                          ? 'text-gray-900 dark:text-white'
                          : 'text-red-500'}`}>
            ₹{Math.abs(remaining).toLocaleString()}
          </p>
          <p className="text-xs font-medium uppercase
                        tracking-wide mt-0.5
                        text-gray-500 dark:text-gray-400">
            {remaining >= 0 ? 'Remaining' : 'Over Budget'}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-[#111827]
                      border border-gray-200 dark:border-[#1F2937]
                      rounded-2xl p-5">
        <div className="flex justify-between mb-3 text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Budget Used
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {spentPercent.toFixed(1)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full dark:bg-gray-700">
          <div
            className={`h-2 rounded-full 
                        transition-all duration-500
                        ${getBarColor()}`}
            style={{ width: `${spentPercent}%` }}
          />
        </div>
        {remaining < 0 && (
          <div className="flex items-center gap-2 p-3 mt-3 text-sm text-red-600 border border-red-200 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30 rounded-xl dark:text-red-400">
            Budget exceeded by ₹{Math.abs(remaining).toLocaleString()}
          </div>
        )}
      </div>

      {/* Donut Chart */}
      {chartData.length > 0 && (
        <div className="bg-white dark:bg-[#111827]
                        border border-gray-200 dark:border-[#1F2937]
                        rounded-2xl p-5">
          <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
            Spending by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category Breakdown */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <div
            key={category}
            className="bg-white dark:bg-[#111827]
                       border border-gray-200 dark:border-[#1F2937]
                       rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: COLORS[category] || COLORS.other
                }}
              />
              <span className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                {LABELS[category] || category}
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{amount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {totalSpent > 0
                ? ((amount / totalSpent) * 100).toFixed(1)
                : 0}% of spent
            </p>
            <div className="h-1 mt-2 bg-gray-100 rounded-full dark:bg-gray-700">
              <div
                className="h-1 rounded-full"
                style={{
                  width: `${totalSpent > 0
                    ? (amount / totalSpent) * 100
                    : 0}%`,
                  backgroundColor: COLORS[category] || COLORS.other
                }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default BudgetChart