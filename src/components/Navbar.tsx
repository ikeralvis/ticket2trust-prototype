import React from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, LayoutDashboard, Store } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { viewMode, setViewMode, user } = useApp();

    return (
        <nav className="sticky top-0 z-40 w-full glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                            <span className="text-white font-bold text-lg">T2</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Ticket2Trust</h1>
                            <p className="text-xs text-gray-500">Zero-Knowledge Rewards</p>
                        </div>
                    </div>

                    {/* Role Switch */}
                    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
                        <button
                            onClick={() => setViewMode('wallet')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${viewMode === 'wallet'
                                ? 'bg-black text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Wallet className="w-4 h-4" />
                            <span className="hidden sm:inline">Wallet</span>
                        </button>
                        <button
                            onClick={() => setViewMode('dashboard')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${viewMode === 'dashboard'
                                ? 'bg-black text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </button>
                        <button
                            onClick={() => setViewMode('store')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${viewMode === 'store'
                                ? 'bg-black text-white shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Store className="w-4 h-4" />
                            <span className="hidden sm:inline">Tienda TPV</span>
                        </button>
                    </div>

                    {/* Token Balance (visible in wallet mode) */}
                    {viewMode === 'wallet' && (
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 border border-green-200">
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white">
                                T
                            </div>
                            <span className="text-green-700 font-semibold">{user.tokenBalance}</span>
                            <span className="text-gray-500 text-sm">tokens</span>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
