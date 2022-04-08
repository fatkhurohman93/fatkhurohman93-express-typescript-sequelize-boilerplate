export enum ROUTES {
  apiPrefix = '/api',
  rootPath = '/',
  clearDB = '/clear-db',
  status = '/status',
  public = '../../public',
  auth = '/auth',
  user = '/user',
}

export enum ROUTES_AUTH {
  signUp = '/signup',
  signIn = '/signin',
}

export enum ROUTES_USER {
  findAll = '/findall',
  update = '/update/:userName',
  updatePassword = '/update-password',
}
