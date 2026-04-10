/* eslint-disable @typescript-eslint/no-explicit-any */
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const TodaysProgress = ({ progressData }: { progressData: any }) => {
  const percentage = progressData?.percentage || 0;
  const habitsRemaining = progressData?.habitsRemaining || 0;

  const data = [
    { name: "Completed", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const COLORS = ["#EC4899", "#FBCFE8"];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 h-full">
      <div className="mb-4">
        <p className="text-sm text-slate-500 mb-2">
          {habitsRemaining} habits remaining
        </p>
        <h3 className="text-xl font-bold text-slate-900">Today's Progress</h3>
      </div>
      <div className="relative flex items-center justify-center min-h-[200px]">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-3xl font-bold text-[#EC4899]">{percentage}%</p>
        </div>
      </div>
    </div>
  );
};
export default TodaysProgress