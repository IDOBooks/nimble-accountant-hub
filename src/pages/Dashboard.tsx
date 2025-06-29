
import { Download, Plus, Import, TrendingUp, TrendingDown, DollarSign, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PieChart, 
  Pie, 
  Cell, 
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

const summaryData = [
  {
    title: 'Total Income',
    value: '£45,678',
    change: '+12.5%',
    positive: true,
    icon: TrendingUp,
    className: 'income-tile'
  },
  {
    title: 'Total Expenses',
    value: '£32,456',
    change: '+8.2%',
    positive: false,
    icon: TrendingDown,
    className: 'expense-tile'
  },
  {
    title: 'Net Profit',
    value: '£13,222',
    change: '+18.7%',
    positive: true,
    icon: DollarSign,
    className: 'profit-tile'
  },
  {
    title: 'VAT Payable',
    value: '£2,678',
    change: '+5.3%',
    positive: false,
    icon: Receipt,
    className: 'vat-tile'
  }
];

const expenseData = [
  { name: 'Rent', value: 8500, color: '#ef4444' },
  { name: 'Utilities', value: 2300, color: '#f97316' },
  { name: 'Salaries', value: 15600, color: '#eab308' },
  { name: 'Marketing', value: 3200, color: '#22c55e' },
  { name: 'Equipment', value: 2856, color: '#3b82f6' }
];

const monthlyIncomeData = [
  { month: 'Jan', income: 42000 },
  { month: 'Feb', income: 38000 },
  { month: 'Mar', income: 45000 },
  { month: 'Apr', income: 48000 },
  { month: 'May', income: 52000 },
  { month: 'Jun', income: 49000 }
];

const cashFlowData = [
  { month: 'Jan', inflow: 42000, outflow: 35000 },
  { month: 'Feb', inflow: 38000, outflow: 32000 },
  { month: 'Mar', inflow: 45000, outflow: 38000 },
  { month: 'Apr', inflow: 48000, outflow: 41000 },
  { month: 'May', inflow: 52000, outflow: 43000 },
  { month: 'Jun', inflow: 49000, outflow: 39000 }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Import className="h-4 w-4" />
            Import Data
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryData.map((item, index) => (
          <Card key={index} className={`summary-tile ${item.className}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{item.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
                  <p className={`text-sm mt-1 ${item.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {item.change} from last month
                  </p>
                </div>
                <item.icon className="h-8 w-8 text-slate-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`£${value.toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Income */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
              Monthly Income
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyIncomeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`£${value.toLocaleString()}`, 'Income']} />
                <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
            Cash Flow Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`£${value.toLocaleString()}`, name === 'inflow' ? 'Income' : 'Expenses']} />
              <Line type="monotone" dataKey="inflow" stroke="#22c55e" strokeWidth={2} name="inflow" />
              <Line type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} name="outflow" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
