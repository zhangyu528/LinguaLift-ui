export interface VocabularyWord {
  word: string;
  definition: string;
}

export interface GeneratedLesson {
  topic: string;
  cefrLevel: string;
  vocabulary: VocabularyWord[];
  shortStory: string;
}

export interface Lesson extends GeneratedLesson {
  id: string;
  date: string;
  status: 'completed' | 'in-progress';
}

export type DashboardTab = 'home' | 'lessons' | 'profile';

export enum CEFRLevel {
  A1 = "A1 (Beginner)",
  A2 = "A2 (Elementary)",
  B1 = "B1 (Intermediate)",
  B2 = "B2 (Upper Intermediate)",
  C1 = "C1 (Advanced)",
}