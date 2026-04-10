import { Check, Clock, Trophy } from 'lucide-react';
import type { HabitData } from './MyHabitsData';

interface HabitItemProps {
  habit: HabitData;
  isCompleted: boolean;
  onToggle: (habitId: string) => void;
}

const HabitItem = ({ habit, isCompleted, onToggle }: HabitItemProps) => {
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        isCompleted
          ? 'bg-purple-50 border-purple-200'
          : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={() => {
            onToggle(habit.id);
          }}
          className={`mt-1 w-5 h-5 rounded-sm border-2 flex items-center justify-center transition-all ${
            isCompleted
              ? 'bg-[#8C23CC] border-[#8C23CC]'
              : 'bg-white border-slate-300'
          }`}
        >
          {isCompleted && (
            <Check className="w-4 h-4 text-white" />
          )}
        </button>

        {/* Habit Content */}
        <div className="flex-1">
          <h4 className={`font-semibold text-slate-900 mb-1 ${isCompleted ? 'line-through' : ''}`}>
            {habit.name}
          </h4>
          <p className="text-sm text-slate-600 mb-2">
            {habit.description}
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>{habit.frequency}</span>
          </div>
        </div>

        {/* Trophy Icon - Only show for completed habits */}
        {isCompleted && (
          <div className="mt-1">
            <Trophy className="w-5 h-5 text-[#8C23CC]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitItem;

