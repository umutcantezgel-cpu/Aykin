'use client';

import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { PrimaryCTA } from '@/components/atoms/buttons';

interface NewsletterInputProps {
  className?: string;
}

export function NewsletterInput({ className }: NewsletterInputProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Explode confetti dynamically
      import('canvas-confetti').then(({ default: confetti }) => {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C95039', '#FFB8A6', '#FFF5EE', '#5C4033'] // Terracotta, Peach, Cream, Brown
        });
      });

      // Reset after a while
      setTimeout(() => setStatus('idle'), 3000);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className={twMerge("relative w-full max-w-md", className)}>
      <div className="flex bg-cream p-1 rounded-full border-2 border-peach focus-within:border-terracotta transition-colors duration-300">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Bleib hungrig..."
          className="flex-grow bg-transparent px-4 py-2 outline-none text-charcoal placeholder:text-charcoal/50"
          required
          disabled={status !== 'idle'}
        />
        <PrimaryCTA 
          type="submit" 
          disabled={status !== 'idle'}
          className="py-2 px-6 whitespace-nowrap"
        >
          {status === 'loading' ? '...' : status === 'success' ? 'Dabei!' : 'Abonnieren'}
        </PrimaryCTA>
      </div>
    </form>
  );
}
