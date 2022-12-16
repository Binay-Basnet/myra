import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import {
  authenticateCooperative,
  EBankingTokenType,
  logoutCooperative,
  useAppDispatch,
  useAppSelector,
  useGetCoopMeQuery,
  useRefreshToken,
} from '@coop/ebanking/data-access';
import { getSchemaPath, useReplace } from '@coop/shared/utils';

const url = getSchemaPath() || '';

interface IUseCoopInitProps {
  isMeEnabled: boolean;
}

export const useCoopInit = ({ isMeEnabled }: IUseCoopInitProps) => {
  const [triggerQuery, setTriggerQuery] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useAppDispatch();
  const replace = useReplace();
  const queryClient = useQueryClient();

  const router = useRouter();

  const isMyra = router.pathname.includes('setup') || router.pathname.includes('/login');
  const isMyraLoggedIn = useAppSelector((state) => state.auth.isLogged);

  const getMe = useGetCoopMeQuery(
    {},
    {
      enabled: isMeEnabled && triggerQuery,
      onSuccess: () => {
        setIsLoading(false);
        setTriggerQuery(false);
      },
    }
  );

  const refreshToken = useRefreshToken(url, EBankingTokenType.Cooperative);

  const hasDataReturned = getMe?.data?.eBanking?.auth;
  const hasData = getMe?.data?.eBanking?.auth?.meCooperativeUser?.data;
  const userData = getMe?.data?.eBanking?.auth?.meCooperativeUser?.data;

  useEffect(() => {
    if (!isMyraLoggedIn) {
      setIsLoading(false);
      return;
    }

    if (!isMyra) {
      refreshToken()
        .then((res) => {
          if (res) {
            setTriggerQuery(true);
          }
        })
        .catch(() => {
          dispatch(logoutCooperative());
          replace('/login/coop').then(() => {
            queryClient.clear();
            setIsLoading(false);
          });
        });
    }
  }, [dispatch, refreshToken, replace, isMyraLoggedIn]);

  useEffect(() => {
    if (hasDataReturned) {
      if (userData) {
        dispatch(
          authenticateCooperative({
            user: userData,
          })
        );
        setIsLoading(false);
      } else if (!isMyra) {
        dispatch(logoutCooperative());
        replace('/login/coop').then(() => {
          queryClient.clear();
          localStorage.removeItem('db');
          setIsLoading(false);
        });
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, replace]);

  return { isLoading };
};
