"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, AlertCircle } from 'lucide-react';

const mockInsiderData = [
  { date: '2024-01', transactions: 15, value: 2500000, sentiment: 'positive' },
  { date: '2024-02', transactions: 8, value: 1200000, sentiment: 'negative' },
  { date: '2024-03', transactions: 12, value: 1800000, sentiment: 'positive' },
  { date: '2024-04', transactions: 20, value: 3200000, sentiment: 'positive' },
  { date: '2024-05', transactions: 5, value: 900000, sentiment: 'negative' },
];

export default function InsiderTradingPage() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(mockInsiderData);

  const handleSearch = () => {
    // In a real implementation, this would fetch actual insider trading data
    console.log('Searching for:', symbol);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Insider Trading Tracker</h1>
            <p className="text-muted-foreground">
              Monitor insider trading patterns and gain valuable market insights
            </p>
          </div>
          <UserNav />
        </header>

        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Enter stock symbol (e.g., AAPL)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="max-w-xs"
              />
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    name="Transaction Value ($)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="transactions"
                    stroke="hsl(var(--chart-2))"
                    name="Number of Transactions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              <div className="space-y-4">
                {data.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                    <div className={`p-2 rounded-full ${
                      item.sentiment === 'positive' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <AlertCircle className={`w-4 h-4 ${
                        item.sentiment === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium">{item.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.transactions} transactions worth ${item.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Market Insights</h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Insider Sentiment</h3>
                  <p className="text-sm text-muted-foreground">
                    Recent insider trading activity shows a bullish trend with increased buying activity
                    over the past month.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Transaction Patterns</h3>
                  <p className="text-sm text-muted-foreground">
                    Large purchases by multiple executives suggest strong confidence in the company&apos;s
                    future performance.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Historical Context</h3>
                  <p className="text-sm text-muted-foreground">
                    Current insider trading volume is 25% higher than the 6-month average, indicating
                    increased insider activity.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}