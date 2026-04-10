import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Day 1', csat: 30, comp: 45 }, { name: 'Day 2', csat: 28, comp: 88 },
  { name: 'Day 3', csat: 95, comp: 82 }, { name: 'Day 4', csat: 10, comp: 18 },
  { name: 'Day 5', csat: 48, comp: 42 }, { name: 'Day 6', csat: 38, comp: 90 },
];

export const TrendsSection = () => (
  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
    <h3 className="text-2xl font-bold mb-8">Trends (Last 90 Days)</h3>
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
          <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#3b82f6', fontSize: 12}} />
          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#ef4444', fontSize: 12}} />
          <Tooltip />
          <Line yAxisId="left" type="monotone" dataKey="csat" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          <Line yAxisId="right" type="monotone" dataKey="comp" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);