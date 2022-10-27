import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import {
  authenticateCooperative,
  EBankingTokenType,
  logoutCooperative,
  useAppDispatch,
  useAppSelector,
  useGetCoopMeQuery,
  useRefreshToken,
} from '@coop/ebanking/data-access';
import { useReplace } from '@coop/shared/utils';

const url = process.env['NX_SCHEMA_PATH'] ?? '';

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
      onSuccess: () => setTriggerQuery(false),
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
          setIsLoading(false);
        });
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, replace]);

  return { isLoading };
};
