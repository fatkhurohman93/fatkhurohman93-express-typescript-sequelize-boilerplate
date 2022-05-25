import { ID } from '@interfaces/index';

export const id = {
  appName: 'Inventory App',
  welcome: 'Selamat datang di Aplikasi Inventory',
  empty: '',
  no_name: 'no-name',
  success: 'sukses',
  updated: (total: number) => {
    return `${total} data berhasil diperbaharui.`;
  },
  password_updated: 'Password berhasil dirubah.',
  setup: {
    connect_to_db: 'Memulai koneksi database...',
    success_connect_to_db: 'Database berhasil terkoneksi.',
    failed_connect_to_db: (errMessage: string) => {
      return `🔥 Database gagal terkoneksi, message: ${errMessage}`;
    },
    db_reset: 'Database reset.',
    db_reset_failed: 'Tidak dapat membersihkan database.',
    cors_message: (origin: string) => {
      return `The CORS policy for this site does not allow access from this ${origin} specified origin`;
    },
    server_listen: (IP: string, port: string | number) => {
      return `🚀 Server listening at http://${IP || 'localhost'}:${port}`;
    },
  },
  error: {
    wrong_parameter: 'Kesahalan parameter!',
    wrong_password: 'Kesalahan password!',
    wrong_username: 'Kesalahan userName!',
    wrong_id: 'Wrong id.',
    password_failed_to_update: 'Password gagal diperbaharui!',
    no_username_password: 'userName atau password tidak boleh kosong!',
    username_not_found: 'Username tidak ditemukan!',
    category_not_found: 'Category not found',
    no_data_updated: 'Tidak ada data yang diperbaharui!',
    http_not_found: (url: string) => {
      return `Halaman yang kamu tuju ${url} tidak ditemukan.`;
    },
    jwt_expired: 'JWT kadaluarsa.',
    no_token_provided: 'Token tidak tersedia.',
    unauthorized: 'Tidak terotorisasi!',
    require_role: (ROLE: string) => {
      return `Require ${ROLE}`;
    },
  },
  logger: {
    creating_user: 'Membuat user...',
    success_creating_user: (userName: string) => {
      return `Username: ${userName} berhasil dibuat.`;
    },
    login: (userName: string) => {
      return `Masuk Username: ${userName}...`;
    },
    success_login: (userName: string) => {
      return `Username: ${userName} berhasil masuk.`;
    },
    fetching_users: 'Mengambil data user...',
    fetching_user: (userName: string) => {
      return `Mengambil data user dengan userName: ${userName}...`;
    },
    fetch_user_success: (userName: string) => {
      return `userName: ${userName} has been fetched successfully.`;
    },
    result_get_users: (total: number) => {
      return `Mendapatkan ${total} data user.`;
    },
    update_user: (userName: string) => {
      return `Memperbarui data user dengan userName: ${userName}...`;
    },
    check_password: (userName: string) => {
      return `Memeriksa password untuk ${userName}...`;
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
