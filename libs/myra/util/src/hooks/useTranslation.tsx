import { useRouter } from 'next/router';

import { en, ne } from '../../../locales';

export const useTranslation = () => {
  const route = useRouter();

  if (!route) return { t: en };
  const { locale } = route;
  const t = locale === 'en' ? en : ne;
  return { t };
};
