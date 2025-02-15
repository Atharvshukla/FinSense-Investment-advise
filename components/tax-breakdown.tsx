"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface TaxBreakdownProps {
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
    savings: {
      section80C: number;
      nps: number;
      homeLoanInterest: number;
      hra: number;
    };
  };
}

export function TaxBreakdown({ data }: TaxBreakdownProps) {
  const chartData = [
    {
      name: 'Total Income',
      amount: data.totalIncome
    },
    {
      name: 'Taxable Income (Old)',
      amount: data.oldRegime.taxableIncome
    },
    {
      name: 'Tax (Old)',
      amount: data.oldRegime.tax
    },
    {
      name: 'Taxable Income (New)',
      amount: data.newRegime.taxableIncome
    },
    {
      name: 'Tax (New)',
      amount: data.newRegime.tax
    }
  ];

  return (
    <div className="space-y-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="hsl(var(--chart-1))" />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-semibold mb-2">Old Regime</h4>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Taxable Income: ₹{data.oldRegime.taxableIncome.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Tax Amount: ₹{data.oldRegime.tax.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Effective Rate: {data.oldRegime.effectiveRate.toFixed(2)}%
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">New Regime</h4>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Taxable Income: ₹{data.newRegime.taxableIncome.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Tax Amount: ₹{data.newRegime.tax.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Effective Rate: {data.newRegime.effectiveRate.toFixed(2)}%
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}