import { USER_ROLES, USER_ROLES_NAME } from '@interfaces/index';

export const setupAuthorities = (flagRoles: number) => {
  const data = [];
  if (flagRoles & USER_ROLES.ROOT) {
    data.push(USER_ROLES_NAME.ROOT);
  }
  if (flagRoles & USER_ROLES.ADMIN) {
    data.push(USER_ROLES_NAME.ADMIN);
  }
  if (flagRoles & USER_ROLES.USER) {
    data.push(USER_ROLES_NAME.USER);
  }
  return data
};
