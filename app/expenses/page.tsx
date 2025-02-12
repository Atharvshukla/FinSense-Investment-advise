"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUp, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { ExpenseChart } from '@/components/expense-chart';
import { CategoryDistribution } from '@/components/category-distribution';
import { MonthlyTrend } from '@/components/monthly-trend';
import { AIInsights } from '@/components/ai-insights';
import { useToast } from '@/components/ui/use-toast';

export default function ExpensesPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expenseData, setExpenseData] = useState<any>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    
    setIsAnalyzing(true);
    
    try {
      // Here we would process the file and extract expense data
      // For now, using mock data
      const mockData = {
        totalExpenses: 4500,
        categories: {
          'Housing': 1500,
          'Food': 800,
          'Transportation': 400,
          'Entertainment': 300,
          'Utilities': 500,
          'Shopping': 600,
          'Healthcare': 400
        },
        monthlyTrend: [
          { month: 'Jan', amount: 4200 },
          { month: 'Feb', amount: 4500 },
          { month: 'Mar', amount: 4100 },
          { month: 'Apr', amount: 4800 },
          { month: 'May', amount: 4300 },
          { month: 'Jun', amount: 4500 }
        ],
        insights: [
          {
            type: 'warning',
            message: 'Your entertainment expenses increased by 25% compared to last month'
          },
          {
            type: 'success',
            message: 'Great job reducing your food expenses by 15%'
          },
          {
            type: 'info',
            message: 'Consider setting up an emergency fund with your savings'
          }
        ]
      };

      setExpenseData(mockData);
      toast({
        title: "Document Analysis Complete",
        description: "Your financial document has been successfully analyzed.",
      });
    } catch (error) {
      console.error('Error analyzing expense document:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Expense Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Upload your financial documents to get AI-powered insights and visualizations
        </p>
      </div>

      {!expenseData ? (
        <Card className="p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragActive ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <input {...getInputProps()} />
            <FileUp className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-semibold mb-4">
              {isDragActive ? 'Drop your document here' : 'Upload Your Financial Document'}
            </h2>
            <p className="text-muted-foreground mb-6">
              Drag and drop your PDF statement, CSV file, or Excel spreadsheet here, or click to browse
            </p>
            {isAnalyzing && (
              <div className="mt-4">
                <div className="animate-pulse flex space-x-4 justify-center items-center">
                  <div className="h-3 w-3 bg-primary rounded-full"></div>
                  <div className="h-3 w-3 bg-primary rounded-full"></div>
                  <div className="h-3 w-3 bg-primary rounded-full"></div>
                </div>
                <p className="mt-4 text-muted-foreground">Analyzing your document...</p>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <h3 className="text-2xl font-bold">${expenseData.totalExpenses.toLocaleString()}</h3>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <PieChart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <h3 className="text-2xl font-bold">
                    {Object.keys(expenseData.categories).length}
                  </h3>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Change</p>
                  <h3 className="text-2xl font-bold text-green-500">+5.2%</h3>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Expense Distribution</h3>
                  <ExpenseChart data={expenseData.categories} />
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Monthly Trend</h3>
                  <MonthlyTrend data={expenseData.monthlyTrend} />
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                <CategoryDistribution data={expenseData.categories} />
              </Card>
            </TabsContent>

            <TabsContent value="trends">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Expense Trends</h3>
                <MonthlyTrend data={expenseData.monthlyTrend} />
              </Card>
            </TabsContent>

            <TabsContent value="insights">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">AI-Powered Insights</h3>
                <AIInsights insights={expenseData.insights} />
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setExpenseData(null);
                toast({
                  title: "Reset Complete",
                  description: "You can now upload a new document for analysis.",
                });
              }}
            >
              Analyze Another Document
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}