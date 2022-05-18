import { NextRouter } from 'next/router';
import { en, ne } from '../../../locales';

export const translation = (router: NextRouter) => {
  const { locale } = router;
  const t = locale === 'en' ? en : ne;
  return t;
};
