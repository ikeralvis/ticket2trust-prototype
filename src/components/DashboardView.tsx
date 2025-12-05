import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { showToast } from './Toast';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer} from 'recharts';
import {
    TrendingUp,
    Coins,
    Target,
    Plus,
    MapPin,
    BarChart3,
    X,
    ShieldCheck,
    DollarSign,
    Users
} from 'lucide-react';
import { dailyStats } from '../data/initialData';

export const DashboardView: React.FC = () => {
    const { campaigns, addCampaign, totalTokensDistributed, totalVerifiedSales, totalRevenue, locations } = useApp();
    const [showModal, setShowModal] = useState(false);
    const [newCampaign, setNewCampaign] = useState({
        brand: '',
        targetProduct: '',
        reward: 0,
        budget: 0
    });

    const roi = totalTokensDistributed > 0
        ? ((totalVerifiedSales * 150) / totalTokensDistributed * 100).toFixed(1)
        : 0;

    const handleCreateCampaign = () => {
        if (!newCampaign.brand || !newCampaign.targetProduct || !newCampaign.reward || !newCampaign.budget) {
            showToast('Por favor completa todos los campos', 'error');
            return;
        }

        addCampaign({
            brand: newCampaign.brand,
            targetProduct: newCampaign.targetProduct,
            reward: newCampaign.reward,
            budget: newCampaign.budget,
            active: true
        });

        showToast('¡Campaña creada exitosamente!', 'success');
        setShowModal(false);
        setNewCampaign({ brand: '', targetProduct: '', reward: 0, budget: 0 });
    };

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto">
            {/* Header - Nike Style */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-gray-500 mt-1">Panel de control para gestión de campañas</p>
            </div>

            {/* KPI Cards - Clean Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="card">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-xl bg-gray-100">
                            <DollarSign className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">+12%</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{(totalRevenue / 1000).toFixed(1)}k€</p>
                    <p className="text-sm text-gray-500 mt-1">Ingresos Totales</p>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-xl bg-gray-100">
                            <Coins className="w-5 h-5 text-gray-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{totalTokensDistributed.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">Tokens Distribuidos</p>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-xl bg-gray-100">
                            <Users className="w-5 h-5 text-gray-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{totalVerifiedSales.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 mt-1">Ventas Verificadas</p>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-xl bg-gray-100">
                            <TrendingUp className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">+8%</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{roi}%</p>
                    <p className="text-sm text-gray-500 mt-1">ROI Estimado</p>
                </div>
            </div>

            {/* Privacy Notice - Minimal */}
            <div className="mb-8 p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-gray-900 font-medium">Zero-Knowledge Analytics</h3>
                    <p className="text-gray-500 text-sm mt-1">
                        Todos los datos son anónimos. Las ventas se verifican mediante pruebas criptográficas sin revelar identidades.
                    </p>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Daily Revenue Chart */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900">Ingresos por Día</h3>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailyStats}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                                <Tooltip
                                    contentStyle={{
                                        background: '#FFFFFF',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                    formatter={(value: number) => [`${value.toLocaleString()}€`, 'Ingresos']}
                                />
                                <Bar dataKey="revenue" radius={[4, 4, 0, 0]} fill="#111827" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Location Heatmap */}
                <div className="card">
                    <div className="flex items-center gap-2 mb-6">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900">Ventas por Ciudad</h3>
                    </div>
                    <div className="space-y-4">
                        {locations.map((loc) => {
                            const maxRevenue = Math.max(...locations.map(l => l.revenue));
                            const percentage = (loc.revenue / maxRevenue) * 100;

                            return (
                                <div key={loc.city} className="flex items-center gap-4">
                                    <span className="w-20 text-sm text-gray-600 font-medium">{loc.city}</span>
                                    <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                                        <div
                                            className="h-full rounded-lg transition-all duration-500 bg-gray-900"
                                            style={{ width: `${percentage}%` }}
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <span className="text-sm font-semibold text-gray-600">
                                                {(loc.revenue / 1000).toFixed(1)}k€
                                            </span>
                                            <span className="text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                                {loc.validations}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Campaign Manager */}
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900">Gestor de Campañas</h3>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn-primary flex items-center gap-2 text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Nueva Campaña
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>Marca</th>
                                <th>Producto Objetivo</th>
                                <th>Recompensa</th>
                                <th>Reclamados</th>
                                <th>Presupuesto</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map(campaign => (
                                <tr key={campaign.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">{campaign.brand.charAt(0)}</span>
                                            </div>
                                            <span className="font-medium text-gray-900">{campaign.brand}</span>
                                        </div>
                                    </td>
                                    <td className="text-gray-600">{campaign.targetProduct}</td>
                                    <td>
                                        <span className="text-green-600 font-semibold">+{campaign.reward} tokens</span>
                                    </td>
                                    <td className="text-gray-600">{campaign.claimedCount}</td>
                                    <td className="text-gray-600">{campaign.budget.toLocaleString()}€</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${campaign.active
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {campaign.active ? 'Activa' : 'Inactiva'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Campaign Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative w-full max-w-md card shadow-2xl">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>

                        <h2 className="text-xl font-bold text-gray-900 mb-6">Nueva Campaña</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Nombre de la Marca</label>
                                <input
                                    type="text"
                                    value={newCampaign.brand}
                                    onChange={e => setNewCampaign(prev => ({ ...prev, brand: e.target.value }))}
                                    placeholder="Ej: Nike, Adidas..."
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-600 mb-2">Producto a Incentivar (SKU)</label>
                                <input
                                    type="text"
                                    value={newCampaign.targetProduct}
                                    onChange={e => setNewCampaign(prev => ({ ...prev, targetProduct: e.target.value }))}
                                    placeholder="Ej: Nike Air Max 90"
                                    className="w-full"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Tokens Bonus</label>
                                    <input
                                        type="number"
                                        value={newCampaign.reward || ''}
                                        onChange={e => setNewCampaign(prev => ({ ...prev, reward: parseInt(e.target.value) || 0 }))}
                                        placeholder="50"
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-2">Presupuesto (€)</label>
                                    <input
                                        type="number"
                                        value={newCampaign.budget || ''}
                                        onChange={e => setNewCampaign(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                                        placeholder="10000"
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleCreateCampaign}
                                className="w-full btn-primary mt-4"
                            >
                                Crear Campaña
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
