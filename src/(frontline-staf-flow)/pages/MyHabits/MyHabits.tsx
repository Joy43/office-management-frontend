import { useState, useMemo } from 'react';
import HabitsProgressOverview from './_components/HabitsProgressOverview';
import HabitsSearchBar from './_components/HabitsSearchBar';
import CoachSection from './_components/CoachSection';
import ScrollToTopButton from './_components/ScrollToTopButton';
import { coachesData } from './_components/MyHabitsData';

const FrontLineMyHabits = () => {
  const [search, setSearch] = useState('');
  const [completedHabits, setCompletedHabits] = useState<Set<string>>(new Set(['1', '4', '7']));

  // Filter coaches based on search
  const filteredCoaches = useMemo(() => {
    if (!search) return coachesData;
    return coachesData.filter(coach =>
      coach.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const toggleHabit = (habitId: string) => {
    setCompletedHabits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(habitId)) {
        newSet.delete(habitId);
      } else {
        newSet.add(habitId);
      }
      return newSet;
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50 pb-24">
      {/* Top Section - Progress Overview */}
      <HabitsProgressOverview />

      {/* Search Bar Section */}
      <HabitsSearchBar search={search} onSearchChange={setSearch} />

      {/* Assigned by Coaches Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Assigned by Coaches</h2>
          <span className="text-sm sm:text-base text-slate-600 font-semibold">{filteredCoaches.length} coaches</span>
        </div>

        {/* Coach Sections */}
        <div className="space-y-6">
          {filteredCoaches.map((coach) => (
            <CoachSection
              key={coach.id}
              coach={coach}
              completedHabits={completedHabits}
              onToggleHabit={toggleHabit}
            />
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default FrontLineMyHabits;
