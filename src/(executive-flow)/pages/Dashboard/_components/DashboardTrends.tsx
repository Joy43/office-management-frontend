import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetTrendGraphQuery } from "@/redux/features/Executive/executiveDashboardApi";

export const DashboardTrends = () => {
  const { data, isLoading } = useGetTrendGraphQuery(undefined);

  if (isLoading)
    return (
      <div className="h-[400px] w-full animate-pulse bg-slate-50 rounded-xl border border-slate-100" />
    );

  return (
    <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
      <h3 className="text-2xl font-bold mb-8 text-slate-800">90 Days Trends</h3>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data?.dayWiseData || []}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#3b82f6", fontSize: 12 }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ef4444", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="csat.value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: "#3b82f6" }}
              name="CSAT"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="complaints.value"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4, fill: "#ef4444" }}
              name="Complaints"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
