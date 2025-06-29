
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Coffee, 
  Car, 
  Home, 
  Zap, 
  Phone,
  CreditCard,
  Receipt,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const transactionTypes = [
  {
    id: 'income',
    label: 'Money Coming In',
    description: 'Payments from clients, sales, refunds',
    icon: ArrowUpCircle,
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    id: 'expense',
    label: 'Money Going Out',
    description: 'Bills, purchases, business expenses',
    icon: ArrowDownCircle,
    color: 'bg-red-500 hover:bg-red-600'
  }
];

const quickTemplates = [
  { name: 'Office Supplies', account: 'Office Supplies', icon: Coffee, vat: 20 },
  { name: 'Travel Expense', account: 'Travel Expense', icon: Car, vat: 0 },
  { name: 'Rent Payment', account: 'Rent Expense', icon: Home, vat: 0 },
  { name: 'Utilities', account: 'Utilities', icon: Zap, vat: 5 },
  { name: 'Phone Bill', account: 'Phone & Internet', icon: Phone, vat: 20 },
  { name: 'Client Payment', account: 'Sales Revenue', icon: CreditCard, vat: 20 }
];

const smartSuggestions = {
  'coffee': { account: 'Office Supplies', vat: 20 },
  'petrol': { account: 'Travel Expense', vat: 20 },
  'lunch': { account: 'Meals & Entertainment', vat: 20 },
  'electricity': { account: 'Utilities', vat: 5 },
  'internet': { account: 'Phone & Internet', vat: 20 },
  'rent': { account: 'Rent Expense', vat: 0 },
  'stationery': { account: 'Office Supplies', vat: 20 },
  'advertising': { account: 'Marketing', vat: 20 }
};

interface SimpleTransactionFormProps {
  onClose: () => void;
}

export function SimpleTransactionForm({ onClose }: SimpleTransactionFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    amount: '',
    account: '',
    vat: '20',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
    setStep(2);
  };

  const handleTemplateSelect = (template: typeof quickTemplates[0]) => {
    setFormData(prev => ({
      ...prev,
      description: template.name,
      account: template.account,
      vat: template.vat.toString()
    }));
  };

  const handleDescriptionChange = (description: string) => {
    setFormData(prev => ({ ...prev, description }));
    
    // Smart suggestions based on description
    const lowerDesc = description.toLowerCase();
    for (const [keyword, suggestion] of Object.entries(smartSuggestions)) {
      if (lowerDesc.includes(keyword)) {
        setFormData(prev => ({
          ...prev,
          account: suggestion.account,
          vat: suggestion.vat.toString()
        }));
        break;
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Transaction Saved!",
      description: `Your ${formData.type} transaction has been recorded successfully.`,
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const isFormValid = formData.type && formData.description && formData.amount && formData.account;

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">What type of transaction is this?</h3>
          <p className="text-slate-600">Choose the option that best describes your transaction</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transactionTypes.map((type) => (
            <Card 
              key={type.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-indigo-300"
              onClick={() => handleTypeSelect(type.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${type.color} text-white mb-4`}>
                  <type.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">{type.label}</h4>
                <p className="text-slate-600 text-sm">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <span className="ml-2 text-sm text-slate-600">Type</span>
        </div>
        <div className="w-16 h-0.5 bg-indigo-600"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            2
          </div>
          <span className="ml-2 text-sm text-slate-600">Details</span>
        </div>
        <div className="w-16 h-0.5 bg-slate-200"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
          <span className="ml-2 text-sm text-slate-400">Review</span>
        </div>
      </div>

      <div className="text-center mb-6">
        <Badge variant={formData.type === 'income' ? 'default' : 'destructive'} className="mb-2">
          {formData.type === 'income' ? 'Money Coming In' : 'Money Going Out'}
        </Badge>
        <h3 className="text-xl font-bold text-slate-900">Tell us about this transaction</h3>
        <p className="text-slate-600">We'll help you fill in the details automatically</p>
      </div>

      {/* Quick Templates */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-slate-700 mb-3 block">
          Quick Templates (Optional)
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {quickTemplates.map((template) => (
            <Button
              key={template.name}
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center gap-1 hover:bg-indigo-50"
              onClick={() => handleTemplateSelect(template)}
            >
              <template.icon className="h-4 w-4" />
              <span className="text-xs">{template.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="description" className="text-sm font-medium text-slate-700">
            What is this for? *
          </Label>
          <Input
            id="description"
            placeholder="e.g., Coffee for client meeting, Office rent, Electricity bill..."
            value={formData.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-slate-500 mt-1">
            💡 We'll automatically suggest the right category based on what you type
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount" className="text-sm font-medium text-slate-700">
              Amount (£) *
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="date" className="text-sm font-medium text-slate-700">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="account" className="text-sm font-medium text-slate-700">
              Category *
            </Label>
            <Input
              id="account"
              placeholder="Auto-suggested..."
              value={formData.account}
              onChange={(e) => setFormData(prev => ({ ...prev, account: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="vat" className="text-sm font-medium text-slate-700">
              VAT Rate
            </Label>
            <select
              id="vat"
              value={formData.vat}
              onChange={(e) => setFormData(prev => ({ ...prev, vat: e.target.value }))}
              className="mt-1 w-full h-10 px-3 py-2 border border-slate-300 rounded-md text-sm"
            >
              <option value="20">20% Standard</option>
              <option value="5">5% Reduced</option>
              <option value="0">0% Zero Rate</option>
              <option value="exempt">VAT Exempt</option>
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="notes" className="text-sm font-medium text-slate-700">
            Additional Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Any extra details..."
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={2}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep(1)}
        >
          ← Back
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Receipt className="h-4 w-4 mr-2" />
                Save Transaction
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
