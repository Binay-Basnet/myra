import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { logout, useAppDispatch } from '@coop/csv-viewer/data-access';
import { getSchemaPath, useReplace } from '@coop/shared/utils';

import { useRefreshToken } from './useRefreshToken';

const url = getSchemaPath();

export const useInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const replace = useReplace();
  const { asPath, isReady } = useRouter();

  const refreshToken = useRefreshToken(url ?? '');

  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const response = await refreshToken();

        if (response) {
          setIsLoading(false);
        }
      } catch (e) {
        replace(
          {
            pathname: '/login',
            query: {
              redirect: asPath,
            },
          },
          '/login'
        ).then(() => {
          dispatch(logout());
          setIsLoading(false);
        });
      }
    };

    // next.js renders twice for dynamic pages since it takes time to fill dynamic fields such as [action]
    if (!isReady) {
      return;
    }

    if (asPath.includes('login') || asPath.includes('password-recovery')) {
      setIsLoading(false);
      return;
    }

    getRefreshToken();
  }, [isReady]);

  return { isLoading };
};
