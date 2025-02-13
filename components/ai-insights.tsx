"use client";

import { AlertTriangle, TrendingUp, CheckCircle, Info } from 'lucide-react';
import { PiggyBank } from "@/components/icons";
interface Insight {
  type: 'warning' | 'success' | 'info';
  message: string;
}

interface AIInsightsProps {
  insights: Insight[];
}

export function AIInsights({ insights }: AIInsightsProps) {
  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: Insight['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-950';
      case 'success':
        return 'bg-green-50 dark:bg-green-950';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-950';
    }
  };

  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg flex items-start gap-4 ${getBackgroundColor(insight.type)}`}
        >
          {getIcon(insight.type)}
          <p className="text-sm">{insight.message}</p>
        </div>
      ))}
    </div>
  );
}