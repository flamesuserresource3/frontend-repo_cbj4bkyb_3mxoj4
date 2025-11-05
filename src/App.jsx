import React from 'react';
import Hero from './components/Hero';
import StatsDashboard from './components/StatsDashboard';
import WalletManager from './components/WalletManager';
import MiningConsole from './components/MiningConsole';

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Hero />
      <StatsDashboard />
      <WalletManager />
      <MiningConsole />
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/50">
        Built for a futuristic crypto experience • Demo UI only
      </footer>
    </div>
  );
}

export default App;
