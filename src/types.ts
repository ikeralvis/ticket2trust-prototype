export interface Ticket {
    id: number;
    store: string;
    product: string;
    price: number;
    date: string;
    redeemed: boolean;
    location?: string;
    category: ProductCategory;
    tokensEarned: number;
}

export type ProductCategory = 'zapatillas' | 'ropa' | 'accesorios';

export interface Campaign {
    id: number;
    brand: string;
    targetProduct: string;
    reward: number;
    claimedCount: number;
    budget: number;
    active: boolean;
}

export interface UserState {
    did: string;
    qrCode: string;
    tokenBalance: number;
    tickets: Ticket[];
}

export interface ValidationResult {
    success: boolean;
    message: string;
    tokensEarned?: number;
}

export interface LocationData {
    city: string;
    validations: number;
    revenue: number;
}

export interface DailyStats {
    date: string;
    validations: number;
    revenue: number;
}
