export interface SpellBook {
  id?: string;
  name: string;
  description: string;
  spells: string[]; // Array of spell IDs
  userId: string;
}
