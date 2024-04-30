export interface Goal {
  id?: number;
  title: string;
  description: string;
  action: string;
  frequency: string;
  category?: string;
  deadline?: Date;
  completed: boolean;
}
