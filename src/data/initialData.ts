import type { Ticket, Campaign, LocationData, DailyStats, ProductCategory } from '../types';

// Helper to calculate 10% tokens from price
export const calculateTokens = (price: number): number => {
    return Math.round(price * 0.1);
};

// Helper to get category from product name
export const getProductCategory = (product: string): ProductCategory => {
    const productLower = product.toLowerCase();
    if (productLower.includes('air') || productLower.includes('jordan') ||
        productLower.includes('dunk') || productLower.includes('forum') ||
        productLower.includes('suede') || productLower.includes('574') ||
        productLower.includes('force') || productLower.includes('old skool') ||
        productLower.includes('chuck') || productLower.includes('gel') ||
        productLower.includes('classic') || productLower.includes('ultraboost')) {
        return 'zapatillas';
    }
    if (productLower.includes('camiseta') || productLower.includes('sudadera') ||
        productLower.includes('pantalon') || productLower.includes('chaqueta')) {
        return 'ropa';
    }
    return 'accesorios';
};

export const initialTickets: Ticket[] = [
    {
        id: 1,
        store: "Foot Locker",
        product: "Nike Air Max 90",
        price: 120,
        date: "2023-10-05",
        redeemed: false,
        location: "Madrid",
        category: 'zapatillas',
        tokensEarned: 12
    },
    {
        id: 2,
        store: "JD Sports",
        product: "Adidas Forum",
        price: 100,
        date: "2023-10-08",
        redeemed: false,
        location: "Barcelona",
        category: 'zapatillas',
        tokensEarned: 10
    }
];

export const initialCampaigns: Campaign[] = [
    {
        id: 101,
        brand: "Nike",
        targetProduct: "Nike Air Max 90",
        reward: 50,
        claimedCount: 120,
        budget: 10000,
        active: true
    },
    {
        id: 102,
        brand: "Adidas",
        targetProduct: "Adidas Forum",
        reward: 30,
        claimedCount: 45,
        budget: 5000,
        active: true
    },
    {
        id: 103,
        brand: "Nike",
        targetProduct: "Nike Air Jordan 1",
        reward: 75,
        claimedCount: 89,
        budget: 15000,
        active: true
    },
    {
        id: 104,
        brand: "Puma",
        targetProduct: "Puma Suede Classic",
        reward: 25,
        claimedCount: 67,
        budget: 3000,
        active: true
    }
];

export const locationData: LocationData[] = [
    { city: "Madrid", validations: 156, revenue: 23400 },
    { city: "Barcelona", validations: 124, revenue: 18600 },
    { city: "Valencia", validations: 78, revenue: 11700 },
    { city: "Sevilla", validations: 65, revenue: 9750 },
    { city: "Bilbao", validations: 43, revenue: 6450 },
    { city: "Zaragoza", validations: 38, revenue: 5700 }
];

export const dailyStats: DailyStats[] = [
    { date: "Lun", validations: 45, revenue: 6750 },
    { date: "Mar", validations: 52, revenue: 7800 },
    { date: "Mié", validations: 67, revenue: 10050 },
    { date: "Jue", validations: 58, revenue: 8700 },
    { date: "Vie", validations: 89, revenue: 13350 },
    { date: "Sáb", validations: 112, revenue: 16800 },
    { date: "Dom", validations: 78, revenue: 11700 }
];

export const storeProducts = [
    { store: "Foot Locker", products: ["Nike Air Max 90", "Nike Air Jordan 1", "Adidas Ultraboost"] },
    { store: "JD Sports", products: ["Adidas Forum", "Puma Suede Classic", "New Balance 574"] },
    { store: "Snipes", products: ["Nike Air Force 1", "Vans Old Skool", "Converse Chuck 70"] },
    { store: "Size?", products: ["Asics Gel-Lyte III", "Reebok Classic", "Nike Dunk Low"] }
];

export const generateDID = (): string => {
    const randomHex = Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
    ).join('');
    return `did:eth:0x${randomHex.substring(0, 8)}...${randomHex.substring(32)}`;
};

export const generateQRCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'T2T-';
    for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
