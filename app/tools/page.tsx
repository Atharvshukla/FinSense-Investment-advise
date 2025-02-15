"use client";

import { Card } from '@/components/ui/card';
import { UserNav } from '@/components/user-nav';
import Link from 'next/link';
import {
  Calculator,
  Wallet,
  TrendingUp,
  Home,
  PiggyBank,
  Battery,
  BarChart3,
  CreditCard,
  LineChart,
  Building2,
  DollarSign,
  BookOpen
} from 'lucide-react';

const tools = [
  {
    title: "401k Retirement Calculator",
    description: "Plan your retirement with our 401k calculator to estimate your future savings.",
    icon: <PiggyBank className="w-6 h-6" />,
    category: "RETIREMENT",
    href: "/tools/401k-calculator"
  },
  {
    title: "Exchange Rate Calculator",
    description: "Convert currencies and track exchange rate trends in real-time.",
    icon: <DollarSign className="w-6 h-6" />,
    category: "OTHER",
    href: "/tools/exchange-calculator"
  },
  {
    title: "Inside Trading Tracker",
    description: "Monitor insider trading activities and gain valuable market insights.",
    icon: <LineChart className="w-6 h-6" />,
    category: "INVESTING",
    href: "/tools/insider-trading"
  },
  {
    title: "Home Affordability Calculator",
    description: "Calculate how much house you can afford based on your financial situation.",
    icon: <Home className="w-6 h-6" />,
    category: "INVESTING",
    href: "/tools/home-affordability"
  },
  {
    title: "Compound Interest Calculator",
    description: "See how your investments grow over time with compound interest.",
    icon: <TrendingUp className="w-6 h-6" />,
    category: "SAVINGS",
    href: "/tools/compound-interest"
  },
  {
    title: "Financial Freedom Calculator",
    description: "Calculate your path to financial independence.",
    icon: <Battery className="w-6 h-6" />,
    category: "RETIREMENT",
    href: "/tools/financial-freedom"
  },
  {
    title: "ROI Calculator",
    description: "Evaluate your investment returns and make informed decisions.",
    icon: <BarChart3 className="w-6 h-6" />,
    category: "INVESTING",
    href: "/tools/roi-calculator"
  },
  {
    title: "Loan Calculator",
    description: "Plan your loans and understand your repayment schedule.",
    icon: <CreditCard className="w-6 h-6" />,
    category: "DEBT",
    href: "/tools/loan-calculator"
  },
  {
    title: "Bogleheads 3-Fund Portfolio",
    description: "Analyze the performance of a three-fund portfolio strategy.",
    icon: <BookOpen className="w-6 h-6" />,
    category: "INVESTING",
    href: "/tools/bogleheads-calculator"
  },
  {
    title: "Early Mortgage Payoff Calculator",
    description: "Calculate savings from early mortgage payments.",
    icon: <Building2 className="w-6 h-6" />,
    category: "DEBT",
    href: "/tools/mortgage-payoff"
  },
  {
    title: "Inflation Calculator",
    description: "Understand the impact of inflation on your purchasing power.",
    icon: <Wallet className="w-6 h-6" />,
    category: "OTHER",
    href: "/tools/inflation-calculator"
  },
  {
    title: "Stock Portfolio Backtest",
    description: "Analyze historical performance of different portfolio combinations.",
    icon: <Calculator className="w-6 h-6" />,
    category: "INVESTING",
    href: "/tools/portfolio-backtest"
  }
];

const categories = ["INVESTING", "RETIREMENT", "SAVINGS", "DEBT", "OTHER"];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Financial Tools</h1>
            <p className="text-muted-foreground">
              Interactive calculators and tools to help you make informed financial decisions
            </p>
          </div>
          <UserNav />
        </header>

        <div className="space-y-8">
          {categories.map((category) => {
            const categoryTools = tools.filter(tool => tool.category === category);
            if (categoryTools.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTools.map((tool) => (
                    <Link href={tool.href} key={tool.title}>
                      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            {tool.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">{tool.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}