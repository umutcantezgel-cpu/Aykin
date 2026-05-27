import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../src/store/useStore';

describe('useStore — Cart', () => {
  beforeEach(() => {
    useStore.getState().clearCart();
    useStore.getState().closeCart();
  });

  it('addToCart adds a new item', () => {
    useStore.getState().addToCart({ id: '1', name: 'Waffle', price: 6.9 });
    const state = useStore.getState();
    expect(state.cart.length).toBe(1);
    expect(state.cart[0]).toEqual({ id: '1', name: 'Waffle', price: 6.9, quantity: 1 });
  });

  it('addToCart increments quantity for existing items', () => {
    useStore.getState().addToCart({ id: '1', name: 'Waffle', price: 6.9 });
    useStore.getState().addToCart({ id: '1', name: 'Waffle', price: 6.9 });
    const state = useStore.getState();
    expect(state.cart.length).toBe(1);
    expect(state.cart[0].quantity).toBe(2);
  });

  it('removeFromCart removes the item', () => {
    useStore.getState().addToCart({ id: '1', name: 'Waffle', price: 6.9 });
    useStore.getState().removeFromCart('1');
    expect(useStore.getState().cart.length).toBe(0);
  });

  it('updateQuantity updates the quantity', () => {
    useStore.getState().addToCart({ id: '1', name: 'Waffle', price: 6.9 });
    useStore.getState().updateQuantity('1', 5);
    expect(useStore.getState().cart[0].quantity).toBe(5);
  });

  it('updateQuantity removes the item if quantity is <= 0', () => {
    useStore.getState().addToCart({ id: '1', name: 'Waffle', price: 6.9 });
    useStore.getState().updateQuantity('1', 0);
    expect(useStore.getState().cart.length).toBe(0);
  });

  it('total computes correctly', () => {
    useStore.getState().addToCart({ id: '1', name: 'A', price: 5 });
    useStore.getState().addToCart({ id: '2', name: 'B', price: 3 });
    useStore.getState().updateQuantity('2', 2); // 2 * 3 = 6 + 5 = 11
    expect(useStore.getState().total).toBe(11);
  });

  it('cart UI state toggles correctly', () => {
    useStore.getState().openCart();
    expect(useStore.getState().isCartOpen).toBe(true);
    useStore.getState().closeCart();
    expect(useStore.getState().isCartOpen).toBe(false);
  });
});
