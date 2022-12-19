import dayjs from 'dayjs';
import NepaliDate from 'nepali-date-converter';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DateType, store } from '@coop/cbs/data-access';

export const getLocalizedTodaysDate = () => {
  const dateType = store.getState().auth?.preference?.date || DateType.Ad;

  if (dateType === DateType.Bs) {
    return new NepaliDate(new Date()).format('YYYY-MM-DD');
  }

  return dayjs().format('YYYY-MM-DD');
};
