"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { UserNav } from '@/components/user-nav';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Percent, Clock, TrendingUp } from 'lucide-react';

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSalary, setCurrentSalary] = useState(75000);
  const [currentBalance, setCurrentBalance] = useState(50000);
  const [contribution, setContribution] = useState(10);
  const [employerMatch, setEmployerMatch] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [salaryIncrease, setSalaryIncrease] = useState(2);

  const calculate401k = () => {
    const years = retirementAge - currentAge;
    const projections = [];
    let balance = currentBalance;
    let salary = currentSalary;

    for (let i = 0; i <= years; i++) {
      const employeeContribution = salary * (contribution / 100);
      const employerContribution = salary * Math.min(employerMatch / 100, contribution / 100);
      const totalContribution = employeeContribution + employerContribution;
      const returns = balance * (expectedReturn / 100);
      
      balance = balance + totalContribution + returns;
      salary = salary * (1 + salaryIncrease / 100);

      projections.push({
        age: currentAge + i,
        balance: Math.round(balance),
        contribution: Math.round(totalContribution),
        returns: Math.round(returns)
      });
    }

    return projections;
  };

  const projections = calculate401k();
  const finalBalance = projections[projections.length - 1].balance;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">401(k) Retirement Calculator</h1>
            <p className="text-muted-foreground">
              Plan your retirement with our 401k calculator to estimate your future savings
            </p>
          </div>
          <UserNav />
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Your Information</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Age</label>
                  <Input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Retirement Age</label>
                  <Input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Annual Salary</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current 401(k) Balance</label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    value={currentBalance}
                    onChange={(e) => setCurrentBalance(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Contribution: {contribution}%
                </label>
                <Slider
                  value={[contribution]}
                  onValueChange={([value]) => setContribution(value)}
                  min={0}
                  max={20}
                  step={0.5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Employer Match: {employerMatch}%
                </label>
                <Slider
                  value={[employerMatch]}
                  onValueChange={([value]) => setEmployerMatch(value)}
                  min={0}
                  max={10}
                  step={0.5}
                />
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
                  Annual Salary Increase: {salaryIncrease}%
                </label>
                <Slider
                  value={[salaryIncrease]}
                  onValueChange={([value]) => setSalaryIncrease(value)}
                  min={0}
                  max={5}
                  step={0.5}
                />
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">Projected 401(k) Balance</h2>
                  <p className="text-3xl font-bold text-primary">
                    ${finalBalance.toLocaleString()}
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
                      label={{ value: 'Balance', angle: -90, position: 'left' }}
                    />
                    <Tooltip
                      formatter={(value) => `$${Number(value).toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Retirement Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Years until retirement:</span>
                  <span className="font-bold">{retirementAge - currentAge} years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly contribution:</span>
                  <span className="font-bold">
                    ${Math.round((currentSalary * (contribution / 100)) / 12).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Monthly employer match:</span>
                  <span className="font-bold">
                    ${Math.round((currentSalary * (Math.min(employerMatch, contribution) / 100)) / 12).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total monthly investment:</span>
                  <span className="font-bold">
                    ${Math.round((currentSalary * ((contribution + Math.min(employerMatch, contribution)) / 100)) / 12).toLocaleString()}
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