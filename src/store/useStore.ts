import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  variant?: string;
};

interface OrderData {
  orderId?: string;
  orderNumber?: string;
  pickupDate?: string;
  pickupTime?: string;
  name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  address?: {
    street: string;
    zip: string;
    city: string;
  };
  promoCode?: string;
  discountValue?: number;
}

export type OrderType = "pickup" | "delivery" | "in-store" | null;

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  orderType: OrderType;
  orderData: OrderData;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, q: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  setCart: (cart: CartItem[]) => void;
  updateOrderData: (data: Partial<OrderData>) => void;
  clearOrderData: () => void;
  total: number;
}

const computeTotal = (cart: CartItem[]) => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      orderType: null,
      orderData: {},
      total: 0,
      addToCart: (item) => set((s) => {
        const exists = s.cart.find(c => c.id === item.id);
        const newCart = exists
          ? s.cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
          : [...s.cart, { ...item, quantity: 1 }];
        return { cart: newCart, total: computeTotal(newCart) };
      }),
      removeFromCart: (id) => set((s) => {
        const newCart = s.cart.filter(c => c.id !== id);
        return { cart: newCart, total: computeTotal(newCart) };
      }),
      updateQuantity: (id, q) => set((s) => {
        const newCart = q <= 0
          ? s.cart.filter(c => c.id !== id)
          : s.cart.map(c => c.id === id ? { ...c, quantity: q } : c);
        return { cart: newCart, total: computeTotal(newCart) };
      }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
      clearCart: () => set({ cart: [], total: 0 }),
      setCart: (cart) => set({ cart, total: computeTotal(cart) }),
      setOrderType: (type) => set({ orderType: type }),
      updateOrderData: (data) => set((s) => ({ orderData: { ...s.orderData, ...data } })),
      clearOrderData: () => set({ orderData: {}, orderType: null }),
    }),
    {
      name: 'aykin-cart',
      partialize: (state) => ({ cart: state.cart, orderType: state.orderType, orderData: state.orderData })
    }
  )
);
