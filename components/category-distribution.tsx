"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoryDistributionProps {
  data: Record<string, number>;
}

export function CategoryDistribution({ data }: CategoryDistributionProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    amount: value
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="hsl(var(--chart-1))" />
      </BarChart>
    </ResponsiveContainer>
  );
}