"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { FadeUp } from "@/components/ui/FadeUp";
import { SectionTitle } from "@/components/ui/LayoutBlocks";

interface Review {
  id: string;
  name: string;
  stars: number;
  text: string;
}

const AVATAR_COLORS = ['#C41E3A', '#4A4A4A', '#E8D5C4', '#8A8A8A', '#2D2D2D'];

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function ReviewCard({ review, index, isTouch }: { review: Review; index: number; isTouch: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={isTouch ? undefined : { y: -8, scale: 1.02 }}
      whileTap={isTouch ? { scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        background: '#FAF8F5',
        borderRadius: 22,
        padding: '28px 24px',
        minWidth: 310,
        maxWidth: 350,
        flexShrink: 0,
        cursor: 'default',
        boxShadow: isHovered
          ? '0 16px 40px rgba(196,30,58,0.18)'
          : '0 4px 18px rgba(26,26,26,0.07)',
        transition: 'box-shadow 0.3s ease',
        position: 'relative' as const,
        overflow: 'hidden' as const,
        ...(isTouch ? { scrollSnapAlign: 'start' as const } : {}),
      }}
    >
      {/* Decorative quote mark */}
      <motion.div
        animate={{ opacity: isHovered ? 0.12 : 0.06, scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', top: 16, right: 16,
          color: '#C41E3A',
        }}
      >
        <Quote size={48} strokeWidth={1.5} />
      </motion.div>

      {/* Stars with stagger animation */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 16 }} aria-label={`${review.stars} von 5 Sternen`}>
        {Array(review.stars).fill(0).map((_, j) => (
          <motion.div
            key={j}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: j * 0.08, duration: 0.3 }}
          >
            <Star size={15} fill="#C41E3A" color="#C41E3A" aria-hidden="true" />
          </motion.div>
        ))}
      </div>

      {/* Review text */}
      <p style={{
        fontFamily: 'var(--font-nunito), sans-serif',
        fontSize: '0.9rem',
        color: '#4A4A4A',
        lineHeight: 1.72,
        marginBottom: 20,
        fontStyle: 'italic',
        position: 'relative' as const,
        zIndex: 1,
      }}>
        „{review.text}"
      </p>

      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Avatar circle with initials */}
        <motion.div
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fefefe',
            fontFamily: 'var(--font-calistoga), serif',
            fontSize: '0.85rem',
            flexShrink: 0,
          }}
        >
          {getInitials(review.name)}
        </motion.div>
        <div>
          <div style={{
            fontFamily: 'var(--font-nunito), sans-serif',
            fontWeight: 800,
            fontSize: '0.88rem',
            color: '#1A1A1A',
          }}>
            {review.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-nunito), sans-serif',
            fontSize: '0.72rem',
            color: '#8A8A8A',
            fontWeight: 600,
          }}>
            Verifizierte Google-Bewertung
          </div>
        </div>
      </div>

      {/* Hover accent line at bottom */}
      <motion.div
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3, background: 'linear-gradient(90deg, #C41E3A, #E8D5C4)',
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  );
}

export function ReviewsSection({ reviews, config }: { reviews: Review[]; config: any }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect touch device
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  // Auto-scroll marquee effect (only on non-touch devices)
  useEffect(() => {
    if (isTouch) return; // No auto-scroll on touch devices

    const container = scrollRef.current;
    if (!container) return;
    
    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5; // pixels per frame
    
    const scroll = () => {
      if (!isPaused && container) {
        scrollPos += speed;
        // Reset when we've scrolled through the first set of cards
        const halfWidth = container.scrollWidth / 2;
        if (scrollPos >= halfWidth) {
          scrollPos = 0;
        }
        container.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isTouch]);

  // Track scroll position for indicator dots (touch only)
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !isTouch) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = 330; // minWidth(310) + gap(20)
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, reviews.length - 1));
  }, [isTouch, reviews.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !isTouch) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isTouch, handleScroll]);

  // On touch: use original reviews only (no duplication needed for snap scroll)
  // On desktop: duplicate for infinite marquee
  const displayReviews = isTouch ? reviews : [...reviews, ...reviews];

  // Scroll to a specific dot index
  const scrollToDot = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = 330;
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  return (
    <section style={{ background: '#E8D5C4', paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      <WaveDivider fromColor="#E8D5C4" toColor="#E8D5C4" variant={1} />
      <div className="absolute inset-0 opacity-30 dot-bg" />

      <FadeUp className="relative z-10 max-w-[1200px] mx-auto px-6 pt-6">
        <SectionTitle sub={`${config.rating}/5 · ${config.reviewCount}+ echte Bewertungen auf Google`}>
          Was unsere Gäste sagen
        </SectionTitle>

        {/* Marquee / Scroll-snap container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            display: 'flex',
            gap: 20,
            overflowX: isTouch ? 'auto' : 'hidden',
            paddingBottom: 8,
            scrollBehavior: 'auto',
            ...(isTouch
              ? {
                  scrollSnapType: 'x mandatory' as const,
                  WebkitOverflowScrolling: 'touch' as any,
                  // No mask on touch – user needs to see edges clearly
                }
              : {
                  WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
                  maskImage: 'linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)',
                }),
          }}
        >
          {displayReviews.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} review={r} index={i} isTouch={isTouch} />
          ))}
        </div>

        {/* Scroll indicator dots (touch only) */}
        {isTouch && reviews.length > 1 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              marginTop: 16,
            }}
          >
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`Bewertung ${i + 1} anzeigen`}
                onClick={() => scrollToDot(i)}
                style={{
                  width: activeIndex === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: activeIndex === i ? '#C41E3A' : 'rgba(92,61,53,0.25)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        )}

        {/* Interactive hint + Google CTA */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 24, flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{
            fontFamily: 'var(--font-nunito), sans-serif',
            fontSize: '0.78rem',
            color: '#4A4A4A',
            opacity: 0.7,
          }}>
            {isTouch ? '← Swipe zum Entdecken →' : '← Hover um anzuhalten · Swipe zum Entdecken →'}
          </p>

          <motion.a
            href="https://maps.app.goo.gl/aykin"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fefefe',
              color: '#1A1A1A',
              fontFamily: 'var(--font-nunito), sans-serif',
              fontWeight: 800,
              fontSize: '0.85rem',
              padding: '10px 20px',
              borderRadius: 50,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(26,26,26,0.1)',
            }}
          >
            <Star size={16} fill="#C41E3A" color="#C41E3A" />
            Auf Google bewerten
            <ExternalLink size={14} color="#8A8A8A" />
          </motion.a>
        </div>
      </FadeUp>
    </section>
  );
}
