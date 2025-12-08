import React from 'react';
import {
    Store,
    QrCode,
    Coins,
    ShoppingBag
} from 'lucide-react';

export const StoreView: React.FC = () => {
    // Static product for demo
    const product = {
        name: 'Nike Air Max 90',
        color: 'White/Infrared',
        price: 120.50,
        quantity: 1
    };

    const subtotal = product.price * product.quantity;
    const tax = subtotal * 0.21; // 21% IVA
    const total = subtotal + tax;
    const tokensToEarn = Math.round(total * 0.1);

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-lg mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white mb-3">
                        <Store className="w-7 h-7" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Terminal Punto de Venta</h1>
                    <p className="text-sm text-gray-500">Foot Locker - Madrid</p>
                </div>

                {/* POS Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Status Header */}
                    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Nueva Venta</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                Listo para pagar
                            </span>
                        </div>
                    </div>

                    {/* Product Item */}
                    <div className="p-6">
                        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                            {/* Product Image */}
                            <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                                <img
                                    src="/nike-air-max-90.png"
                                    alt={product.name}
                                    className="w-full h-full object-contain p-2"
                                    onError={(e) => {
                                        // Fallback to icon if image fails
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                                <ShoppingBag className="w-10 h-10 text-gray-300 hidden" />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-sm text-gray-500">{product.color}</p>
                                <p className="text-xs text-gray-400 mt-1">Cantidad: {product.quantity}</p>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">€{product.price.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Totals Section */}
                        <div className="pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="text-gray-700">€{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">IVA (21%)</span>
                                <span className="text-gray-700">€{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-100">
                                <span className="text-gray-900">TOTAL</span>
                                <span className="text-gray-900">€{total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Token Reward Preview */}
                        <div className="mt-4 flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Coins className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-green-700">Cliente ganará</p>
                                <p className="text-sm font-bold text-green-700">+{tokensToEarn} tokens</p>
                            </div>
                            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                10%
                            </span>
                        </div>
                    </div>

                    {/* Scan QR Button */}
                    <div className="p-6 pt-0">
                        <button
                            className="w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 bg-black text-white hover:bg-gray-800 active:scale-[0.98] transition-all duration-200"
                        >
                            <QrCode className="w-6 h-6" />
                            Escanear QR Wallet
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-3">
                            Escanea el código QR del cliente para completar la venta
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
