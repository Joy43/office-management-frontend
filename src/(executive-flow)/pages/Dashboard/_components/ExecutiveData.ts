export const TrendsData = [
  { day: 'Day 1', csat: 30, complaints: 45 },
  { day: 'Day 2', csat: 28, complaints: 88 },
  { day: 'Day 3', csat: 95, complaints: 82 },
  { day: 'Day 4', csat: 10, complaints: 18 },
  { day: 'Day 5', csat: 48, complaints: 42 },
  { day: 'Day 6', csat: 38, complaints: 90 },
];

export interface BranchPerformance {
  id: string;
  name: string;
  domain: string;
  status: 'excellent' | 'warning' | 'critical';
  score: number;
  date: string;
  initial: string;
}

export const PerformanceData: BranchPerformance[] = [
  { id: '1', name: 'Softvence Delta', domain: 'softvence@e2e.com', status: 'excellent', score: 50, date: 'April 14, 2020', initial: 'A' },
  { id: '2', name: 'SparkTech Agency', domain: 'sparktech@e2e.com', status: 'warning', score: 50, date: 'April 14, 2020', initial: 'B' },
  { id: '3', name: 'Fire Ai', domain: 'fireai@e2e.com', status: 'critical', score: 50, date: 'April 14, 2020', initial: 'G' },
  { id: '4', name: 'JVAI', domain: 'jvai@e2e.com', status: 'excellent', score: 50, date: 'April 14, 2020', initial: 'G' },
];