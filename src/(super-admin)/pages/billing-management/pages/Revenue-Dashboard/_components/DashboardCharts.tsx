/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  useGetRevenueGraphQuery,
  useGetSellingSourceQuery,
} from "@/redux/features/admin/platformRevenueApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Area Chart component for Revenue
export const RevenueAreaChart = () => {
  const [filter, setFilter] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const { data: graphData, isLoading } = useGetRevenueGraphQuery({ filter });

  // API থেকে আসা ডাটা চার্টের ফরম্যাটে ম্যাপ করা
  const chartData = graphData?.data || [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Revenue Statistics
          </h3>
          <p className="text-sm text-slate-400">Total earnings over time</p>
        </div>
        <Select value={filter} onValueChange={(val: any) => setFilter(val)}>
          <SelectTrigger className="w-[120px] bg-slate-50 border-none outline-none focus:ring-0">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MONTHLY">Monthly</SelectItem>
            <SelectItem value="YEARLY">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 w-full">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center text-slate-400">
            Loading Chart...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8C23CC" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8C23CC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: any) => [`$${value}`, "Revenue"]}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#8C23CC"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

// Donut Chart component for Selling Source
export const SellingSourceDonut = () => {
  const [filter, setFilter] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const { data: sellingData, isLoading } = useGetSellingSourceQuery({ filter });

  // COLORS array based on your UI theme
  const COLORS = ["#8C23CC", "#A855F7", "#D8B4FE"];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-900">Selling Source</h3>
        <Select value={filter} onValueChange={(val: any) => setFilter(val)}>
          <SelectTrigger className="w-[100px] h-8 text-xs bg-slate-50 border-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MONTHLY">Monthly</SelectItem>
            <SelectItem value="YEARLY">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 relative">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            Loading...
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  // data={sellingData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="percentage"
                  nameKey="planName"
                >
                  {sellingData?.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text for Donut */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-xs text-slate-400 font-medium">Total</p>
              <p className="text-xl font-bold text-slate-900">100%</p>
            </div>
          </>
        )}
      </div>

      {/* Custom Legend */}
      <div className="mt-4 space-y-2">
        {sellingData?.map((item, index) => (
          <div
            key={item.planName}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-slate-500 font-medium">
                {item.planName}
              </span>
            </div>
            <span className="font-bold text-slate-700">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
