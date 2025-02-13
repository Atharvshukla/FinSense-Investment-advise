"use client";

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { PiggyBank } from "@/components/icons";

interface TaxSavingSuggestionsProps {
  data: {
    savings: {
      section80C: number;
      nps: number;
      homeLoanInterest: number;
      hra: number;
    };
  };
}

export function TaxSavingSuggestions({ data }: TaxSavingSuggestionsProps) {
  const section80CLimit = 150000;
  const npsLimit = 50000;
  const homeLoanLimit = 200000;

  const section80CProgress = (data.savings.section80C / section80CLimit) * 100;
  const npsProgress = (data.savings.nps / npsLimit) * 100;
  const homeLoanProgress = (data.savings.homeLoanInterest / homeLoanLimit) * 100;

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Section 80C Utilization</h4>
              <Progress value={section80CProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                You've utilized ₹{data.savings.section80C.toLocaleString()} out of ₹{section80CLimit.toLocaleString()}
              </p>
              {section80CProgress < 100 && (
                <p className="text-sm mt-2 text-yellow-600 dark:text-yellow-400">
                  You can save up to ₹{(section80CLimit - data.savings.section80C).toLocaleString()} more under 80C
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">NPS Investment</h4>
              <Progress value={npsProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                You've invested ₹{data.savings.nps.toLocaleString()} in NPS
              </p>
              {npsProgress < 100 && (
                <p className="text-sm mt-2 text-green-600 dark:text-green-400">
                  Additional NPS investment can save more tax
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Home Loan Interest</h4>
              <Progress value={homeLoanProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Home loan interest deduction: ₹{data.savings.homeLoanInterest.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h4 className="font-semibold mb-4">Optimization Suggestions</h4>
        <ul className="space-y-3">
          {section80CProgress < 100 && (
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-1" />
              <p className="text-sm">Consider maxing out your 80C limit through ELSS funds or PPF investment</p>
            </li>
          )}
          {npsProgress < 100 && (
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-1" />
              <p className="text-sm">Increase NPS contribution for additional tax benefits under Section 80CCD(1B)</p>
            </li>
          )}
          <li className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
            <p className="text-sm">Consider health insurance for parents for additional deduction under Section 80D</p>
          </li>
        </ul>
      </Card>
    </div>
  );
}