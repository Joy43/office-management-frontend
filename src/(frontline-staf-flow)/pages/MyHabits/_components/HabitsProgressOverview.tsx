import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Play, Flame } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import HabitMetricCard from './HabitMetricCard';

interface MetricData {
  id: string;
  title: string;
  value: number;
  icon: LucideIcon;
}

const HabitsProgressOverview = () => {
  // Today's Progress Data 
  const todaysProgressData = {
    completed: 90,
    remaining: 10,
    habitsRemaining: 3
  };

  // Metric Cards Data - defined directly in component
  const metricsData: MetricData[] = [
    {
      id: 'completed',
      title: 'Completed',
      value: 5,
      icon: CheckCircle2
    },
    {
      id: 'total-habit',
      title: 'Total Habit',
      value: 8,
      icon: Play
    },
    {
      id: 'best-streak',
      title: 'Best Streak',
      value: 15,
      icon: Flame
    }
  ];

  const data = [
    { name: 'Completed', value: todaysProgressData.completed },
    { name: 'Remaining', value: todaysProgressData.remaining },
  ];

  // Vibrant pink for completed, light pastel pink for remaining
  const COLORS = ['#EC4899', '#FBCFE8'];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
        {/* Today's Progress Section - Left Side */}
        <div className="lg:col-span-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">
            {/* Chart - Left */}
            <div className="relative flex items-center justify-center shrink-0 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={52}
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
                <div className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-[#EC4899] leading-none">
                    {todaysProgressData.completed}%
                  </p>
                </div>
              </div>
            </div>

            {/* Content - Right */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Today's Progress</h3>
              <p className="text-xs sm:text-sm text-slate-500">{todaysProgressData.habitsRemaining} habits remaining</p>
            </div>
          </div>
        </div>

        {/* Metric Cards - Right Side */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {metricsData.map((metric) => (
            <HabitMetricCard
              key={metric.id}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitsProgressOverview;

