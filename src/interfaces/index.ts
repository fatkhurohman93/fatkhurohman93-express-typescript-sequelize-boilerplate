export * from './users.interface';
export * from './lang';
export * from './config';
export * from './routes';
export * from './products.interface';
export * from './categories.interface';
export * from './suppliers.interface';

export interface IData {
  count: number;
  rows: object[];
}

export interface FindAllParams {
  name: string;
  size: number;
  page: number;
}

export type ID = string | number;
