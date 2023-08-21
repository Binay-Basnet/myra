import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { ad2bs } from './ad-bs-converter';
import { getNextMonth } from './calendar-builder';
import { getFiscalYears, getJSDate } from './functions';

dayjs.extend(isBetween);

type CheckDateInFiscalYearProps = {
  date?: Date;
  fiscalYear?: {
    from: Date;
    to: Date;
  };
};

export const getCurrentFiscalYear = () => {
  const currentFiscalYear = getFiscalYears(new Date(), 'AD');

  return {
    from: getJSDate(currentFiscalYear[0].start, 'AD'),
    to: getJSDate(currentFiscalYear[0].end, 'AD'),
  };
};

export const checkDateInFiscalYear = ({
  date = new Date(),
  fiscalYear = getCurrentFiscalYear(),
}: CheckDateInFiscalYearProps) =>
  dayjs(date).isBetween(fiscalYear?.from, fiscalYear?.to, 'day', '[]');

export const getNextDate = (
  type: 'day' | 'week' | 'month' | 'quarterly' | 'half-yearly' | 'year',
  calendarType: 'AD' | 'BS',
  date: Date
) => {
  const addMonths = { month: 1, quarterly: 3, 'half-yearly': 6 };

  if (calendarType === 'AD') {
    if (type === 'half-yearly' || type === 'quarterly') {
      return dayjs(date).add(addMonths[type], 'months').toDate();
    }

    return dayjs(date).add(1, type).toDate();
  }

  const bsDate = ad2bs(date.getFullYear(), date.getMonth() + 1, date.getDate());

  if (type === 'quarterly' || type === 'half-yearly' || type === 'month') {
    const { year, month } = getNextMonth(bsDate.month, bsDate.year, addMonths[type]);
    return getJSDate({ year, month: String(month), day: String(bsDate.day), dayOfWeek: 1 }, 'BS');
  }

  return dayjs(date).add(1, type).toDate();
};
