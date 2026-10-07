export type Language = 'es' | 'en';
export type CarColor = 'naranja' | 'beige';
export type RoofConfig = 'abierto' | 'semiabierto' | 'cerrado';

export interface TourStop {
  id: number;
  name: {
    es: string;
    en: string;
  };
  highlight: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  category: 'monument' | 'scenic' | 'stop' | 'bridge';
  isPhotoStop?: boolean;
}

export interface MonumentFreeGuide {
  name: string;
  freeSchedule: {
    es: string;
    en: string;
  };
  note: {
    es: string;
    en: string;
  };
}

export interface WeddingFAQ {
  question: {
    es: string;
    en: string;
  };
  answer: {
    es: string;
    en: string;
  };
}
