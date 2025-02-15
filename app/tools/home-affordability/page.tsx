"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { UserNav } from '@/components/user-nav';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DollarSign, Percent, Clock, Home } from 'lucide-react';

export default function HomeAffordabilityPage() {
  const [income, setIncome] = useState(100000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyDebts, setMonthlyDebts] = useState(500);

  const calculateAffordability = () => {
    // Monthly income
    const monthlyIncome = income / 12;
    
    // Maximum monthly payment (using 28% rule)
    const maxMonthlyPayment = monthlyIncome * 0.28;
    
    // Monthly debt-to-income ratio (using 36% rule)
    const maxTotalMonthlyDebt = monthlyIncome * 0.36;
    const availableForMortgage = maxTotalMonthlyDebt - monthlyDebts;
    
    // Use the lower of the two values
    const maxPayment = Math.min(maxMonthlyPayment, availableForMortgage);
    
    // Calculate maximum loan amount
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;
    const maxLoanAmount = maxPayment * ((1 - Math.pow(1 + monthlyRate, -numPayments)) / monthlyRate);
    
    // Maximum house price
    const maxPrice = maxLoanAmount + downPayment;
    
    return {
      maxPrice: Math.round(maxPrice),
      maxPayment: Math.round(maxPayment),
      breakdown: [
        { name: 'Principal & Interest', value: maxPayment * 0.8 },
        { name: 'Property Tax', value: maxPayment * 0.1 },
        { name: 'Insurance', value: maxPayment * 0.05 },
        { name: 'PMI', value: maxPayment * 0.05 }
      ]
    };
  };

  const result = calculateAffordability();
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Home Affordability Calculator</h1>
            <p className="text-muted-foreground">
              Calculate how much house you can afford based on your income and expenses
            </p>
          </div>
          <UserNav />
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Input Your Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Annual Income</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Down Payment</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Interest Rate: {interestRate}%
                </label>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-muted-foreground" />
                  <Slider
                    value={[interestRate]}
                    onValueChange={([value]) => setInterestRate(value)}
                    min={2}
                    max={10}
                    step={0.1}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Loan Term: {loanTerm} years
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <Slider
                    value={[loanTerm]}
                    onValueChange={([value]) => setLoanTerm(value)}
                    min={15}
                    max={30}
                    step={5}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Monthly Debts</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={monthlyDebts}
                    onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Maximum House Price</h2>
                  <p className="text-3xl font-bold text-primary">
                    ${result.maxPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={result.breakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {result.breakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Monthly Payment Breakdown</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Estimated Monthly Payment:</span>
                  <span className="font-bold">${result.maxPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Principal & Interest:</span>
                  <span>${Math.round(result.maxPayment * 0.8).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Property Tax:</span>
                  <span>${Math.round(result.maxPayment * 0.1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Insurance:</span>
                  <span>${Math.round(result.maxPayment * 0.05).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>PMI:</span>
                  <span>${Math.round(result.maxPayment * 0.05).toLocaleString()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}