'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from '@/store/useTransition';
import { useReducedMotion } from 'framer-motion';

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function TransitionLink({ href, children, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const { setBusy, isBusy } = useTransition();
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's a new tab/window, don't hijack
    if (e.metaKey || e.ctrlKey || e.button !== 0 || isBusy) return;
    
    // External link bypass
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);

    if (prefersReducedMotion) {
      router.push(href);
      return;
    }

    // Start curtain animation
    setBusy(true);

    // Delay navigation to allow curtain to close
    setTimeout(() => {
      router.push(href);
      // Remove busy state after navigation completes (rough estimate for next render)
      setTimeout(() => setBusy(false), 200);
    }, 600);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
