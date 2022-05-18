import { useRouter } from 'next/router';
import { translation } from '@saccos/myra/util';

export const useTranslation = () => {
  const route = useRouter();
  const t = translation(route);
  return { t };
};
