export enum ROUTES {
  apiPrefix = '/api',
  rootPath = '/',
  clearDB = '/clear-db',
  status = '/status',
  public = '../../public',
  auth = '/auth',
  user = '/user',
  product = '/product',
  category = '/category',
  supplier = '/supplier ',
}

export enum ROUTES_AUTH {
  signUp = '/signup',
  signIn = '/signin',
}

export enum ROUTES_USER {
  findAll = '/findall',
  findOne = '/findone/:userName',
  update = '/update/:userName',
  updatePassword = '/update-password',
  destroy = '/destroy/:userName',
}

export enum ROUTES_CATEGORY {
  create = '/create',
  findAll = '/findall',
  findOne = '/findone/:id',
  update = '/update/:id',
  destroy = '/destroy/:id',
}
