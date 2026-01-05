
export type UserProfile = {
  name: string;
  evaName: string;
  ageGroup: 'teen' | 'adult' | 'senior';
  isSetupComplete: boolean;
};

export type SymptomEntry = {
  date: string;
  periodStart?: boolean;
  periodEnd?: boolean;
  energy: 'high' | 'low' | 'neutral';
  emotions: string[];
  symptoms: string[];
  activity: string[];
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export type Article = {
  id: string;
  title: string;
  category: string;
  content: string;
  illustration: string;
  emoji: string;
  ageGroups: ('teen' | 'adult' | 'senior')[];
};
