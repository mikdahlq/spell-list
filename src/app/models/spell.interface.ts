export interface Spell {
  id?: string;
  name: string;
  description: string;
  level: number;
  duration: number;
  school: string;
  userId?: string;
  createdAt?: Date;
  castAt?: Date;
} 