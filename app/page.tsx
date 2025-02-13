import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart, Calculator, TrendingUp, PieChart } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">FinSense AI</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent financial advisor powered by AI. Get personalized investment strategies, calculate taxes, and track expenses in real-time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Investment Strategy</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Get AI-powered investment recommendations based on your risk tolerance and financial goals.
            </p>
            <Link href="/investment">
              <Button className="w-full">Get Started</Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Tax Calculator</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Calculate your taxes under both regimes with AI-powered optimization suggestions.
            </p>
            <Link href="/taxation">
              <Button className="w-full">Calculate Taxes</Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BarChart className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Expense Tracking</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Track and analyze your expenses in real-time with AI-powered insights.
            </p>
            <Link href="/expenses">
              <Button className="w-full">Track Expenses</Button>
            </Link>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Choose FinSense AI?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <PieChart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
              <p className="text-muted-foreground">
                Advanced AI algorithms analyze your financial data for optimal recommendations.
              </p>
            </div>
            <div>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Get instant insights and updates about your financial portfolio.
              </p>
            </div>
            <div>
              <Calculator className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Tax Optimization</h3>
              <p className="text-muted-foreground">
                Get personalized tax saving recommendations and regime comparison.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}