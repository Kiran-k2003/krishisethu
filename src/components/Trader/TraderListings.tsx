import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Package, 
  Star,
  Shield,
  Clock,
  Eye
} from 'lucide-react';
import { Produce } from '../../types';

interface TraderListingsProps {
  produces: Produce[];
  onViewProduce: (produce: Produce) => void;
}

const TraderListings: React.FC<TraderListingsProps> = ({ produces, onViewProduce }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const cropTypes = [...new Set(produces.map(p => p.name))];
  const locations = [...new Set(produces.map(p => p.location))];

  const filteredProduces = produces
    .filter(produce => {
      const matchesSearch = produce.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           produce.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCrop = selectedCrop === 'all' || produce.name === selectedCrop;
      const matchesLocation = selectedLocation === 'all' || produce.location === selectedLocation;
      
      return matchesSearch && matchesCrop && matchesLocation && produce.status === 'active';
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_low': return a.currentPrice - b.currentPrice;
        case 'price_high': return b.currentPrice - a.currentPrice;
        case 'quantity': return b.quantity - a.quantity;
        default: return new Date(b.harvestDate).getTime() - new Date(a.harvestDate).getTime();
      }
    });

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'अभी / Just now';
    if (diffInHours < 24) return `${diffInHours} घंटे पहले / ${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)} दिन पहले / ${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">उपलब्ध फसलें</h2>
            <p className="text-blue-100 text-sm">Available Produce</p>
            <p className="text-blue-200 text-xs mt-1">{filteredProduces.length} listings found</p>
          </div>
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <Package size={24} />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="फसल या स्थान खोजें / Search crops or location"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <Filter size={16} className="text-gray-500 flex-shrink-0" />
          
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">सभी फसलें / All Crops</option>
            {cropTypes.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">सभी स्थान / All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">नवीनतम / Newest</option>
            <option value="price_low">कम कीमत / Price Low</option>
            <option value="price_high">अधिक कीमत / Price High</option>
            <option value="quantity">मात्रा / Quantity</option>
          </select>
        </div>
      </div>

      {/* Produce Listings */}
      <div className="space-y-4">
        {filteredProduces.map((produce) => (
          <div 
            key={produce.id} 
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onViewProduce(produce)}
          >
            <div className="flex">
              <img 
                src={produce.images[0] || "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg"} 
                alt={produce.name}
                className="w-24 h-24 object-cover"
              />
              
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">{produce.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Shield size={14} className="text-green-600" />
                        <span className="text-xs text-green-600 font-medium">Verified</span>
                      </div>
                    </div>
                    
                    {produce.variety && (
                      <p className="text-sm text-gray-600 mb-1">{produce.variety}</p>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span>{produce.location}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">₹{produce.currentPrice}</p>
                    <p className="text-xs text-gray-500">per {produce.unit}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Package size={14} />
                      <span>{produce.quantity} {produce.unit}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{formatTimeAgo(produce.harvestDate)}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewProduce(produce);
                    }}
                    className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                  >
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {produce.bids.length > 0 && (
                      <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded-full">
                        <Star size={12} className="text-orange-600" />
                        <span className="text-xs text-orange-700 font-medium">
                          {produce.bids.length} bids
                        </span>
                      </div>
                    )}
                    
                    <button className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                      <Eye size={16} className="text-blue-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {produce.description && (
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {produce.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredProduces.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 font-medium">कोई फसल नहीं मिली</p>
          <p className="text-sm text-gray-400">No produce found matching your criteria</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCrop('all');
              setSelectedLocation('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            फिल्टर साफ़ करें / Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TraderListings;