import { Common } from './common.interface';

export interface ProductKeywords extends Common {
  id?: number | string;
  productID: number;
  name: string;
  description: string;
}
