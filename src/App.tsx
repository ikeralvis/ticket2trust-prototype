import { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { WalletView } from './components/WalletView';
import { DashboardView } from './components/DashboardView';
import { StoreView } from './components/StoreView';
import { ToastContainer } from './components/Toast';
import './index.css';

// Custom hook to detect mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const AppContent = () => {
  const { viewMode } = useApp();
  const isMobile = useIsMobile();

  // Render the appropriate view
  const renderView = () => {
    // On mobile, always show wallet (no navigation available)
    if (isMobile) {
      return <WalletView />;
    }

    // On desktop, show based on viewMode
    switch (viewMode) {
      case 'store':
        return <StoreView />;
      case 'dashboard':
        return <DashboardView />;
      case 'wallet':
      default:
        return <WalletView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hide navbar on mobile */}
      {!isMobile && <Navbar />}
      <main>
        {renderView()}
      </main>
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

