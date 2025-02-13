"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { TaxBreakdown } from '@/components/tax-breakdown';
import { RegimeComparison } from '@/components/regime-comparison';
import { TaxSavingSuggestions } from '@/components/tax-saving-suggestions';
import { Calculator, ArrowRight, Coins, PiggyBank } from 'lucide-react';

interface TaxDetails {
  basicSalary: number;
  hra: number;
  lta: number;
  otherAllowances: number;
  professionalTax: number;
  epfContribution: number;
  elss: number;
  ppf: number;
  nps: number;
  homeLoanInterest: number;
  rentPaid: number;
  cityType: 'metro' | 'non-metro';
}

export default function TaxationPage() {
  const { toast } = useToast();
  const [taxDetails, setTaxDetails] = useState<TaxDetails>({
    basicSalary: 0,
    hra: 0,
    lta: 0,
    otherAllowances: 0,
    professionalTax: 0,
    epfContribution: 0,
    elss: 0,
    ppf: 0,
    nps: 0,
    homeLoanInterest: 0,
    rentPaid: 0,
    cityType: 'metro'
  });

  const [calculatedTax, setCalculatedTax] = useState<any>(null);

  const calculateTax = () => {
    // This is a simplified calculation for demonstration
    const totalIncome = taxDetails.basicSalary + taxDetails.hra + taxDetails.lta + taxDetails.otherAllowances;
    
    // Old Regime Calculation (with exemptions)
    const oldRegimeDeductions = 
      taxDetails.epfContribution + 
      taxDetails.elss + 
      taxDetails.ppf + 
      taxDetails.nps + 
      taxDetails.homeLoanInterest + 
      Math.min(taxDetails.rentPaid * 0.5, taxDetails.basicSalary * 0.4); // HRA exemption

    const oldRegimeTaxableIncome = Math.max(totalIncome - oldRegimeDeductions, 0);
    const oldRegimeTax = calculateOldRegimeTax(oldRegimeTaxableIncome);

    // New Regime Calculation (without exemptions)
    const newRegimeTax = calculateNewRegimeTax(totalIncome);

    setCalculatedTax({
      totalIncome,
      oldRegime: {
        taxableIncome: oldRegimeTaxableIncome,
        tax: oldRegimeTax,
        effectiveRate: (oldRegimeTax / totalIncome) * 100
      },
      newRegime: {
        taxableIncome: totalIncome,
        tax: newRegimeTax,
        effectiveRate: (newRegimeTax / totalIncome) * 100
      },
      savings: {
        section80C: Math.min(taxDetails.epfContribution + taxDetails.elss + taxDetails.ppf, 150000),
        nps: Math.min(taxDetails.nps, 50000),
        homeLoanInterest: Math.min(taxDetails.homeLoanInterest, 200000),
        hra: Math.min(taxDetails.rentPaid * 0.5, taxDetails.basicSalary * 0.4)
      }
    });

    toast({
      title: "Tax Calculation Complete",
      description: "Your tax analysis is ready for review.",
    });
  };

  const calculateOldRegimeTax = (income: number) => {
    let tax = 0;
    if (income > 1500000) {
      tax += (income - 1500000) * 0.3;
      income = 1500000;
    }
    if (income > 1250000) {
      tax += (income - 1250000) * 0.25;
      income = 1250000;
    }
    if (income > 1000000) {
      tax += (income - 1000000) * 0.20;
      income = 1000000;
    }
    if (income > 750000) {
      tax += (income - 750000) * 0.15;
      income = 750000;
    }
    if (income > 500000) {
      tax += (income - 500000) * 0.10;
      income = 500000;
    }
    if (income > 250000) {
      tax += (income - 250000) * 0.05;
    }
    return tax;
  };

  const calculateNewRegimeTax = (income: number) => {
    let tax = 0;
    if (income > 1500000) {
      tax += (income - 1500000) * 0.3;
      income = 1500000;
    }
    if (income > 1250000) {
      tax += (income - 1250000) * 0.25;
      income = 1250000;
    }
    if (income > 1000000) {
      tax += (income - 1000000) * 0.20;
      income = 1000000;
    }
    if (income > 750000) {
      tax += (income - 750000) * 0.15;
      income = 750000;
    }
    if (income > 500000) {
      tax += (income - 500000) * 0.10;
      income = 500000;
    }
    if (income > 300000) {
      tax += (income - 300000) * 0.05;
    }
    return tax;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Indian Tax Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your taxes under both regimes and get AI-powered optimization suggestions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Income Details</h2>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="basicSalary">Basic Salary</Label>
                  <Input
                    id="basicSalary"
                    type="number"
                    value={taxDetails.basicSalary}
                    onChange={(e) => setTaxDetails({ ...taxDetails, basicSalary: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="hra">HRA</Label>
                  <Input
                    id="hra"
                    type="number"
                    value={taxDetails.hra}
                    onChange={(e) => setTaxDetails({ ...taxDetails, hra: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="lta">LTA</Label>
                  <Input
                    id="lta"
                    type="number"
                    value={taxDetails.lta}
                    onChange={(e) => setTaxDetails({ ...taxDetails, lta: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="otherAllowances">Other Allowances</Label>
                  <Input
                    id="otherAllowances"
                    type="number"
                    value={taxDetails.otherAllowances}
                    onChange={(e) => setTaxDetails({ ...taxDetails, otherAllowances: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Deductions & Exemptions</h2>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="epfContribution">EPF Contribution</Label>
                  <Input
                    id="epfContribution"
                    type="number"
                    value={taxDetails.epfContribution}
                    onChange={(e) => setTaxDetails({ ...taxDetails, epfContribution: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="elss">ELSS Investment</Label>
                  <Input
                    id="elss"
                    type="number"
                    value={taxDetails.elss}
                    onChange={(e) => setTaxDetails({ ...taxDetails, elss: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="ppf">PPF Investment</Label>
                  <Input
                    id="ppf"
                    type="number"
                    value={taxDetails.ppf}
                    onChange={(e) => setTaxDetails({ ...taxDetails, ppf: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="nps">NPS Contribution</Label>
                  <Input
                    id="nps"
                    type="number"
                    value={taxDetails.nps}
                    onChange={(e) => setTaxDetails({ ...taxDetails, nps: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="homeLoanInterest">Home Loan Interest</Label>
                  <Input
                    id="homeLoanInterest"
                    type="number"
                    value={taxDetails.homeLoanInterest}
                    onChange={(e) => setTaxDetails({ ...taxDetails, homeLoanInterest: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="rentPaid">Rent Paid</Label>
                  <Input
                    id="rentPaid"
                    type="number"
                    value={taxDetails.rentPaid}
                    onChange={(e) => setTaxDetails({ ...taxDetails, rentPaid: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <Button onClick={calculateTax} className="w-full">
              Calculate Tax
              <Calculator className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>

        {calculatedTax && (
          <div className="space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="comparison">Regime Comparison</TabsTrigger>
                <TabsTrigger value="suggestions">Tax Saving Tips</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Tax Breakdown</h3>
                  <TaxBreakdown data={calculatedTax} />
                </Card>
              </TabsContent>

              <TabsContent value="comparison">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Old vs New Regime</h3>
                  <RegimeComparison data={calculatedTax} />
                </Card>
              </TabsContent>

              <TabsContent value="suggestions">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Tax Saving Suggestions</h3>
                  <TaxSavingSuggestions data={calculatedTax} />
                </Card>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold">Total Income</h4>
                </div>
                <p className="text-2xl font-bold">₹{calculatedTax.totalIncome.toLocaleString()}</p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold">Best Regime</h4>
                </div>
                <p className="text-2xl font-bold">
                  {calculatedTax.oldRegime.tax < calculatedTax.newRegime.tax ? 'Old' : 'New'}
                </p>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold">Tax Saved</h4>
                </div>
                <p className="text-2xl font-bold">
                  ₹{Math.abs(calculatedTax.oldRegime.tax - calculatedTax.newRegime.tax).toLocaleString()}
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}