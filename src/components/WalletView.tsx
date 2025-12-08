import React from 'react';
import { useApp } from '../context/AppContext';
import { TicketCard } from './TicketCard';
import { QRCodeSVG } from 'qrcode.react';
import {
    Wallet,
    Receipt,
    Copy,
    TrendingUp
} from 'lucide-react';
import { showToast } from './Toast';

export const WalletView: React.FC = () => {
    const { user, tickets } = useApp();

    const copyQR = () => {
        navigator.clipboard.writeText(user.qrCode);
        showToast('Código QR copiado', 'info');
    };

    // Calculate recent tokens earned
    const recentTokens = tickets.slice(0, 3).reduce((acc, t) => acc + t.tokensEarned, 0);

    return (
        <div className="min-h-screen pb-24">
            {/* Main Container - Mobile First */}
            <div className="max-w-md mx-auto px-4 py-6 space-y-6">

                {/* QR Code Section - Prominent */}
                <div className="card text-center">
                    <h2 className="text-sm font-medium text-gray-500 mb-4">Tu código QR personal</h2>

                    {/* QR Code */}
                    <div className="inline-flex p-4 bg-white rounded-2xl border-2 border-gray-100 shadow-sm">
                        <QRCodeSVG
                            value={user.qrCode}
                            size={180}
                            level="H"
                            includeMargin={false}
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                        />
                    </div>

                    {/* QR Code Text */}
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <code className="text-sm text-gray-600 font-mono bg-gray-100 px-3 py-1.5 rounded-lg">
                            {user.qrCode}
                        </code>
                        <button
                            onClick={copyQR}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-3">
                        Presenta este código en tienda para acumular tokens
                    </p>
                </div>

                {/* Token Balance Card */}
                <div className="card bg-gradient-to-br from-gray-900 to-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Balance de Tokens</p>
                            <p className="text-4xl font-bold text-white mt-1">{user.tokenBalance}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <TrendingUp className="w-3 h-3 text-green-400" />
                                <span className="text-xs text-green-400">+{recentTokens} últimas compras</span>
                            </div>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                            <Wallet className="w-7 h-7 text-white" />
                        </div>
                    </div>

                    {/* Token Reward Info */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span>Ganas el <strong className="text-white">10%</strong> del valor de cada compra</span>
                        </div>
                    </div>
                </div>

                {/* My Purchases Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Receipt className="w-5 h-5 text-gray-400" />
                            <h2 className="text-lg font-semibold text-gray-900">Mis Compras</h2>
                            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-500">
                                {tickets.length}
                            </span>
                        </div>
                    </div>

                    {/* Tickets List */}
                    <div className="space-y-3">
                        {tickets.map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                    </div>

                    {tickets.length === 0 && (
                        <div className="text-center py-12">
                            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No tienes tickets aún</p>
                            <p className="text-gray-400 text-sm">Tus compras aparecerán aquí</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};
