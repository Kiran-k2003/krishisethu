import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';

// Onboarding Components
import SplashScreen from './components/Onboarding/SplashScreen';
import LanguageSelection from './components/Onboarding/LanguageSelection';
import LoginRegistration from './components/Auth/LoginRegistration';

// Layout Components
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';

// Farmer Components
import EnhancedDashboard from './components/Farmer/EnhancedDashboard';
import EnhancedAddProduce from './components/Farmer/EnhancedAddProduce';
import TraderListingsForFarmers from './components/Trader/TraderListingsForFarmers';

// Trader Components
import EnhancedTraderDashboard from './components/Trader/EnhancedTraderDashboard';
import TraderListings from './components/Trader/TraderListings';
import TraderBids from './components/Trader/TraderBids';
import TraderPurchases from './components/Trader/TraderPurchases';
import TraderPayments from './components/Trader/TraderPayments';

// Market Components
import EnhancedMarketPrices from './components/Market/EnhancedMarketPrices';

// Bidding Components
import EnhancedBiddingSystem from './components/Bidding/EnhancedBiddingSystem';

// Chat Components
import EnhancedChatInterface from './components/Chat/EnhancedChatInterface';

// Government Schemes
import GovernmentSchemes from './components/Government/GovernmentSchemes';

// Transaction Tracking
import TransactionTracking from './components/Transaction/TransactionTracking';

// Mock Data
import { 
  mockUsers, 
  mockProduce, 
  mockMarketPrices, 
  mockTransactions, 
  mockGovernmentSchemes,
  mockMessages 
} from './data/mockData';

import { User, Produce, Message } from './types';

type AppState = 'splash' | 'language' | 'auth' | 'main';
type MainView = 'dashboard' | 'market' | 'add' | 'chat' | 'profile' | 'browse' | 'traders' | 'schemes' | 'bidding' | 'tracking' | 'bids' | 'purchases' | 'payments';

function App() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<MainView>('dashboard');
  const [produces, setProduces] = useState<Produce[]>(mockProduce);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedProduce, setSelectedProduce] = useState<Produce | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [chatPartner, setChatPartner] = useState<User | null>(null);

  const handleLogin = (userType: 'farmer' | 'trader') => {
    const user: User = {
      id: userType === 'farmer' ? '1' : '2',
      name: userType === 'farmer' ? 'राम कुमार' : 'श्याम व्यापारी',
      phone: userType === 'farmer' ? '+91-9876543210' : '+91-9876543211',
      type: userType,
      location: userType === 'farmer' ? 'Khadakwasla, Pune' : 'APMC Market, Pune',
      verified: true
    };
    
    setCurrentUser(user);
    setAppState('main');
  };

  const handleAddProduce = (produceData: any) => {
    const newProduce: Produce = {
      id: Date.now().toString(),
      farmerId: currentUser?.id || '1',
      ...produceData,
      bids: []
    };
    
    setProduces([...produces, newProduce]);
    setActiveView('dashboard');
  };

  const handlePlaceBid = (bid: any) => {
    if (!selectedProduce) return;
    
    const newBid = {
      ...bid,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    const updatedProduces = produces.map(p => 
      p.id === selectedProduce.id 
        ? { ...p, bids: [...p.bids, newBid] }
        : p
    );
    
    setProduces(updatedProduces);
    setSelectedProduce(null);
    setActiveView('dashboard');
  };

  const handleSendMessage = (content: string) => {
    if (!currentUser || !chatPartner) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: chatPartner.id,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    setMessages([...messages, newMessage]);
  };

  const handleContactFarmer = () => {
    // Mock farmer contact
    const farmer = mockUsers.find(u => u.type === 'farmer');
    if (farmer) {
      setChatPartner(farmer);
      setActiveView('chat');
    }
  };

  const handleContactTrader = (trader: User) => {
    setChatPartner(trader);
    setActiveView('chat');
  };

  const handleViewProduce = (produce: Produce) => {
    setSelectedProduce(produce);
    setActiveView('bidding');
  };

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setActiveView('tracking');
  };

  const handleBackToDashboard = () => {
    setActiveView('dashboard');
    setSelectedProduce(null);
    setSelectedTransaction(null);
    setChatPartner(null);
  };

  const handleBackToListings = () => {
    setActiveView('browse');
    setSelectedProduce(null);
  };

  const handleBackToChat = () => {
    setActiveView('chat');
    setChatPartner(null);
  };

  // Filter data based on user type
  const userProduces = produces.filter(p => p.farmerId === currentUser?.id);
  const availableProduces = produces.filter(p => p.status === 'active' && p.farmerId !== currentUser?.id);
  const userTransactions = mockTransactions.filter(t => 
    currentUser?.type === 'farmer' ? t.farmerId === currentUser.id : t.traderId === currentUser.id
  );

  if (appState === 'splash') {
    return <SplashScreen onComplete={() => setAppState('language')} />;
  }

  if (appState === 'language') {
    return (
      <LanguageProvider>
        <LanguageSelection onContinue={() => setAppState('auth')} />
      </LanguageProvider>
    );
  }

  if (appState === 'auth') {
    return (
      <LanguageProvider>
        <LoginRegistration onLogin={handleLogin} />
      </LanguageProvider>
    );
  }

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header 
          userName={currentUser.name}
          location={currentUser.location}
          unreadCount={messages.filter(m => !m.read && m.receiverId === currentUser.id).length}
        />

        {/* Main Content */}
        <main className="pt-4 pb-20">
          {/* Farmer Views */}
          {currentUser.type === 'farmer' && (
            <>
              {activeView === 'dashboard' && (
                <EnhancedDashboard
                  produces={userProduces}
                  marketPrices={mockMarketPrices}
                  transactions={userTransactions}
                  onAddProduce={() => setActiveView('add')}
                  onViewPrices={() => setActiveView('market')}
                  onViewSchemes={() => setActiveView('schemes')}
                  onViewTraders={() => setActiveView('traders')}
                />
              )}
              
              {activeView === 'add' && (
                <EnhancedAddProduce
                  onSubmit={handleAddProduce}
                  onBack={handleBackToDashboard}
                  farmerId={currentUser.id}
                />
              )}
              
              {activeView === 'market' && (
                <EnhancedMarketPrices prices={mockMarketPrices} />
              )}
              
              {activeView === 'traders' && (
                <TraderListingsForFarmers
                  traders={mockUsers.filter(u => u.type === 'trader')}
                  myProduce={userProduces}
                  onContactTrader={handleContactTrader}
                />
              )}
              
              {activeView === 'schemes' && (
                <GovernmentSchemes schemes={mockGovernmentSchemes} />
              )}
            </>
          )}

          {/* Trader Views */}
          {currentUser.type === 'trader' && (
            <>
              {activeView === 'dashboard' && (
                <EnhancedTraderDashboard
                  availableProduce={availableProduces}
                  myBids={[]} // Mock empty bids for now
                  myTransactions={userTransactions}
                  onViewProduce={() => setActiveView('browse')}
                  onViewBids={() => setActiveView('bids')}
                  onViewTransactions={() => setActiveView('purchases')}
                  onViewPayments={() => setActiveView('payments')}
                />
              )}
              
              {activeView === 'browse' && (
                <TraderListings
                  produces={availableProduces}
                  onViewProduce={handleViewProduce}
                />
              )}
              
              {activeView === 'bids' && (
                <TraderBids onBack={handleBackToDashboard} />
              )}
              
              {activeView === 'purchases' && (
                <TraderPurchases onViewTransaction={handleViewTransaction} />
              )}
              
              {activeView === 'payments' && (
                <TraderPayments />
              )}
            </>
          )}

          {/* Shared Views */}
          {activeView === 'bidding' && selectedProduce && (
            <EnhancedBiddingSystem
              produce={selectedProduce}
              onPlaceBid={handlePlaceBid}
              currentUserId={currentUser.id}
              onBack={handleBackToListings}
              onContactFarmer={handleContactFarmer}
            />
          )}
          
          {activeView === 'chat' && chatPartner && (
            <EnhancedChatInterface
              currentUser={currentUser}
              otherUser={chatPartner}
              messages={messages.filter(m => 
                (m.senderId === currentUser.id && m.receiverId === chatPartner.id) ||
                (m.senderId === chatPartner.id && m.receiverId === currentUser.id)
              )}
              onSendMessage={handleSendMessage}
              onBack={handleBackToChat}
            />
          )}
          
          {activeView === 'tracking' && selectedTransaction && (
            <TransactionTracking
              transaction={selectedTransaction}
              onBack={handleBackToDashboard}
              onContactSupport={() => console.log('Contact support')}
            />
          )}
        </main>

        {/* Navigation */}
        <Navigation
          activeTab={activeView}
          onTabChange={(tab) => {
            setActiveView(tab as MainView);
            // Reset selected items when changing tabs
            if (tab !== 'bidding') setSelectedProduce(null);
            if (tab !== 'tracking') setSelectedTransaction(null);
            if (tab !== 'chat') setChatPartner(null);
          }}
          userType={currentUser.type}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;