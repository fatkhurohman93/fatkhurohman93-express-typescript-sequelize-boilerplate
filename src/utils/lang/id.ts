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
    password_failed_to_update: 'Password gagal diperbaharui!',
    no_username_password: 'userName atau password tidak boleh kosong!',
    username_not_found: 'Username tidak ditemukan!',
    no_data_updated: 'Tidak ada data yang diperbaharui!',
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
    getting_users: 'Mengambil data user...',
    result_get_users: (total: number) => {
      return `Mendapatkan ${total} data user.`;
    },
    update_user: (userName: string) => {
      return `Memperbarui data user dengan userName: ${userName}...`;
    },
    check_password: (userName: string) => {
      return `Memeriksa password untuk ${userName}...`;
    },
  },
};
