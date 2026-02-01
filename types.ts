
export type StepType = 'question' | 'info' | 'loading' | 'result' | 'score' | 'carousel';

export interface Option {
  id: string;
  text: string;
  icon?: string;
  image?: string;
}

export interface QuizStep {
  id: number;
  type: StepType;
  title: string;
  subtitle?: string;
  description?: string;
  options?: Option[];
  image?: string;
  buttonText?: string;
  progressPercent: number;
  statusText?: string;
}

export interface QuizState {
  currentStep: number;
  answers: Record<number, string>;
  isCompleted: boolean;
}
