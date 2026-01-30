import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  MapPin,
  Calendar,
  IndianRupee as Rupee,
  Eye,
  Phone,
  Search,
  Filter
} from 'lucide-react';

interface Purchase {
  id: string;
  orderId: string;
  produceName: string;
  farmerName: string;
  farmerPhone: string;
  quantity: number;
  unit: string;
  totalAmount: number;
  status: 'confirmed' | 'in_transit' | 'delivered' | 'completed';
  orderDate: string;
  expectedDelivery: string;
  pickupLocation: string;
  deliveryLocation: string;
  produceImage: string;
  trackingId?: string;
}

interface TraderPurchasesProps {
  onViewTransaction: (purchase: Purchase) => void;
}

const TraderPurchases: React.FC<TraderPurchasesProps> = ({ onViewTransaction }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock purchases data
  const mockPurchases: Purchase[] = [
    {
      id: '1',
      orderId: 'ORD-2024-001',
      produceName: 'गेहूं (Wheat)',
      farmerName: 'राम कुमार',
      farmerPhone: '+91-9876543210',
      quantity: 50,
      unit: 'quintal',
      totalAmount: 115000,
      status: 'in_transit',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-17',
      pickupLocation: 'Khadakwasla, Pune',
      deliveryLocation: 'APMC Market, Pune',
      produceImage: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg',
      trackingId: 'TRK123456'
    },
    {
      id: '2',
      orderId: 'ORD-2024-002',
      produceName: 'धान (Rice)',
      farmerName: 'श्याम पटेल',
      farmerPhone: '+91-9876543211',
      quantity: 75,
      unit: 'quintal',
      totalAmount: 146250,
      status: 'delivered',
      orderDate: '2024-01-10',
      expectedDelivery: '2024-01-12',
      pickupLocation: 'Baramati, Pune',
      deliveryLocation: 'APMC Market, Pune',
      produceImage: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
      trackingId: 'TRK123457'
    },
    {
      id: '3',
      orderId: 'ORD-2024-003',
      produceName: 'आलू (Potato)',
      farmerName: 'गीता देवी',
      farmerPhone: '+91-9876543212',
      quantity: 100,
      unit: 'quintal',
      totalAmount: 80000,
      status: 'completed',
      orderDate: '2024-01-05',
      expectedDelivery: '2024-01-07',
      pickupLocation: 'Nashik, Maharashtra',
      deliveryLocation: 'APMC Market, Pune',
      produceImage: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg'
    }
  ];

  const filteredPurchases = mockPurchases.filter(purchase => {
    const matchesStatus = selectedStatus === 'all' || purchase.status === selectedStatus;
    const matchesSearch = purchase.produceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <Clock size={16} className="text-blue-500" />;
      case 'in_transit': return <Truck size={16} className="text-orange-500" />;
      case 'delivered': return <Package size={16} className="text-green-500" />;
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'in_transit': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      case 'completed': return 'text-green-700 bg-green-100 border-green-300';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'पुष्ट / Confirmed';
      case 'in_transit': return 'ट्रांजिट में / In Transit';
      case 'delivered': return 'डिलीवर / Delivered';
      case 'completed': return 'पूर्ण / Completed';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const statusCounts = {
    all: mockPurchases.length,
    confirmed: mockPurchases.filter(p => p.status === 'confirmed').length,
    in_transit: mockPurchases.filter(p => p.status === 'in_transit').length,
    delivered: mockPurchases.filter(p => p.status === 'delivered').length,
    completed: mockPurchases.filter(p => p.status === 'completed').length
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">मेरी खरीदारी</h2>
            <p className="text-green-100 text-sm">My Purchases</p>
            <p className="text-green-200 text-xs mt-1">{filteredPurchases.length} total orders</p>
          </div>
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <Package size={24} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="ऑर्डर या फसल खोजें / Search orders or produce"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'सभी', labelEn: 'All', icon: '📦' },
          { key: 'confirmed', label: 'पुष्ट', labelEn: 'Confirmed', icon: '✅' },
          { key: 'in_transit', label: 'ट्रांजिट', labelEn: 'In Transit', icon: '🚛' },
          { key: 'delivered', label: 'डिलीवर', labelEn: 'Delivered', icon: '📦' },
          { key: 'completed', label: 'पूर्ण', labelEn: 'Completed', icon: '🎉' }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedStatus(filter.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedStatus === filter.key
                ? 'bg-green-600 text-white'
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

      {/* Purchases List */}
      <div className="space-y-4">
        {filteredPurchases.map((purchase) => (
          <div 
            key={purchase.id} 
            className={`bg-white border rounded-xl shadow-sm p-4 ${getStatusColor(purchase.status)}`}
          >
            <div className="flex space-x-4">
              <img 
                src={purchase.produceImage} 
                alt={purchase.produceName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{purchase.produceName}</h3>
                    <p className="text-sm text-gray-600">ऑर्डर: {purchase.orderId}</p>
                  </div>
                  
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(purchase.status)}`}>
                    {getStatusIcon(purchase.status)}
                    <span className="text-sm font-medium">{getStatusText(purchase.status)}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">किसान / Farmer</p>
                    <p className="text-sm font-medium text-gray-800">{purchase.farmerName}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">मात्रा / Quantity</p>
                    <p className="text-sm font-medium text-gray-800">{purchase.quantity} {purchase.unit}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">ऑर्डर दिनांक / Order Date</p>
                    <p className="text-sm font-medium text-gray-800">{formatDate(purchase.orderDate)}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">अपेक्षित डिलीवरी / Expected Delivery</p>
                    <p className="text-sm font-medium text-gray-800">{formatDate(purchase.expectedDelivery)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{purchase.pickupLocation} → {purchase.deliveryLocation}</span>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">₹{purchase.totalAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">कुल राशि / Total Amount</p>
                  </div>
                </div>
                
                {purchase.trackingId && (
                  <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 font-medium">
                      ट्रैकिंग ID: {purchase.trackingId}
                    </p>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewTransaction(purchase)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>ट्रैक करें / Track</span>
                  </button>
                  
                  <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <Phone size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPurchases.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">कोई खरीदारी नहीं मिली</p>
          <p className="text-sm text-gray-400">No purchases found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default TraderPurchases;