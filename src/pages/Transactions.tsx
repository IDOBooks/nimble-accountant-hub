import { useState } from 'react';
import { Plus, Upload, Search, Filter, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SimpleTransactionForm } from '@/components/SimpleTransactionForm';

const mockTransactions = [
  {
    id: 1,
    date: '2024-06-28',
    description: 'Client Payment - ABC Corp',
    account: 'Sales Revenue',
    type: 'Income',
    amount: 5500,
    vat: 20,
    status: 'Completed'
  },
  {
    id: 2,
    date: '2024-06-27',
    description: 'Office Rent - June',
    account: 'Rent Expense',
    type: 'Expense',
    amount: 2800,
    vat: 0,
    status: 'Completed'
  },
  {
    id: 3,
    date: '2024-06-26',
    description: 'Electricity Bill',
    account: 'Utilities',
    type: 'Expense',
    amount: 450,
    vat: 5,
    status: 'Pending'
  }
];

const accountTypes = [
  'Sales Revenue',
  'Service Revenue',
  'Cash',
  'Bank Account',
  'Rent Expense',
  'Utilities',
  'Office Supplies',
  'Marketing',
  'Travel Expense',
  'Professional Fees'
];

const vatRates = [
  { value: '20', label: '20% Standard Rate' },
  { value: '5', label: '5% Reduced Rate' },
  { value: '0', label: '0% Zero Rate' },
  { value: 'exempt', label: 'VAT Exempt' }
];

export default function Transactions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = mockTransactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-600 mt-1">Easily record your business income and expenses</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg">
                <Sparkles className="h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-slate-900">
                  Record a New Transaction
                </DialogTitle>
              </DialogHeader>
              <SimpleTransactionForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">This Month</p>
                <p className="text-2xl font-bold text-green-900">£8,950</p>
                <p className="text-xs text-green-600">Money In</p>
              </div>
              <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800">This Month</p>
                <p className="text-2xl font-bold text-red-900">£3,250</p>
                <p className="text-xs text-red-600">Money Out</p>
              </div>
              <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center">
                <Download className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800">Net Profit</p>
                <p className="text-2xl font-bold text-blue-900">£5,700</p>
                <p className="text-xs text-blue-600">This Month</p>
              </div>
              <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Money In</SelectItem>
                <SelectItem value="expense">Money Out</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600">Amount</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600">VAT</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-900">{transaction.date}</td>
                    <td className="py-3 px-4 text-slate-900 font-medium">{transaction.description}</td>
                    <td className="py-3 px-4 text-slate-600">{transaction.account}</td>
                    <td className="py-3 px-4">
                      <Badge variant={transaction.type === 'Income' ? 'default' : 'destructive'}>
                        {transaction.type === 'Income' ? 'Money In' : 'Money Out'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-slate-900">
                      £{transaction.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600">{transaction.vat}%</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={transaction.status === 'Completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
