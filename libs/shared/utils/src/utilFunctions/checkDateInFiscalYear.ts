import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { getFiscalYears, getJSDate } from '@myra-ui/date-picker';

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
}: CheckDateInFiscalYearProps) => dayjs(date).isBetween(fiscalYear?.from, fiscalYear?.to, 'day');
