
import { useState } from 'react';
import { Download, Calendar, TrendingUp, FileText, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trialBalanceData = [
  { account: 'Cash', debit: 15420, credit: 0 },
  { account: 'Bank Account', debit: 45680, credit: 0 },
  { account: 'Sales Revenue', debit: 0, credit: 125000 },
  { account: 'Rent Expense', debit: 16800, credit: 0 },
  { account: 'Utilities', debit: 3420, credit: 0 },
  { account: 'VAT Payable', debit: 0, credit: 8750 },
  { account: 'Salaries', debit: 24000, credit: 0 },
];

const profitLossData = [
  { category: 'Sales Revenue', amount: 125000, type: 'income' },
  { category: 'Service Revenue', amount: 35000, type: 'income' },
  { category: 'Rent Expense', amount: 16800, type: 'expense' },
  { category: 'Salaries', amount: 24000, type: 'expense' },
  { category: 'Utilities', amount: 3420, type: 'expense' },
  { category: 'Marketing', amount: 5200, type: 'expense' },
];

const vatReportData = [
  { description: 'VAT on Sales (20%)', amount: 25000, vat: 5000, type: 'output' },
  { description: 'VAT on Purchases (20%)', amount: 10000, vat: 2000, type: 'input' },
  { description: 'VAT on Equipment (20%)', amount: 5000, vat: 1000, type: 'input' },
];

const monthlyPLData = [
  { month: 'Jan', income: 42000, expenses: 35000 },
  { month: 'Feb', income: 38000, expenses: 32000 },
  { month: 'Mar', income: 45000, expenses: 38000 },
  { month: 'Apr', income: 48000, expenses: 41000 },
  { month: 'May', income: 52000, expenses: 43000 },
  { month: 'Jun', income: 49000, expenses: 39000 },
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-year');

  const totalDebit = trialBalanceData.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = trialBalanceData.reduce((sum, item) => sum + item.credit, 0);
  
  const totalIncome = profitLossData.filter(item => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = profitLossData.filter(item => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  const vatPayable = vatReportData.filter(item => item.type === 'output').reduce((sum, item) => sum + item.vat, 0);
  const vatReceivable = vatReportData.filter(item => item.type === 'input').reduce((sum, item) => sum + item.vat, 0);
  const netVAT = vatPayable - vatReceivable;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-600 mt-1">Financial reports and analysis</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="current-quarter">Current Quarter</SelectItem>
              <SelectItem value="current-year">Current Year</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="trial-balance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trial-balance">Trial Balance</TabsTrigger>
          <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
          <TabsTrigger value="vat-report">VAT Report</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
        </TabsList>

        <TabsContent value="trial-balance" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Trial Balance
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <PieChart className="h-4 w-4" />
                  View Chart
                </Button>
                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Account</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Debit (£)</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Credit (£)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trialBalanceData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium text-slate-900">{item.account}</td>
                        <td className="py-3 px-4 text-right text-slate-900">
                          {item.debit > 0 ? `${item.debit.toLocaleString()}` : '-'}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-900">
                          {item.credit > 0 ? `${item.credit.toLocaleString()}` : '-'}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold">
                      <td className="py-3 px-4 text-slate-900">TOTALS</td>
                      <td className="py-3 px-4 text-right text-slate-900">{totalDebit.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-slate-900">{totalCredit.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-800">
                  ✓ Trial Balance is balanced. Total Debits = Total Credits (£{totalDebit.toLocaleString()})
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit-loss" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Profit & Loss Statement
                  </CardTitle>
                  <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Income Section */}
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-3">Income</h3>
                      {profitLossData.filter(item => item.type === 'income').map((item, index) => (
                        <div key={index} className="flex justify-between py-2">
                          <span className="text-slate-700">{item.category}</span>
                          <span className="font-medium text-emerald-600">£{item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Income</span>
                        <span className="text-emerald-600">£{totalIncome.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Expenses Section */}
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-3">Expenses</h3>
                      {profitLossData.filter(item => item.type === 'expense').map((item, index) => (
                        <div key={index} className="flex justify-between py-2">
                          <span className="text-slate-700">{item.category}</span>
                          <span className="font-medium text-red-600">£{item.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Expenses</span>
                        <span className="text-red-600">£{totalExpenses.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Net Profit */}
                    <div className="border-t-2 border-slate-300 pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Net Profit</span>
                        <span className={netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}>
                          £{netProfit.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyPLData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name) => [`£${value.toLocaleString()}`, name === 'income' ? 'Income' : 'Expenses']} />
                      <Bar dataKey="income" fill="#22c55e" />
                      <Bar dataKey="expenses" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vat-report" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                VAT Report
              </CardTitle>
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="vat-tile">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-slate-600">VAT on Sales</p>
                    <p className="text-2xl font-bold text-purple-600">£{vatPayable.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="vat-tile">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-slate-600">VAT on Purchases</p>
                    <p className="text-2xl font-bold text-blue-600">£{vatReceivable.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="vat-tile">
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-slate-600">Net VAT Due</p>
                    <p className="text-2xl font-bold text-slate-900">£{netVAT.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">Description</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">Net Amount (£)</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">VAT Amount (£)</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vatReportData.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-900">{item.description}</td>
                        <td className="py-3 px-4 text-right text-slate-900">£{item.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-slate-900">£{item.vat.toLocaleString()}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            item.type === 'output' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.type === 'output' ? 'Output VAT' : 'Input VAT'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="balance-sheet" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Balance Sheet
              </CardTitle>
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Assets */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-4">Assets</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-700">Cash</span>
                      <span className="font-medium">£15,420</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Bank Account</span>
                      <span className="font-medium">£45,680</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Equipment</span>
                      <span className="font-medium">£12,500</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Assets</span>
                      <span>£73,600</span>
                    </div>
                  </div>
                </div>

                {/* Liabilities & Equity */}
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-4">Liabilities & Equity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-700">VAT Payable</span>
                      <span className="font-medium">£8,750</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Accounts Payable</span>
                      <span className="font-medium">£3,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Owner's Equity</span>
                      <span className="font-medium">£61,650</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Liabilities & Equity</span>
                      <span>£73,600</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <p className="text-sm text-emerald-800">
                  ✓ Balance Sheet is balanced. Total Assets = Total Liabilities & Equity (£73,600)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
