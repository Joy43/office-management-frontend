import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HabitsSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const HabitsSearchBar = ({ search, onSearchChange }: HabitsSearchBarProps) => {
  return (
    <div className="mb-6">
      <div className="relative w-full bg-white rounded-lg border border-slate-200 shadow-sm p-5">
        <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search by Coach Name"
          className="pl-10 py-5 border-slate-200 max-w-[350px] "
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default HabitsSearchBar;

