'use client';

import React, { useState } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { FormInput } from './FormInput';
import { PrimaryCTA } from '@/components/atoms/buttons';
import { twMerge } from 'tailwind-merge';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: any) => Promise<void>;
  className?: string;
}

export function AuthForm({ mode, onSubmit, className }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const controls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await onSubmit({ email, password });
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten');
      if (!prefersReducedMotion) {
        // Shake animation on error: x oscillates over 600ms
        controls.start({
          x: [0, -10, 10, -10, 10, -5, 5, 0],
          transition: { duration: 0.6 }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      animate={controls}
      className={twMerge("flex flex-col gap-4 w-full max-w-sm", className)}
    >
      <FormInput
        type="email"
        label="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="deine@email.de"
        required
      />
      <FormInput
        type="password"
        label="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mindestens 6 Zeichen"
        required
      />
      
      {error && (
        <p className="text-red-500 text-sm font-bold text-center mt-2">{error}</p>
      )}

      <PrimaryCTA 
        type="submit" 
        disabled={isLoading} 
        className="mt-4 w-full justify-center"
      >
        {isLoading ? 'Lädt...' : (mode === 'login' ? 'Anmelden' : 'Registrieren')}
      </PrimaryCTA>
    </motion.form>
  );
}
