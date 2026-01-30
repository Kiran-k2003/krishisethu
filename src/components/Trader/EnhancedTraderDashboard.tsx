import React from 'react';
import { 
  Package, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Eye,
  ShoppingCart,
  CreditCard,
  Bell,
  Star,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Produce, Transaction } from '../../types';

interface EnhancedTraderDashboardProps {
  availableProduce: Produce[];
  myBids: any[];
  myTransactions: Transaction[];
  onViewProduce: () => void;
  onViewBids: () => void;
  onViewTransactions: () => void;
  onViewPayments: () => void;
}

const EnhancedTraderDashboard: React.FC<EnhancedTraderDashboardProps> = ({ 
  availableProduce, 
  myBids = [],
  myTransactions,
  onViewProduce,
  onViewBids,
  onViewTransactions,
  onViewPayments
}) => {
  const activeBids = myBids.filter(bid => bid.status === 'pending').length;
  const completedDeals = myTransactions.filter(t => t.status === 'completed').length;
  const totalProduce = availableProduce.length;
  const pendingPayments = myTransactions.filter(t => t.status === 'confirmed').length;

  // Mock recent activity data
  const recentActivity = [
    { type: 'bid_placed', message: 'गेहूं पर बोली लगाई', time: '2 hours ago', amount: 2300 },
    { type: 'bid_accepted', message: 'धान की बोली स्वीकार', time: '1 day ago', amount: 1950 },
    { type: 'payment_completed', message: 'भुगतान पूर्ण', time: '2 days ago', amount: 115000 }
  ];

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">नमस्ते व्यापारी जी!</h2>
            <p className="text-blue-100 text-sm">Welcome Trader!</p>
            <p className="text-blue-200 text-xs mt-1">Ready to find great deals?</p>
          </div>
          <div className="relative">
            <Bell size={24} />
            {(activeBids > 0 || pendingPayments > 0) && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{activeBids + pendingPayments}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalProduce}</p>
              <p className="text-sm text-gray-600 font-medium">उपलब्ध फसलें</p>
              <p className="text-xs text-gray-500">Available Produce</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">{activeBids}</p>
              <p className="text-sm text-gray-600 font-medium">सक्रिय बोलियां</p>
              <p className="text-xs text-gray-500">Active Bids</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">त्वरित कार्य / Quick Actions</h3>
        
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={onViewProduce}
            className="bg-blue-600 text-white p-4 rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <ShoppingCart size={24} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-lg">फसल खरीदें</p>
                <p className="text-blue-100 text-sm">Browse Available Produce</p>
              </div>
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onViewBids}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
                <p className="font-semibold text-gray-800">मेरी बोलियां</p>
                <p className="text-xs text-gray-500">My Bids</p>
              </div>
            </button>

            <button
              onClick={onViewTransactions}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <p className="font-semibold text-gray-800">खरीदारी</p>
                <p className="text-xs text-gray-500">Purchases</p>
              </div>
            </button>

            <button
              onClick={onViewPayments}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CreditCard size={24} className="text-purple-600" />
                </div>
                <p className="font-semibold text-gray-800">भुगतान</p>
                <p className="text-xs text-gray-500">Payments</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Latest Available Produce */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">नवीनतम फसलें</h3>
              <p className="text-sm text-gray-600">Latest Available Produce</p>
            </div>
            <button
              onClick={onViewProduce}
              className="text-blue-600 text-sm font-medium hover:text-blue-700"
            >
              सभी देखें / View All
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {availableProduce.length === 0 ? (
            <div className="text-center py-8">
              <Package size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 font-medium">कोई फसल उपलब्ध नहीं</p>
              <p className="text-sm text-gray-400">No produce available at the moment</p>
            </div>
          ) : (
            <div className="space-y-3">
              {availableProduce.slice(0, 4).map((produce) => (
                <div key={produce.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                  <img 
                    src={produce.images[0] || "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg"} 
                    alt={produce.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{produce.name}</p>
                    <p className="text-sm text-gray-600">{produce.location}</p>
                    <p className="text-xs text-gray-500">{produce.quantity} {produce.unit}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{produce.currentPrice}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">{produce.bids.length} bids</span>
                      {produce.bids.length > 0 && (
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* My Active Bids */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">मेरी सक्रिय बोलियां</h3>
              <p className="text-sm text-gray-600">My Active Bids</p>
            </div>
            <button
              onClick={onViewBids}
              className="text-orange-600 text-sm font-medium hover:text-orange-700"
            >
              सभी देखें / View All
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {activeBids === 0 ? (
            <div className="text-center py-8">
              <TrendingUp size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500 font-medium">कोई सक्रिय बोली नहीं</p>
              <p className="text-sm text-gray-400 mb-4">No active bids at the moment</p>
              <button
                onClick={onViewProduce}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                फसल खोजें / Browse Produce
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Mock bid data */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">गेहूं (Wheat) - 50 क्विंटल</p>
                  <p className="text-sm text-gray-600">Khadakwasla, Pune</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-orange-600">₹2,300</p>
                  <div className="flex items-center space-x-1">
                    <Clock size={12} className="text-orange-500" />
                    <span className="text-xs text-orange-600">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">हाल की गतिविधि</h3>
          <p className="text-sm text-gray-600">Recent Activity</p>
        </div>
        
        <div className="p-4 space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'bid_placed' ? 'bg-blue-100' :
                activity.type === 'bid_accepted' ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                {activity.type === 'bid_placed' && <TrendingUp size={16} className="text-blue-600" />}
                {activity.type === 'bid_accepted' && <CheckCircle size={16} className="text-green-600" />}
                {activity.type === 'payment_completed' && <CreditCard size={16} className="text-purple-600" />}
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">₹{activity.amount.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Status */}
      {pendingPayments > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <CreditCard size={20} className="text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-yellow-800">भुगतान लंबित</p>
              <p className="text-sm text-yellow-700">
                {pendingPayments} payments pending
              </p>
            </div>
            <button 
              onClick={onViewPayments}
              className="text-yellow-700 font-medium text-sm hover:text-yellow-800"
            >
              देखें / View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTraderDashboard;