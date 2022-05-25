import { Common } from './common.interface';

export interface Categories extends Common {
  id?: number | string;
  name: string;
  description?: string;
  code: string;
  image?: string;
  imageName?: string;
  productCategoryDiscount: number;
  productCategoryTax: number;
}

export enum CATEGORY_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  code = 'code',
  image = 'image',
  productCategoryDiscount = 'productCategoryDiscount',
  productCategoryTax = 'productCategoryTax',
  createdTime = 'createdTime',
  createdDate = 'createdDate',
  year = 'year',
  month = 'month',
  lastUpdatedTime = 'lastUpdatedTime',
  createdBy = 'createdBy',
  lastUpdatedBy = 'lastUpdatedBy',
}
