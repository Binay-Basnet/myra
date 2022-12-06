import { useRouter } from 'next/router';

import { Button } from '@myra-ui/foundations';

export const LocaleSwitcher = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={() => {
        router?.push(`${router?.asPath}`, undefined, {
          locale: router?.locale === 'ne' ? 'en' : 'ne',
        });
      }}
    >
      {router?.locale === 'en' ? 'नेपाली' : 'English'}
    </Button>
  );
};
