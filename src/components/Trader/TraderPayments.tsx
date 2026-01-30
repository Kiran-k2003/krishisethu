import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  Clock,
  AlertCircle,
  Download,
  Eye,
  Calendar,
  IndianRupee as Rupee,
  Search,
  Filter
} from 'lucide-react';

interface Payment {
  id: string;
  orderId: string;
  produceName: string;
  farmerName: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentMethod: 'upi' | 'bank_transfer' | 'card';
  transactionId?: string;
  paymentDate: string;
  dueDate?: string;
  invoiceUrl?: string;
}

interface TraderPaymentsProps {
  onViewInvoice?: (payment: Payment) => void;
}

const TraderPayments: React.FC<TraderPaymentsProps> = ({ onViewInvoice }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock payments data
  const mockPayments: Payment[] = [
    {
      id: '1',
      orderId: 'ORD-2024-001',
      produceName: 'गेहूं (Wheat)',
      farmerName: 'राम कुमार',
      amount: 115000,
      status: 'completed',
      paymentMethod: 'upi',
      transactionId: 'TXN123456789',
      paymentDate: '2024-01-15T10:30:00Z',
      invoiceUrl: '#'
    },
    {
      id: '2',
      orderId: 'ORD-2024-002',
      produceName: 'धान (Rice)',
      farmerName: 'श्याम पटेल',
      amount: 146250,
      status: 'processing',
      paymentMethod: 'bank_transfer',
      transactionId: 'TXN123456790',
      paymentDate: '2024-01-16T14:20:00Z'
    },
    {
      id: '3',
      orderId: 'ORD-2024-003',
      produceName: 'मक्का (Maize)',
      farmerName: 'गीता देवी',
      amount: 48000,
      status: 'pending',
      paymentMethod: 'upi',
      dueDate: '2024-01-20T23:59:59Z'
    },
    {
      id: '4',
      orderId: 'ORD-2024-004',
      produceName: 'आलू (Potato)',
      farmerName: 'सुरेश यादव',
      amount: 80000,
      status: 'failed',
      paymentMethod: 'card',
      paymentDate: '2024-01-14T09:15:00Z'
    }
  ];

  const filteredPayments = mockPayments.filter(payment => {
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchesSearch = payment.produceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} className="text-orange-500" />;
      case 'processing': return <Clock size={16} className="text-blue-500" />;
      case 'completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'failed': return <AlertCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'लंबित / Pending';
      case 'processing': return 'प्रक्रिया में / Processing';
      case 'completed': return 'पूर्ण / Completed';
      case 'failed': return 'असफल / Failed';
      default: return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'upi': return 'UPI';
      case 'bank_transfer': return 'बैंक ट्रांसफर / Bank Transfer';
      case 'card': return 'कार्ड / Card';
      default: return method;
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statusCounts = {
    all: mockPayments.length,
    pending: mockPayments.filter(p => p.status === 'pending').length,
    processing: mockPayments.filter(p => p.status === 'processing').length,
    completed: mockPayments.filter(p => p.status === 'completed').length,
    failed: mockPayments.filter(p => p.status === 'failed').length
  };

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const completedAmount = filteredPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">भुगतान स्थिति</h2>
            <p className="text-purple-100 text-sm">Payment Status</p>
            <p className="text-purple-200 text-xs mt-1">₹{totalAmount.toLocaleString()} total</p>
          </div>
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <CreditCard size={24} />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">₹{completedAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600 font-medium">भुगतान पूर्ण</p>
              <p className="text-xs text-gray-500">Completed</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">
                ₹{(totalAmount - completedAmount).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 font-medium">लंबित भुगतान</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="ऑर्डर या किसान खोजें / Search orders or farmer"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'सभी', labelEn: 'All', icon: '💳' },
          { key: 'pending', label: 'लंबित', labelEn: 'Pending', icon: '⏳' },
          { key: 'processing', label: 'प्रक्रिया', labelEn: 'Processing', icon: '🔄' },
          { key: 'completed', label: 'पूर्ण', labelEn: 'Completed', icon: '✅' },
          { key: 'failed', label: 'असफल', labelEn: 'Failed', icon: '❌' }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedStatus(filter.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedStatus === filter.key
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{filter.icon}</span>
            <span>{filter.labelEn}</span>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
              {statusCounts[filter.key as keyof typeof statusCounts]}
            </span>
          </button>
        ))}
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <div 
            key={payment.id} 
            className={`bg-white border rounded-xl shadow-sm p-4 ${getStatusColor(payment.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{payment.produceName}</h3>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(payment.status)}`}>
                    {getStatusIcon(payment.status)}
                    <span className="text-sm font-medium">{getStatusText(payment.status)}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">ऑर्डर ID / Order ID</p>
                    <p className="text-sm font-medium text-gray-800">{payment.orderId}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">किसान / Farmer</p>
                    <p className="text-sm font-medium text-gray-800">{payment.farmerName}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">भुगतान विधि / Payment Method</p>
                    <p className="text-sm font-medium text-gray-800">{getPaymentMethodText(payment.paymentMethod)}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">
                      {payment.status === 'pending' ? 'देय तिथि / Due Date' : 'भुगतान दिनांक / Payment Date'}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {payment.status === 'pending' && payment.dueDate 
                        ? formatDateTime(payment.dueDate)
                        : payment.paymentDate 
                        ? formatDateTime(payment.paymentDate)
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>
                
                {payment.transactionId && (
                  <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">
                      Transaction ID: {payment.transactionId}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">₹{payment.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">कुल राशि / Total Amount</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    {payment.status === 'pending' && (
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                        भुगतान करें / Pay Now
                      </button>
                    )}
                    
                    {payment.status === 'failed' && (
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                        पुनः प्रयास / Retry
                      </button>
                    )}
                    
                    {payment.invoiceUrl && (
                      <button 
                        onClick={() => onViewInvoice?.(payment)}
                        className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-2"
                      >
                        <Download size={16} />
                        <span>Invoice</span>
                      </button>
                    )}
                    
                    <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">कोई भुगतान नहीं मिला</p>
          <p className="text-sm text-gray-400">No payments found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default TraderPayments;