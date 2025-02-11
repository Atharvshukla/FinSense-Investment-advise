"use client";

import { useState } from 'react';
import { analyzeInvestmentStrategy } from '@/lib/gemini';
import { storeInvestmentStrategy } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LineChart, TrendingUp, PieChart } from 'lucide-react';

export default function InvestmentPage() {
  const [userProfile, setUserProfile] = useState({
    riskTolerance: 'moderate',
    investmentHorizon: '5-10 years',
    currentPortfolio: '',
    financialGoals: ''
  });
  const [strategy, setStrategy] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const investmentStrategy = await analyzeInvestmentStrategy(userProfile);
      setStrategy(investmentStrategy);
      await storeInvestmentStrategy({
        profile: userProfile,
        strategy: investmentStrategy,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error generating investment strategy:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">FinSense AI Investment Advisor</h1>
        <p className="text-muted-foreground">Get personalized investment strategies powered by AI</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Risk Tolerance</label>
                <Select
                  value={userProfile.riskTolerance}
                  onValueChange={(value) => setUserProfile({ ...userProfile, riskTolerance: value })}
                >
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Investment Horizon</label>
                <Select
                  value={userProfile.investmentHorizon}
                  onValueChange={(value) => setUserProfile({ ...userProfile, investmentHorizon: value })}
                >
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Portfolio</label>
                <Textarea
                  value={userProfile.currentPortfolio}
                  onChange={(e) => setUserProfile({ ...userProfile, currentPortfolio: e.target.value })}
                  placeholder="Describe your current investments..."
                  className="h-24"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Financial Goals</label>
                <Textarea
                  value={userProfile.financialGoals}
                  onChange={(e) => setUserProfile({ ...userProfile, financialGoals: e.target.value })}
                  placeholder="What are your financial goals?"
                  className="h-24"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Analyzing...' : 'Generate Investment Strategy'}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-semibold">Your Investment Strategy</h2>
          </div>
          
          {strategy ? (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap">{strategy}</div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <PieChart className="w-12 h-12 mx-auto mb-4" />
              <p>Fill out the form to get your personalized investment strategy</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}