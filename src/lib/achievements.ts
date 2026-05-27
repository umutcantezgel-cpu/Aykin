export type AchievementId = 'sweet-tooth' | 'early-bird' | 'loyal-fan' | 'waffle-master' | 'birthday-treat';

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  icon: string; // lucide icon name or emoji
  coinReward?: number;
}

export const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
  'sweet-tooth': {
    id: 'sweet-tooth',
    title: 'Sweet Tooth',
    description: 'Du hast das Geheimnis im Logo gefunden!',
    icon: '🍬',
    coinReward: 0,
  },
  'early-bird': {
    id: 'early-bird',
    title: 'Early Bird',
    description: 'Eine Bestellung vor 10:00 Uhr aufgegeben. Der frühe Vogel fängt die Waffel!',
    icon: '🌅',
    coinReward: 10,
  },
  'loyal-fan': {
    id: 'loyal-fan',
    title: 'Loyal Fan',
    description: 'Wow, du hast bereits 10 Bestellungen bei uns gemacht!',
    icon: '🏆',
    coinReward: 50,
  },
  'waffle-master': {
    id: 'waffle-master',
    title: 'Waffle Master',
    description: 'Du hast im Physik-Playground über 50 Waffeln gespawnt.',
    icon: '🧇',
    coinReward: 20,
  },
  'birthday-treat': {
    id: 'birthday-treat',
    title: 'Birthday Treat',
    description: 'Happy Birthday! Lass dich feiern und genieß deine Bonus-Coins.',
    icon: '🎂',
    coinReward: 100,
  }
};
