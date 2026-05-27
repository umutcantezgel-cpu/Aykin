export type MenuItem = {
  id: string;
  name: string;
  price: number;
  desc: string;
  category: string;
  icon: string;
  color: string;
  tag?: string;
  available: boolean;
};

export type Order = {
  id: string;
  userId: string | null;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    variant?: string;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  type: 'pickup' | 'delivery' | 'instore';
  time: string;
  createdAt: Date;
  name: string;
  phone?: string;
  notes?: string;
};

export type User = {
  uid: string;
  email: string;
  name: string;
  phone?: string;
  addresses?: Array<{
    street: string;
    city: string;
    zipCode: string;
  }>;
  role: 'customer' | 'admin';
  createdAt: Date;
  achievements?: string[];
  birthday?: string; // Format: 'MM-DD' or 'YYYY-MM-DD'
};

export type SupportMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  resolved: boolean;
};

export type LoyaltyPointHistory = {
  orderId?: string;
  amount: number;
  type: 'earned' | 'spent';
  date: Date;
};

export type LoyaltyPoints = {
  uid: string;
  balance: number;
  history: LoyaltyPointHistory[];
};

export type PromoCode = {
  code: string;
  discountPercent?: number;
  discountFixed?: number;
  validUntil: Date;
  maxUses: number;
  currentUses: number;
  active: boolean;
};

export type StoreSettings = {
  id: string; // Typically a singleton, e.g. 'general'
  isOnline: boolean;
  currentWaitTime: number; // in minutes
  bannerText?: string;
  emergencyNotice?: string;
};

export type AnalyticsDaily = {
  date: string; // YYYY-MM-DD
  revenue: number;
  orderCount: number;
  topItems: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
};

export type Review = {
  id: string;
  orderId: string;
  uid: string;
  rating: number; // 1 to 5
  comment?: string;
  createdAt: Date;
  approved: boolean;
};

export type DeliveryZone = {
  id: string;
  zipCode: string;
  minOrderValue: number;
  fee: number;
  active: boolean;
};
