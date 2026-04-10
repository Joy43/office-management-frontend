export const RevenueChartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3500 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4800 },
  { name: 'May', revenue: 7000 },
  { name: 'Jun', revenue: 12500 },
  { name: 'Jul', revenue: 11000 },
  { name: 'Aug', revenue: 10500 },
  { name: 'Sep', revenue: 9000 },
  { name: 'Oct', revenue: 8000 },
  { name: 'Nov', revenue: 4000 },
  { name: 'Dec', revenue: 3000 },
];

export const SellingSourceData = [
  { name: 'Starter', value: 40, color: '#8C23CC' },
  { name: 'Enterprise', value: 27.5, color: '#FF0794' },
  { name: 'Growth', value: 32.5, color: '#E2E8F0' },
];

export interface Order {
  id: string;
  name: string;
  domain: string;
  email: string;
  plan: string;
  amount: string;
  date: string;
  initials: string;
  avatarBg: string;
}

export const OrderListData: Order[] = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  name: i % 2 === 0 ? "Acme Corp" : "Betopia Group",
  domain: i % 2 === 0 ? "domain@e2e.com" : "betopiagroup@e2e.com",
  email: "acmecorp@gmail.com",
  plan: i % 3 === 0 ? "Growth" : i % 3 === 1 ? "Enterprise" : "Starter",
  amount: "$67",
  date: "April 14, 2020",
  initials: i % 2 === 0 ? "A" : "B",
  avatarBg: i % 2 === 0 ? "bg-purple-100 text-purple-600" : "bg-pink-100 text-pink-600",
}));