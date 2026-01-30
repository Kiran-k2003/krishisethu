import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Package,
  MapPin,
  Calendar,
  Filter,
  Search
} from 'lucide-react';

interface Bid {
  id: string;
  produceId: string;
  produceName: string;
  farmerName: string;
  location: string;
  quantity: number;
  unit: string;
  bidAmount: number;
  basePrice: number;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
  message?: string;
  produceImage: string;
}

interface TraderBidsProps {
  onBack?: () => void;
}

const TraderBids: React.FC<TraderBidsProps> = ({ onBack }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock bids data
  const mockBids: Bid[] = [
    {
      id: '1',
      produceId: 'p1',
      produceName: 'गेहूं (Wheat)',
      farmerName: 'राम कुमार',
      location: 'Khadakwasla, Pune',
      quantity: 50,
      unit: 'quintal',
      bidAmount: 2300,
      basePrice: 2200,
      status: 'pending',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      message: 'अच्छी गुणवत्ता के लिए प्रीमियम मूल्य',
      produceImage: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg'
    },
    {
      id: '2',
      produceId: 'p2',
      produceName: 'धान (Rice)',
      farmerName: 'श्याम पटेल',
      location: 'Baramati, Pune',
      quantity: 75,
      unit: 'quintal',
      bidAmount: 1950,
      basePrice: 1800,
      status: 'accepted',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      produceImage: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg'
    },
    {
      id: '3',
      produceId: 'p3',
      produceName: 'मक्का (Maize)',
      farmerName: 'गीता देवी',
      location: 'Nashik, Maharashtra',
      quantity: 30,
      unit: 'quintal',
      bidAmount: 1600,
      basePrice: 1650,
      status: 'rejected',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      message: 'कम कीमत के कारण अस्वीकार',
      produceImage: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'
    }
  ];

  const filteredBids = mockBids.filter(bid => {
    const matchesStatus = selectedStatus === 'all' || bid.status === selectedStatus;
    const matchesSearch = bid.produceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} className="text-orange-500" />;
      case 'accepted': return <CheckCircle size={16} className="text-green-500" />;
      case 'rejected': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'accepted': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'लंबित / Pending';
      case 'accepted': return 'स्वीकार / Accepted';
      case 'rejected': return 'अस्वीकार / Rejected';
      default: return status;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const bidTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - bidTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'अभी / Just now';
    if (diffInHours < 24) return `${diffInHours} घंटे पहले / ${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)} दिन पहले / ${Math.floor(diffInHours / 24)}d ago`;
  };

  const statusCounts = {
    all: mockBids.length,
    pending: mockBids.filter(b => b.status === 'pending').length,
    accepted: mockBids.filter(b => b.status === 'accepted').length,
    rejected: mockBids.filter(b => b.status === 'rejected').length
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">मेरी बोलियां</h2>
            <p className="text-orange-100 text-sm">My Bids</p>
            <p className="text-orange-200 text-xs mt-1">{filteredBids.length} total bids</p>
          </div>
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="फसल या किसान खोजें / Search produce or farmer"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'सभी', labelEn: 'All', icon: '📊' },
          { key: 'pending', label: 'लंबित', labelEn: 'Pending', icon: '⏳' },
          { key: 'accepted', label: 'स्वीकार', labelEn: 'Accepted', icon: '✅' },
          { key: 'rejected', label: 'अस्वीकार', labelEn: 'Rejected', icon: '❌' }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedStatus(filter.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedStatus === filter.key
                ? 'bg-orange-600 text-white'
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

      {/* Bids List */}
      <div className="space-y-4">
        {filteredBids.map((bid) => (
          <div 
            key={bid.id} 
            className={`bg-white border rounded-xl shadow-sm p-4 ${getStatusColor(bid.status)}`}
          >
            <div className="flex space-x-4">
              <img 
                src={bid.produceImage} 
                alt={bid.produceName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{bid.produceName}</h3>
                    <p className="text-sm text-gray-600">किसान: {bid.farmerName}</p>
                  </div>
                  
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(bid.status)}`}>
                    {getStatusIcon(bid.status)}
                    <span className="text-sm font-medium">{getStatusText(bid.status)}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{bid.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Package size={14} />
                    <span>{bid.quantity} {bid.unit}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    <span>{formatTimeAgo(bid.timestamp)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-xs text-gray-500">आपकी बोली / Your Bid</p>
                      <p className="text-lg font-bold text-orange-600">₹{bid.bidAmount}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">आधार मूल्य / Base Price</p>
                      <p className="text-sm font-medium text-gray-700">₹{bid.basePrice}</p>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    bid.bidAmount > bid.basePrice 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {bid.bidAmount > bid.basePrice ? '+' : ''}
                    {((bid.bidAmount - bid.basePrice) / bid.basePrice * 100).toFixed(1)}%
                  </div>
                </div>
                
                {bid.message && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">"{bid.message}"</p>
                  </div>
                )}
                
                {bid.status === 'accepted' && (
                  <div className="mt-3 flex space-x-2">
                    <button className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      भुगतान करें / Make Payment
                    </button>
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      ट्रैक करें / Track Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBids.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">कोई बोली नहीं मिली</p>
          <p className="text-sm text-gray-400">No bids found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default TraderBids;