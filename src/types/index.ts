export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  desc: string;
  tag?: string;
  ticket?: boolean;
}

export interface MenuSection {
  desc: string;
  note?: string;
  items: MenuItem[];
}

export interface Bestseller extends MenuItem {
  icon: string;
}

export interface Review {
  id: string;
  name: string;
  stars: number;
  text: string;
}

export interface AppConfig {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  rating: number;
  reviewCount: number;
}

export interface AppData {
  config: AppConfig;
  categories: Category[];
  menu: Record<string, MenuSection>;
  bestsellers: Bestseller[];
  reviews: Review[];
}
