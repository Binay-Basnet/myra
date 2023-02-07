import dayjs from 'dayjs';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { DateType, store } from '@coop/cbs/data-access';

interface ILocalizedTextProps {
  date: Record<'local' | 'en' | 'np', string> | null | undefined;
}

export const LocalizedDate = ({ date }: ILocalizedTextProps) => localizedDate(date);

export const localizedDate = (date: Record<'local' | 'en' | 'np', string> | null | undefined) => {
  if (date?.local === null) return '-';
  const dateType = store.getState().auth?.preference?.date || DateType.Ad;
  if (dateType === DateType.Bs) {
    return date?.np || date?.local;
  }

  return dayjs(date?.en || date?.local).format('YYYY-MM-DD');
};

export default LocalizedDate;
