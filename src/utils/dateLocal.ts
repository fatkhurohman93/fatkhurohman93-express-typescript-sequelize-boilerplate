import moment from 'moment';

export const dateLocal = (value?: Date | string) => {
  const stateDate = value ? new Date(value) : new Date();
  const createdTime = moment(stateDate).format();
  const createdDate = moment(stateDate).format('YYYY-DD-MM');
  const lastUpdatedTime = moment(stateDate).format();
  const year = parseInt(moment(stateDate).format('YYYY'));
  const month = parseInt(moment(stateDate).format('MM'));
  const date = parseInt(moment(stateDate).format('YYYY'));

  return {
    createdTime,
    lastUpdatedTime,
    createdDate,
    year,
    month,
    date,
  };
};
