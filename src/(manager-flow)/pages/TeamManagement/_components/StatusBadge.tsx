// Save as: _components/StatusBadge.tsx
interface StatusBadgeProps {
  status: "Great" | "Needs" | "Bad";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = {
    Great: { color: "bg-emerald-500", text: "Great" },
    Needs: { color: "bg-amber-500", text: "Needs" },
    Bad: { color: "bg-red-500", text: "Bad" },
  };

  const { color, text } = config[status];

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3.5 h-3.5 rounded-full ${color}`} />
      <span className="font-bold text-slate-800">{text}</span>
    </div>
  );
};

export default StatusBadge;