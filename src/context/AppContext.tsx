import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Ticket, Campaign, UserState, ValidationResult } from '../types';
import { initialTickets, initialCampaigns, generateDID, generateQRCode, storeProducts, locationData, calculateTokens, getProductCategory } from '../data/initialData';

interface AppContextType {
    // View mode
    viewMode: 'wallet' | 'dashboard';
    setViewMode: (mode: 'wallet' | 'dashboard') => void;

    // User state
    user: UserState;

    // Tickets
    tickets: Ticket[];
    addTicket: () => void;

    // Campaigns
    campaigns: Campaign[];
    addCampaign: (campaign: Omit<Campaign, 'id' | 'claimedCount'>) => void;

    // Validation
    validateCampaign: (campaignId: number) => Promise<ValidationResult>;
    isValidating: boolean;

    // Stats
    totalTokensDistributed: number;
    totalVerifiedSales: number;
    totalRevenue: number;
    locations: typeof locationData;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [viewMode, setViewMode] = useState<'wallet' | 'dashboard'>('wallet');
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
    const [tokenBalance, setTokenBalance] = useState(125);
    const [isValidating, setIsValidating] = useState(false);
    const [userDID] = useState(generateDID());
    const [userQR] = useState(generateQRCode());

    const user: UserState = {
        did: userDID,
        qrCode: userQR,
        tokenBalance,
        tickets
    };

    const addTicket = () => {
        const randomStore = storeProducts[Math.floor(Math.random() * storeProducts.length)];
        const randomProduct = randomStore.products[Math.floor(Math.random() * randomStore.products.length)];
        const locations = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const price = Math.floor(Math.random() * 150) + 50;
        const tokensEarned = calculateTokens(price);

        const newTicket: Ticket = {
            id: Date.now(),
            store: randomStore.store,
            product: randomProduct,
            price,
            date: new Date().toISOString().split('T')[0],
            redeemed: false,
            location: randomLocation,
            category: getProductCategory(randomProduct),
            tokensEarned
        };

        // Add tokens automatically (10% of purchase)
        setTokenBalance(prev => prev + tokensEarned);
        setTickets(prev => [newTicket, ...prev]);
    };

    const addCampaign = (campaign: Omit<Campaign, 'id' | 'claimedCount'>) => {
        const newCampaign: Campaign = {
            ...campaign,
            id: Date.now(),
            claimedCount: 0
        };
        setCampaigns(prev => [...prev, newCampaign]);
    };

    const validateCampaign = async (campaignId: number): Promise<ValidationResult> => {
        setIsValidating(true);

        // Simulate ZK-Proof generation delay
        await new Promise(resolve => setTimeout(resolve, 2500));

        const campaign = campaigns.find(c => c.id === campaignId);
        if (!campaign) {
            setIsValidating(false);
            return { success: false, message: 'Campaña no encontrada' };
        }

        const matchingTicket = tickets.find(
            t => t.product === campaign.targetProduct && !t.redeemed
        );

        if (matchingTicket) {
            // Mark ticket as redeemed
            setTickets(prev =>
                prev.map(t =>
                    t.id === matchingTicket.id ? { ...t, redeemed: true } : t
                )
            );

            // Update campaign claimed count
            setCampaigns(prev =>
                prev.map(c =>
                    c.id === campaignId ? { ...c, claimedCount: c.claimedCount + 1 } : c
                )
            );

            // Add bonus tokens from campaign
            setTokenBalance(prev => prev + campaign.reward);

            setIsValidating(false);
            return {
                success: true,
                message: '¡Recompensa reclamada con éxito!',
                tokensEarned: campaign.reward
            };
        }

        setIsValidating(false);
        return {
            success: false,
            message: 'No se encontró credencial válida para esta campaña'
        };
    };

    const totalTokensDistributed = campaigns.reduce(
        (acc, c) => acc + (c.claimedCount * c.reward), 0
    );

    const totalVerifiedSales = campaigns.reduce(
        (acc, c) => acc + c.claimedCount, 0
    );

    const totalRevenue = locationData.reduce(
        (acc, l) => acc + l.revenue, 0
    );

    return (
        <AppContext.Provider value={{
            viewMode,
            setViewMode,
            user,
            tickets,
            addTicket,
            campaigns,
            addCampaign,
            validateCampaign,
            isValidating,
            totalTokensDistributed,
            totalVerifiedSales,
            totalRevenue,
            locations: locationData
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
