import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { WalletView } from './components/WalletView';
import { DashboardView } from './components/DashboardView';
import { ToastContainer } from './components/Toast';
import './index.css';

const AppContent = () => {
  const { viewMode } = useApp();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main>
        {viewMode === 'wallet' ? <WalletView /> : <DashboardView />}
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
