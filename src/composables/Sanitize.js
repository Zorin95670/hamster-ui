import moment from 'moment';

export function sanitizeDate(date) {
  return moment(date)
    .set('second', 0)
    .set('millisecond', 0)
    .unix() * 1000;
}
