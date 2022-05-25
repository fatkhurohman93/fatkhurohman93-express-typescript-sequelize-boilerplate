import { Common } from './common.interface';

export interface Users extends Common {
  id?: number | string;
  userName: string;
  name: string;
  image?: string;
  imageName?: string;
  email: string;
  password: string;
  flagRoles: number;
  oldPassword?: string;
  newPassword?: string;
}

export enum USER_ATTRIBUTES {
  id = 'id',
  userName = 'userName',
  name = 'name',
  image = 'image',
  email = 'email',
  password = 'password',
  flagRoles = 'flagRoles',
  createdTime = 'createdTime',
  createdDate = 'createdDate',
  year = 'year',
  month = 'month',
  lastUpdatedTime = 'lastUpdatedTime',
  createdBy = 'createdBy',
  lastUpdatedBy = 'lastUpdatedBy',
  anonymous = 'anonymous',
}

export enum USER_ROLES {
  ROOT = 1,
  ADMIN = 2,
  USER = 4,
}

export enum USER_ROLES_NAME {
  ROOT = 'ROLE_ROOT',
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
}

export type USERNAME = string;

export type PASSWORD = string;
