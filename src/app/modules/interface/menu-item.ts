export interface MenuItem {
  id: number;
  name: string;
  description: string;
  sellableType?: 'MAIN' | 'DRINKS' | 'APPETIZER' | 'DESSERT' | 'SIDE' | 'OTHER';
  price: number;
}
