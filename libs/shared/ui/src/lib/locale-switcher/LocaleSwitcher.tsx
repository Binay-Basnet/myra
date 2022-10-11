import { useRouter } from 'next/router';

import Button from '../button/Button';

export const LocaleSwitcher = () => {
  const { locale, push, asPath } = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        push(`${asPath}`, undefined, {
          locale: locale === 'ne' ? 'en' : 'ne',
        });
      }}
    >
      {locale === 'en' ? 'नेपाली' : 'English'}
    </Button>
  );
};
