import React, { useEffect } from 'react';
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

export const useCoopInit = () => {
  const [triggerQuery, setTriggerQuery] = React.useState(false);
  const dispatch = useAppDispatch();
  const replace = useReplace();

  const router = useRouter();

  const isMyra = router.pathname.includes('setup') || router.pathname.includes('/login');
  const isMyraLoggedIn = useAppSelector((state) => state.auth.isLogged);

  const getMe = useGetCoopMeQuery(
    {},
    {
      enabled: triggerQuery,
    }
  );

  const refreshToken = useRefreshToken(url, EBankingTokenType.Cooperative);

  const hasDataReturned = getMe?.data?.eBanking?.auth;
  const hasData = getMe?.data?.eBanking?.auth?.meCooperativeUser?.data;
  const userData = getMe?.data?.eBanking?.auth?.meCooperativeUser?.data;

  useEffect(() => {
    if (!isMyraLoggedIn) return;

    if (!isMyra) {
      refreshToken()
        .then((res) => {
          if (res) {
            setTriggerQuery(true);
          }
        })
        .catch(() => {
          dispatch(logoutCooperative());
          replace('/login/coop');
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
      } else if (!isMyra) {
        dispatch(logoutCooperative());
        replace('/login/coop');
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, replace]);
};
