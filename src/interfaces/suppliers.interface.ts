import { Common } from './common.interface';

export interface Suppliers extends Common {
  id?: number | string;
  name: string;
  description?: string;
  code: string;
  image?: string;
  phone: string;
  whatsapp: string;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
  address: string;
}

export enum SUPPLIER_ATTRIBUTES {
  id = 'id',
  name = 'name',
  description = 'description',
  code = 'code',
  image = 'image',
  phone = 'phone',
  whatsapp = 'whatsapp',
  email = 'email',
  facebook = 'facebook',
  instagram = 'instagram',
  twitter = 'twitter',
  address = 'address',
  createdTime = 'createdTime',
  createdDate = 'createdDate',
  year = 'year',
  month = 'month',
  lastUpdatedTime = 'lastUpdatedTime',
  createdBy = 'createdBy',
  lastUpdatedBy = 'lastUpdatedBy',
}
