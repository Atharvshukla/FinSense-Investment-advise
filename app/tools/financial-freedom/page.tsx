"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { UserNav } from '@/components/user-nav';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Percent, Battery, Calendar } from 'lucide-react';

export default function FinancialFreedomPage() {
  const [currentAge, setCurrentAge] = useState(30);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(5000);
  const [monthlySavings, setMonthlySavings] = useState(2000);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [inflationRate, setInflationRate] = useState(2);
  const [safeWithdrawalRate, setSafeWithdrawalRate] = useState(4);

  const calculateFinancialFreedom = () => {
    const targetNetWorth = (monthlyExpenses * 12) / (safeWithdrawalRate / 100);
    const projections = [];
    let savings = currentSavings;
    let expenses = monthlyExpenses;
    let age = currentAge;

    while (savings < targetNetWorth && age < 100) {
      const annualReturn = savings * (expectedReturn / 100);
      const annualSavings = monthlySavings * 12;
      savings = savings + annualReturn + annualSavings;
      expenses = expenses * (1 + inflationRate / 100);
      
      projections.push({
        age,
        savings: Math.round(savings),
        expenses: Math.round(expenses * 12),
        target: Math.round((expenses * 12) / (safeWithdrawalRate / 100))
      });
      
      age++;
    }

    return projections;
  };

  const projections = calculateFinancialFreedom();
  const yearsToFreedom = projections.findIndex(p => p.savings >= p.target);
  const finalProjection = projections[yearsToFreedom !== -1 ? yearsToFreedom : projections.length - 1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Financial Freedom Calculator</h1>
            <p className="text-muted-foreground">
              Calculate your path to financial independence
            </p>
          </div>
          <UserNav />
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Your Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Current Age</label>
                <Input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Savings</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Monthly Expenses</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Monthly Savings</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={monthlySavings}
                    onChange={(e) => setMonthlySavings(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Expected Annual Return: {expectedReturn}%
                </label>
                <Slider
                  value={[expectedReturn]}
                  onValueChange={([value]) => setExpectedReturn(value)}
                  min={1}
                  max={12}
                  step={0.5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Inflation Rate: {inflationRate}%
                </label>
                <Slider
                  value={[inflationRate]}
                  onValueChange={([value]) => setInflationRate(value)}
                  min={0}
                  max={5}
                  step={0.5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Safe Withdrawal Rate: {safeWithdrawalRate}%
                </label>
                <Slider
                  value={[safeWithdrawalRate]}
                  onValueChange={([value]) => setSafeWithdrawalRate(value)}
                  min={2}
                  max={6}
                  step={0.1}
                />
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Battery className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Financial Freedom Status</h2>
                  <p className="text-3xl font-bold text-primary">
                    {yearsToFreedom !== -1 
                      ? `${yearsToFreedom} years to freedom`
                      : 'Goal not reached by age 100'}
                  </p>
                </div>
              </div>

              <div className="h-[400px]">
                <ResponsiveContainer>
                  <LineChart data={projections}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" label={{ value: 'Age', position: 'bottom' }} />
                    <YAxis
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                      label={{ value: 'Amount', angle: -90, position: 'left' }}
                    />
                    <Tooltip
                      formatter={(value) => `$${Number(value).toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke="hsl(var(--primary))"
                      name="Net Worth"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="hsl(var(--chart-2))"
                      name="Target"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Financial Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Target Net Worth:</span>
                  <span className="font-bold">
                    ${finalProjection.target.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Projected Net Worth:</span>
                  <span className="font-bold">
                    ${finalProjection.savings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Annual Expenses at Freedom:</span>
                  <span className="font-bold">
                    ${finalProjection.expenses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Freedom Age:</span>
                  <span className="font-bold">
                    {yearsToFreedom !== -1 ? currentAge + yearsToFreedom : 'N/A'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}