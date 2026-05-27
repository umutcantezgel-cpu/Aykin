import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../useStore';
import { useTransition } from '../useTransition';

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState({
      cart: [],
      isCartOpen: false,
      orderType: 'pickup',
      total: 0,
    });
  });

  it('should add item to cart', () => {
    const item = { id: 'item1', name: 'Waffle', price: 5 };
    useStore.getState().addToCart(item);
    
    expect(useStore.getState().cart).toHaveLength(1);
    expect(useStore.getState().cart[0]).toEqual({ ...item, quantity: 1 });
  });

  it('should increase quantity if item already exists in cart', () => {
    const item = { id: 'item1', name: 'Waffle', price: 5 };
    useStore.getState().addToCart(item);
    useStore.getState().addToCart(item);
    
    expect(useStore.getState().cart).toHaveLength(1);
    expect(useStore.getState().cart[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    const item = { id: 'item1', name: 'Waffle', price: 5 };
    useStore.getState().addToCart(item);
    useStore.getState().removeFromCart('item1');
    
    expect(useStore.getState().cart).toHaveLength(0);
  });

  it('should update quantity', () => {
    const item = { id: 'item1', name: 'Waffle', price: 5 };
    useStore.getState().addToCart(item);
    useStore.getState().updateQuantity('item1', 3);
    
    expect(useStore.getState().cart[0].quantity).toBe(3);
  });

  it('should remove item if quantity updated to 0', () => {
    const item = { id: 'item1', name: 'Waffle', price: 5 };
    useStore.getState().addToCart(item);
    useStore.getState().updateQuantity('item1', 0);
    
    expect(useStore.getState().cart).toHaveLength(0);
  });

  it('should clear cart', () => {
    const item = { id: 'item1', name: 'Waffle', price: 5 };
    useStore.getState().addToCart(item);
    useStore.getState().clearCart();
    
    expect(useStore.getState().cart).toHaveLength(0);
  });

  it('should toggle cart open state', () => {
    useStore.getState().openCart();
    expect(useStore.getState().isCartOpen).toBe(true);
    
    useStore.getState().closeCart();
    expect(useStore.getState().isCartOpen).toBe(false);
  });
});

describe('useTransition', () => {
  beforeEach(() => {
    useTransition.setState({ isBusy: false });
  });

  it('should toggle transition state', () => {
    useTransition.getState().setBusy(true);
    expect(useTransition.getState().isBusy).toBe(true);
    
    useTransition.getState().setBusy(false);
    expect(useTransition.getState().isBusy).toBe(false);
  });
});
