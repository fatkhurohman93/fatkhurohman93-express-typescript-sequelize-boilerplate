import { ID } from '@interfaces/index';

export const en = {
  appName: 'Inventory App',
  welcome: 'Welcome to the Inventory App',
  empty: '',
  no_name: 'no-name',
  success: 'Success',
  ok: 'OK',
  err: 'Error',
  updated: (total: number) => {
    return `${total} data ${
      total > 1 ? 'has' : 'have'
    } been updated successfully.`;
  },
  deleted: (total: number) => {
    return `${total} data ${
      total > 1 ? 'has' : 'have'
    } been deleted successfully.`;
  },
  password_updated: 'Password has been updated successfully.',
  setup: {
    connect_to_db: 'Begin database connection...',
    success_connect_to_db: 'Connect to database successfully',
    failed_connect_to_db: (errMessage: string) => {
      return `🔥 failed connect to database, message: ${errMessage}`;
    },
    db_reset: 'Database reset.',
    db_reset_failed: 'Unable to clear the database.',
    cors_message: (origin: string) => {
      return `The CORS policy for this site does not allow access from this ${origin} specified origin`;
    },
    server_listen: (IP: string, port: string | number) => {
      return `🚀 Server listening at http://${IP || 'localhost'}:${port}`;
    },
  },
  error: {
    wrong_parameter: 'Wrong parameter!',
    wrong_password: 'Wrong password!',
    wrong_username: 'Wrong userName!',
    wrong_id: 'Wrong id.',
    password_failed_to_update: 'Password failed to update!',
    no_username_password: 'userName or password cannot be empty!',
    username_not_found: 'Username not found!',
    category_not_found: 'Category not found',
    no_data_updated: 'No data has been updated!',
    http_not_found: (url: string) => {
      return `Page you are looking ${url} not found`;
    },
    jwt_expired: 'JWT expired.',
    no_token_provided: 'No token provided.',
    unauthorized: 'Unauthorized!',
    require_role: (ROLE: string) => {
      return `Require ${ROLE}`;
    },
  },
  logger: {
    creating_user: 'Creating user...',
    success_creating_user: (userName: string) => {
      return `Username: ${userName} has been created successfully.`;
    },
    login: (userName: string) => {
      return `Login Username: ${userName}...`;
    },
    success_login: (userName: string) => {
      return `Username: ${userName} login successfully.`;
    },
    fetching_users: 'Fetching users data...',
    fetching_user: (userName: string) => {
      return `Fetching user data by userName: ${userName}...`;
    },
    fetch_user_success: (userName: string) => {
      return `userName: ${userName} has been fetched successfully.`;
    },
    result_get_users: (total: number) => {
      return `Get ${total} ${total > 1 ? 'users' : 'user'} data.`;
    },
    updating_user: (userName: string) => {
      return `Updating user data by userName: ${userName}...`;
    },
    check_password: (userName: string) => {
      return `Checking password for ${userName}...`;
    },
    verifying_token: 'Verifying token...',
    token_verified: 'Token verified!',
    verifying_authority: 'Verifying authority...',
    authority_granted: (ROLE: string) => {
      return `Authority granted as ${ROLE}`;
    },
    deleting_user: (userName: string) => {
      return `Deleting userName: ${userName}...`;
    },
    creating_category: 'Creating category...',
    category_created: 'Category has been created successfuly.',
    fetching_categories: 'Fetching categories...',
    result_get_categories: (total: number) => {
      return `Get ${total} ${total > 1 ? 'categories' : 'category'} data.`;
    },
    fetching_category: (id: string | number) => {
      return `Fetching category data by id: ${id}...`;
    },
    fetch_category_success: (id: ID) => {
      return `Category id: ${id} has been fetched successfully.`;
    },
    updating_category: (id: ID) => {
      return `Updating category data by id: ${id}...`;
    },
  },
  folderName: {
    user: 'user',
    product: 'product',
    supplier: 'supplier',
    category: 'category',
  },
};
