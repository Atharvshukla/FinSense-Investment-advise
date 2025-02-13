"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';

interface RegimeComparisonProps {
  data: {
    totalIncome: number;
    oldRegime: {
      taxableIncome: number;
      tax: number;
      effectiveRate: number;
    };
    newRegime: {
      taxableIncome: number;
      tax: number;
      effectiveRate: number;
    };
  };
}

export function RegimeComparison({ data }: RegimeComparisonProps) {
  const chartData = [
    { name: 'Take Home (Old)', value: data.totalIncome - data.oldRegime.tax },
    { name: 'Tax (Old)', value: data.oldRegime.tax },
    { name: 'Take Home (New)', value: data.totalIncome - data.newRegime.tax },
    { name: 'Tax (New)', value: data.newRegime.tax }
  ];

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))'
  ];

  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Old Regime Benefits</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Multiple tax saving deductions available</li>
            <li>Better for those with high investments</li>
            <li>Suitable for home loan borrowers</li>
            <li>HRA and other allowances exempt</li>
          </ul>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">New Regime Benefits</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Lower tax rates</li>
            <li>Simplified tax structure</li>
            <li>No need to maintain investment proofs</li>
            <li>Better for those with fewer investments</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}