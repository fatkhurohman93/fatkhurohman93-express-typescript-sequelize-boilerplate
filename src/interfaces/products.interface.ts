import { Common } from './common.interface';

export interface Products extends Common {
  id?: number | string;
  name: string;
  description?: string;
  code: string;
  image?: string;
  imageName?: string;
  stock: number;
  unit: string;
  price: number;
  sellPrice: number;
  productDiscount: number;
  productTax: number;
  active: boolean;
  categoryID: number;
  supplierID: number;
}

export enum PRODUCT_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  code = 'code',
  image = 'image',
  stock = 'stock',
  unit = 'unit',
  price = 'price',
  sellPrice = 'sellPrice',
  productDiscount = 'productDiscount',
  productTax = 'productTax',
  active = 'active',
  categoryID = 'categoryID',
  supplierID = 'supplierID',
  createdTime = 'createdTime',
  createdDate = 'createdDate',
  year = 'year',
  month = 'month',
  lastUpdatedTime = 'lastUpdatedTime',
  createdBy = 'createdBy',
  lastUpdatedBy = 'lastUpdatedBy',
}
