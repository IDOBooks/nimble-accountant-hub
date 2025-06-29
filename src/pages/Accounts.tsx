
import { useState } from 'react';
import { Plus, Edit, Trash2, Download, Filter } from 'lucide-react';
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

const mockAccounts = [
  {
    id: 1,
    code: '1001',
    name: 'Cash',
    type: 'Asset',
    category: 'Current Assets',
    balance: 15420,
    description: 'Cash on hand'
  },
  {
    id: 2,
    code: '1100',
    name: 'Bank Account - Main',
    type: 'Asset',
    category: 'Current Assets',
    balance: 45680,
    description: 'Primary business bank account'
  },
  {
    id: 3,
    code: '4001',
    name: 'Sales Revenue',
    type: 'Income',
    category: 'Revenue',
    balance: 125000,
    description: 'Revenue from sales'
  },
  {
    id: 4,
    code: '5001',
    name: 'Rent Expense',
    type: 'Expense',
    category: 'Operating Expenses',
    balance: 16800,
    description: 'Monthly office rent'
  },
  {
    id: 5,
    code: '5010',
    name: 'Utilities',
    type: 'Expense',
    category: 'Operating Expenses',
    balance: 3420,
    description: 'Electricity, water, gas'
  },
  {
    id: 6,
    code: '2001',
    name: 'VAT Payable',
    type: 'Liability',
    category: 'Current Liabilities',
    balance: 8750,
    description: 'VAT owed to HMRC'
  }
];

const accountTypes = ['Asset', 'Liability', 'Income', 'Expense', 'Equity'];
const categories = {
  Asset: ['Current Assets', 'Fixed Assets', 'Intangible Assets'],
  Liability: ['Current Liabilities', 'Long-term Liabilities'],
  Income: ['Revenue', 'Other Income'],
  Expense: ['Operating Expenses', 'Administrative Expenses', 'Finance Costs'],
  Equity: ['Share Capital', 'Retained Earnings']
};

export default function Accounts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = mockAccounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.code.includes(searchTerm);
    const matchesType = filterType === 'all' || account.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Asset': return 'bg-blue-100 text-blue-800';
      case 'Liability': return 'bg-red-100 text-red-800';
      case 'Income': return 'bg-green-100 text-green-800';
      case 'Expense': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Chart of Accounts</h1>
          <p className="text-slate-600 mt-1">Manage your account structure and balances</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
              </DialogHeader>
              <AccountForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {accountTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {accountTypes.map(type => {
          const accounts = mockAccounts.filter(acc => acc.type === type);
          const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);
          return (
            <Card key={type}>
              <CardContent className="p-4">
                <div className="text-center">
                  <Badge className={getTypeColor(type)}>{type}</Badge>
                  <p className="font-bold text-xl mt-2">£{total.toLocaleString()}</p>
                  <p className="text-sm text-slate-600">{accounts.length} accounts</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Accounts Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Code</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Account Name</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600">Balance</th>
                  <th className="text-center py-3 px-4 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="border-b hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-slate-900">{account.code}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{account.name}</td>
                    <td className="py-3 px-4">
                      <Badge className={getTypeColor(account.type)}>{account.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{account.category}</td>
                    <td className="py-3 px-4 text-right font-medium text-slate-900">
                      £{account.balance.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

function AccountForm({ onClose }: { onClose: () => void }) {
  const [selectedType, setSelectedType] = useState<string>('');

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="code">Account Code</Label>
          <Input id="code" placeholder="e.g., 1001" />
        </div>
        <div>
          <Label htmlFor="name">Account Name</Label>
          <Input id="name" placeholder="Enter account name" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Account Type</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {accountTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select disabled={!selectedType}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {selectedType && categories[selectedType as keyof typeof categories]?.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input id="description" placeholder="Account description (optional)" />
      </div>

      <div>
        <Label htmlFor="balance">Opening Balance (£)</Label>
        <Input type="number" id="balance" placeholder="0.00" step="0.01" />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
          Add Account
        </Button>
      </div>
    </form>
  );
}
