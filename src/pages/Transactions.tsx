
import { useState } from 'react';
import { Plus, Upload, Search, Filter, Download } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

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
          <p className="text-slate-600 mt-1">Manage your income and expense entries</p>
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
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4" />
                New Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
              </DialogHeader>
              <TransactionForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
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
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
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
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Account</th>
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
                        {transaction.type}
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

function TransactionForm({ onClose }: { onClose: () => void }) {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
          <Label htmlFor="type">Transaction Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" placeholder="Enter transaction description" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="account">Account</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accountTypes.map((account) => (
                <SelectItem key={account} value={account}>
                  {account}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="amount">Amount (£)</Label>
          <Input type="number" id="amount" placeholder="0.00" step="0.01" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="vat">VAT Rate</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select VAT rate" />
            </SelectTrigger>
            <SelectContent>
              {vatRates.map((rate) => (
                <SelectItem key={rate.value} value={rate.value}>
                  {rate.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="reference">Reference</Label>
          <Input id="reference" placeholder="Invoice/Receipt number" />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" placeholder="Additional notes (optional)" rows={3} />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="recurring" />
        <Label htmlFor="recurring">Set as recurring transaction</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="receipt" />
        <Label htmlFor="receipt">Upload receipt/invoice</Label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
          Save Transaction
        </Button>
      </div>
    </form>
  );
}
