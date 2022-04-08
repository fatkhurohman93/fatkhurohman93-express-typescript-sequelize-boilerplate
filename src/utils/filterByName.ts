import { Op } from 'sequelize';

export const filterByName = (name: string) => {
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : undefined;
  return condition;
};
