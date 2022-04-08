import { IData } from '@interfaces/index';

export const getPagingData = (data: IData, limit: number, page?: number) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};
