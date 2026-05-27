import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMenu } from '../useMenu';
import * as firestore from 'firebase/firestore';

vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    onSnapshot: vi.fn(),
  };
});

vi.mock('@/lib/firebase', () => ({
  db: {},
}));

describe('useMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch menu items and update state', async () => {
    const mockData = [
      { id: '1', data: () => ({ name: 'Waffle', category: 'Waffles' }) },
      { id: '2', data: () => ({ name: 'Coffee', category: 'Drinks' }) },
    ];
    
    // Mock onSnapshot implementation
    vi.mocked(firestore.onSnapshot).mockImplementation((query, callback) => {
      // @ts-ignore
      callback({ docs: mockData });
      return vi.fn(); // unsubscribe function
    });

    const { result } = renderHook(() => useMenu());

    // Initially loading might be true, but synchronous mock callback updates it immediately
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.items[0].name).toBe('Waffle');
    expect(result.current.error).toBeNull();
  });

  it('should handle errors in onSnapshot', async () => {
    const mockError = new Error('Permission denied');
    
    vi.mocked(firestore.onSnapshot).mockImplementation((query, callback, errorCallback) => {
      // @ts-ignore
      errorCallback(mockError);
      return vi.fn();
    });

    const { result } = renderHook(() => useMenu());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(mockError);
    expect(result.current.items).toHaveLength(0);
  });

  it('should query by category if provided', () => {
    renderHook(() => useMenu('boxen'));
    expect(firestore.where).toHaveBeenCalledWith('category', '==', 'boxen');
  });
});
