import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { CoachData } from './MyHabitsData';
import HabitItem from './HabitItem';

interface CoachSectionProps {
  coach: CoachData;
  completedHabits: Set<string>;
  onToggleHabit: (habitId: string) => void;
}

const CoachSection = ({ 
  coach, 
  completedHabits, 
  onToggleHabit
}: CoachSectionProps) => {
  const [showHabits, setShowHabits] = useState(true);
  
  // Calculate actual completed habits from state
  const coachCompletedHabits = coach.habits.filter(habit =>
    completedHabits.has(habit.id)
  ).length;
  const progressPercentage = (coachCompletedHabits / coach.totalHabits) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
      {/* Coach Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <img
            src={coach.avatar}
            alt={coach.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-slate-200 shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://randomuser.me/api/portraits/men/32.jpg`;
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 truncate">
              {coach.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {coachCompletedHabits} of {coach.totalHabits} habits completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Progress Bar */}
          <div className="w-24 sm:w-32 h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#EC4899] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-base sm:text-lg font-bold text-[#EC4899]">{Math.round(progressPercentage)}%</span>
          <button
            onClick={() => setShowHabits(!showHabits)}
            className="p-1 hover:bg-slate-100 rounded transition-colors shrink-0"
            aria-label={showHabits ? 'Hide habits' : 'Show habits'}
          >
            {showHabits ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Habits List */}
      {showHabits && (
        <div className="space-y-4">
          {coach.habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              isCompleted={completedHabits.has(habit.id)}
              onToggle={onToggleHabit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoachSection;

