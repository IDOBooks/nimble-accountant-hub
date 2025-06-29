import { useState } from 'react';
import { Download, FileText, Calculator, TrendingUp, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const profitLossData = [
  { month: 'Jan', profit: 8500 },
  { month: 'Feb', profit: 6200 },
  { month: 'Mar', profit: 9800 },
  { month: 'Apr', profit: 11200 },
  { month: 'May', profit: 13222 },
  { month: 'Jun', profit: 12800 }
];

const vatData = [
  { type: 'VAT on Sales', amount: 9200 },
  { type: 'VAT on Purchases', amount: -6522 },
  { type: 'Adjustments', amount: 0 }
];

const cashFlowData = [
  { month: 'Jan', inflow: 42000, outflow: 35000 },
  { month: 'Feb', inflow: 38000, outflow: 32000 },
  { month: 'Mar', inflow: 45000, outflow: 38000 },
  { month: 'Apr', inflow: 48000, outflow: 41000 },
  { month: 'May', inflow: 52000, outflow: 43000 },
  { month: 'Jun', inflow: 49000, outflow: 39000 }
];

const balanceSheetData = {
  assets: [
    { name: 'Cash & Bank', value: 25600 },
    { name: 'Accounts Receivable', value: 18900 },
    { name: 'Equipment', value: 45000 },
    { name: 'Total Assets', value: 89500 }
  ],
  liabilities: [
    { name: 'Accounts Payable', value: 12300 },
    { name: 'VAT Payable', value: 2678 },
    { name: 'Loans', value: 25000 },
    { name: 'Total Liabilities', value: 39978 }
  ]
};

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  return (
    <div className="space-y-6 bg-gradient-to-br from-violet-50 to-cyan-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-violet-900">Financial Reports</h1>
          <p className="text-violet-600 mt-1">Comprehensive business insights and analysis</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48 border-violet-200 focus:border-cyan-400">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Current Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl">
            <Download className="h-4 w-4" />
            Export All Reports
          </Button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trial Balance */}
        <Card className="bg-white/80 backdrop-blur-sm border-violet-200 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-violet-600 to-violet-700 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Trial Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-violet-700">Balance Status</span>
                <Badge className="bg-green-100 text-green-800 border-green-200">Balanced</Badge>
              </div>
              <Progress value={100} className="h-2" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-violet-600">Total Debits</p>
                  <p className="font-bold text-violet-900">£78,456</p>
                </div>
                <div>
                  <p className="text-violet-600">Total Credits</p>
                  <p className="font-bold text-violet-900">£78,456</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4 border-violet-200 text-violet-700 hover:bg-violet-50 rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Export Trial Balance
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profit & Loss */}
        <Card className="bg-white/80 backdrop-blur-sm border-violet-200 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Profit & Loss
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">£13,222</p>
                <p className="text-sm text-violet-600">Net Profit This Month</p>
              </div>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={profitLossData}>
                  <Line type="monotone" dataKey="profit" stroke="#06b6d4" strokeWidth={3} dot={false} />
                  <XAxis dataKey="month" hide />
                  <YAxis hide />
                  <Tooltip formatter={(value) => [`£${value.toLocaleString()}`, 'Profit']} />
                </LineChart>
              </ResponsiveContainer>
              <Button variant="outline" className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Export P&L Statement
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* VAT Report */}
        <Card className="bg-white/80 backdrop-blur-sm border-violet-200 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              VAT Report
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {vatData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                  <span className="font-medium text-purple-700">{item.type}</span>
                  <span className={`font-bold ${item.amount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    £{Math.abs(item.amount).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span className="text-violet-700">Net VAT Due</span>
                  <span className="text-violet-900">£2,678</span>
                </div>
              </div>
              <Button variant="outline" className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Export VAT Return
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Balance Sheet */}
        <Card className="bg-white/80 backdrop-blur-sm border-violet-200 shadow-lg rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Balance Sheet
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2">Assets</h4>
                  {balanceSheetData.assets.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-1">
                      <span className="text-violet-600">{item.name}</span>
                      <span className="font-medium text-violet-900">£{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-2">Liabilities</h4>
                  {balanceSheetData.liabilities.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-1">
                      <span className="text-violet-600">{item.name}</span>
                      <span className="font-medium text-violet-900">£{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Export Balance Sheet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card className="bg-white/80 backdrop-blur-sm border-violet-200 shadow-lg rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Cash Flow Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                formatter={(value, name) => [`£${value.toLocaleString()}`, name === 'inflow' ? 'Cash In' : 'Cash Out']}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px' }}
              />
              <Bar dataKey="inflow" fill="#06b6d4" name="inflow" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outflow" fill="#8b5cf6" name="outflow" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
