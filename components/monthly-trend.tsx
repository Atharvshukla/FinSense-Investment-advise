"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthlyTrendProps {
  data: Array<{
    month: string;
    amount: number;
  }>;
}

export function MonthlyTrend({ data }: MonthlyTrendProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="hsl(var(--chart-2))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}