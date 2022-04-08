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
    password_failed_to_update: 'Password failed to update!',
    no_username_password: 'userName or password cannot be empty!',
    username_not_found: 'Username not found!',
    no_data_updated: 'No data has been updated!',
    http_not_found: (url: string) => {
      return `Page you are looking ${url} not found`;
    },
    jwt_expired: 'JWT expired.',
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
    getting_users: 'Fetching users data...',
    result_get_users: (total: number) => {
      return `Get ${total} ${total > 1 ? 'users' : 'user'} data.`;
    },
    update_user: (userName: string) => {
      return `Updating user data by userName: ${userName}...`;
    },
    check_password: (userName: string) => {
      return `Checking password for ${userName}...`;
    },
  },
};
