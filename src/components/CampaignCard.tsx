import React, { useState } from 'react';
import type { Campaign } from '../types';
import { useApp } from '../context/AppContext';
import { showToast } from './Toast';
import { Gift, Loader2, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

interface CampaignCardProps {
    campaign: Campaign;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
    const { validateCampaign, isValidating, tickets } = useApp();
    const [localValidating, setLocalValidating] = useState(false);
    const [showPrivacyMessage, setShowPrivacyMessage] = useState(false);

    // Check if user has a matching ticket
    const hasMatchingTicket = tickets.some(
        t => t.product === campaign.targetProduct && !t.redeemed
    );

    const handleClaim = async () => {
        if (localValidating || isValidating) return;

        setLocalValidating(true);
        const result = await validateCampaign(campaign.id);
        setLocalValidating(false);

        if (result.success) {
            showToast(`¡+${result.tokensEarned} tokens bonus ganados!`, 'success');
            setShowPrivacyMessage(true);
            setTimeout(() => setShowPrivacyMessage(false), 5000);
        } else {
            showToast(result.message, 'error');
        }
    };

    return (
        <div className="card relative overflow-hidden group">
            <div className="relative z-10">
                <div className="flex items-start gap-4">
                    {/* Brand icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">{campaign.brand.charAt(0)}</span>
                    </div>

                    <div className="flex-1">
                        {/* Brand name */}
                        <span className="text-xs text-gray-500 uppercase tracking-wider">{campaign.brand}</span>

                        {/* Campaign target */}
                        <h3 className="text-gray-900 font-semibold mt-1">{campaign.targetProduct}</h3>

                        {/* Reward badge */}
                        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-green-50 border border-green-200">
                            <Gift className="w-4 h-4 text-green-600" />
                            <span className="text-green-600 font-bold">+{campaign.reward} tokens bonus</span>
                        </div>
                    </div>
                </div>

                {/* Claim button */}
                <div className="mt-4">
                    {localValidating ? (
                        <div className="w-full py-3 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center gap-3">
                            <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                            <span className="text-gray-600 text-sm font-medium">
                                Generando ZK-Proof...
                            </span>
                        </div>
                    ) : (
                        <button
                            onClick={handleClaim}
                            disabled={isValidating}
                            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${hasMatchingTicket
                                ? 'bg-gray-900 text-white hover:bg-gray-800'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <Sparkles className="w-4 h-4" />
                            Reclamar Bonus
                        </button>
                    )}
                </div>

                {/* Privacy message */}
                {showPrivacyMessage && (
                    <div className="mt-3 p-3 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3 animate-fade-in">
                        <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-green-700 text-sm font-medium">¡Privacidad protegida!</p>
                            <p className="text-green-600 text-xs mt-1">
                                Tus datos personales no han sido compartidos. Solo la prueba matemática.
                            </p>
                        </div>
                    </div>
                )}

                {/* Matching ticket indicator */}
                {!hasMatchingTicket && !localValidating && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <AlertCircle className="w-4 h-4" />
                        <span>Necesitas comprar este producto para reclamar</span>
                    </div>
                )}

                {/* Claims counter */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>{campaign.claimedCount} usuarios han reclamado</span>
                    <span className="text-gray-600">{Math.round((campaign.claimedCount * campaign.reward / campaign.budget) * 100)}% usado</span>
                </div>
            </div>
        </div>
    );
};
