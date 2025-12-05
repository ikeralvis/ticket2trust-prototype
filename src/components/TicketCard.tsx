import React from 'react';
import type { Ticket } from '../types';
import { CheckCircle, MapPin, Calendar, ShoppingBag } from 'lucide-react';

interface TicketCardProps {
    ticket: Ticket;
}

const categoryIcons: Record<string, string> = {
    'zapatillas': '👟',
    'ropa': '👕',
    'accesorios': '🎒'
};

const categoryLabels: Record<string, string> = {
    'zapatillas': 'Zapatillas',
    'ropa': 'Ropa',
    'accesorios': 'Accesorios'
};

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    return (
        <div className={`card relative overflow-hidden ${ticket.redeemed ? 'opacity-60' : ''}`}>
            {/* Ticket perforated edge */}
            <div className="absolute top-0 left-0 right-0 flex justify-between px-2">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gray-100 rounded-full -mt-1" />
                ))}
            </div>

            {/* Redeemed badge */}
            {ticket.redeemed && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Canjeado</span>
                </div>
            )}

            <div className="flex items-start gap-4 pt-2">
                {/* Category icon */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-2xl">
                    {categoryIcons[ticket.category] || '📦'}
                </div>

                <div className="flex-1 min-w-0">
                    {/* Store and category */}
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            {ticket.store}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs text-gray-400">
                            {categoryLabels[ticket.category]}
                        </span>
                    </div>

                    {/* Product name */}
                    <h3 className="text-gray-900 font-semibold truncate">{ticket.product}</h3>

                    {/* Details row */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(ticket.date).toLocaleDateString('es-ES')}</span>
                        </div>
                        {ticket.location && (
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{ticket.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Price and tokens */}
                <div className="text-right flex-shrink-0">
                    <span className="text-lg font-bold text-red-600">-{ticket.price}€</span>
                    <div className="flex items-center gap-1 justify-end mt-1">
                        <span className="text-sm font-semibold text-green-600">+{ticket.tokensEarned}</span>
                        <span className="text-xs text-gray-400">tokens</span>
                    </div>
                </div>
            </div>

            {/* Bottom info */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Ticket Digital</span>
                </div>
                <code className="text-xs text-gray-400 font-mono">
                    #{ticket.id.toString().slice(-6)}
                </code>
            </div>
        </div>
    );
};
