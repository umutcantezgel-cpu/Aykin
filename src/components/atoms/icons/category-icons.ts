import React from 'react';
import {
  BubbleWaffle,
  Crepes,
  Pancakes,
  Eisbecher,
  Shakes,
  Coffee,
  Boxen,
  Cake,
  IconProps
} from './index';

// Map specific category string IDs (matching the seed data) to their respective Icon components
export const CategoryIconMap: Record<string, React.FC<IconProps>> = {
  boxen: Boxen,
  bubble: BubbleWaffle,
  crepes: Crepes,
  kuchen: Cake,
  cookies: Cake,     // Fallback to Cake or if we had a Cookie icon
  eisbecher: Eisbecher,
  shakes: Shakes,
  iced: Coffee,      // Using Coffee as base for iced drinks
  stullen: Pancakes, // Placeholder for Stullen
  getraenke: Coffee, // Placeholder for other Getraenke
};

export function getCategoryIcon(categoryId: string): React.FC<IconProps> {
  return CategoryIconMap[categoryId] || BubbleWaffle;
}
