"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BarChart, Calculator, TrendingUp, PieChart, Wallet } from 'lucide-react';
import { UserNav } from '@/components/user-nav';
import { motion } from "framer-motion";
import { FloatingChartCanvas } from '@/components/3d-models/floating-chart';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary transition-colors duration-500">
      <header className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            FinSense AI
          </motion.h1>
          <UserNav />
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-6">FinSense AI</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent financial advisor powered by AI. Get personalized investment strategies, 
            calculate taxes, track expenses, and access powerful financial tools.
          </p>
        </motion.div>

        <div className="relative mb-16">
          <FloatingChartCanvas />
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {[
            {
              icon: <TrendingUp />,
              title: "Investment Strategy",
              description: "Get AI-powered investment recommendations based on your risk tolerance and financial goals.",
              href: "/investment"
            },
            {
              icon: <Calculator />,
              title: "Tax Calculator",
              description: "Calculate your taxes under both regimes with AI-powered optimization suggestions.",
              href: "/taxation"
            },
            {
              icon: <BarChart />,
              title: "Expense Tracking",
              description: "Track and analyze your expenses in real-time with AI-powered insights.",
              href: "/expenses"
            },
            {
              icon: <Wallet />,
              title: "Financial Tools",
              description: "Access a comprehensive suite of calculators and tools for smarter financial planning.",
              href: "/tools"
            }
          ].map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Link href={feature.href}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      {feature.icon}
                    </div>
                    <h2 className="text-2xl font-semibold">{feature.title}</h2>
                  </div>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose FinSense AI?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              {
                icon: <PieChart />,
                title: "Smart Analysis",
                description: "Advanced AI algorithms analyze your financial data for optimal recommendations."
              },
              {
                icon: <TrendingUp />,
                title: "Real-time Updates",
                description: "Get instant insights and updates about your financial portfolio."
              },
              {
                icon: <Calculator />,
                title: "Comprehensive Tools",
                description: "Access a wide range of financial calculators and planning tools."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}