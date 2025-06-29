
import { useState } from 'react';
import { Upload, Download, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const exportOptions = [
  {
    title: 'Full Ledger Export',
    description: 'Complete transaction history with all accounts',
    format: 'Excel',
    icon: FileText
  },
  {
    title: 'Trial Balance',
    description: 'Debit and credit balances for all accounts',
    format: 'Excel/PDF',
    icon: FileText
  },
  {
    title: 'Profit & Loss Report',
    description: 'Income and expense summary',
    format: 'Excel/PDF',
    icon: FileText
  },
  {
    title: 'VAT Report',
    description: 'VAT payable and receivable details',
    format: 'Excel/PDF',
    icon: FileText
  }
];

const mockImportResults = [
  { row: 1, status: 'success', description: 'Office Supplies - Staples', amount: 150.00 },
  { row: 2, status: 'success', description: 'Client Payment - ABC Corp', amount: 2500.00 },
  { row: 3, status: 'error', description: 'Invalid account code: 9999', amount: 0, error: 'Account not found' },
  { row: 4, status: 'success', description: 'Electricity Bill', amount: 180.50 },
  { row: 5, status: 'warning', description: 'Missing VAT rate', amount: 200.00, error: 'VAT rate defaulted to 20%' }
];

export default function ImportExport() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setShowResults(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Import / Export</h1>
          <p className="text-slate-600 mt-1">Import data from spreadsheets or export reports</p>
        </div>
      </div>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList>
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="export">Export Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6">
          {/* Import Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Area */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Transaction File
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">Drop your Excel or CSV file here</p>
                  <p className="text-sm text-slate-500 mb-4">Supported formats: .xlsx, .xls, .csv</p>
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={handleFileUpload}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Processing...' : 'Choose File'}
                  </Button>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Processing file...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Column Mapping */}
            <Card>
              <CardHeader>
                <CardTitle>Column Mapping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Date Column</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Column A - Date</SelectItem>
                        <SelectItem value="B">Column B - Transaction Date</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Description Column</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select description column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B">Column B - Description</SelectItem>
                        <SelectItem value="C">Column C - Details</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Amount Column</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select amount column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="D">Column D - Amount</SelectItem>
                        <SelectItem value="E">Column E - Value</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700">Account Column</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="E">Column E - Account</SelectItem>
                        <SelectItem value="F">Column F - Account Code</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                  Process Import
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Import Results */}
          {showResults && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  Import Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">3</p>
                    <p className="text-sm text-slate-600">Successful</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">1</p>
                    <p className="text-sm text-slate-600">Warnings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">1</p>
                    <p className="text-sm text-slate-600">Errors</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {mockImportResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {result.status === 'success' && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                        {result.status === 'error' && <AlertCircle className="h-4 w-4 text-red-600" />}
                        {result.status === 'warning' && <AlertCircle className="h-4 w-4 text-orange-600" />}
                        <div>
                          <p className="font-medium">{result.description}</p>
                          {result.error && <p className="text-sm text-red-600">{result.error}</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">£{result.amount.toFixed(2)}</p>
                        <Badge variant={
                          result.status === 'success' ? 'default' : 
                          result.status === 'warning' ? 'secondary' : 'destructive'
                        }>
                          Row {result.row}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          {/* Export Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exportOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <option.icon className="h-8 w-8 text-indigo-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-2">{option.title}</h3>
                      <p className="text-slate-600 text-sm mb-4">{option.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{option.format}</Badge>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Export Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Export Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">All Transactions</p>
                    <p className="text-sm text-slate-600">Last 12 months</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">VAT Return Data</p>
                    <p className="text-sm text-slate-600">Current quarter</p>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start gap-2 h-auto p-4">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium">Year-End Accounts</p>
                    <p className="text-sm text-slate-600">Financial year</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
