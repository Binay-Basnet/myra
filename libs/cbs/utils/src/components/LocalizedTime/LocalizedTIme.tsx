// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import dayjs from 'dayjs';

import { store } from '@coop/cbs/data-access';

interface ILocalizedTimeProps {
  time: Record<'local' | 'en' | 'np', string> | null | undefined;
}

export const LocalizedTime = ({ time }: ILocalizedTimeProps) => localizedTime(time);

export const localizedTime = (time: Record<'local' | 'en' | 'np', string> | null | undefined) => {
  const lang = store.getState().auth?.preference?.languageCode || 'en';

  if (lang === 'np') {
    return dayjs(time?.np || time?.local).format('hh:mm:ss A');
  }

  return dayjs(time?.en || time?.local).format('hh:mm:ss A');
};

export default LocalizedTime;
