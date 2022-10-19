import React, { useEffect } from 'react';

import {
  authenticate,
  EBankingTokenType,
  logout,
  useAppDispatch,
  useGetMyraMeQuery,
  useRefreshToken,
} from '@coop/ebanking/data-access';
import { useReplace } from '@coop/shared/utils';

const url = process.env['NX_SCHEMA_PATH'] ?? '';

export const useInit = () => {
  const [triggerMyraQuery, setTriggerMyraQuery] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useAppDispatch();
  const replace = useReplace();

  const getMyraMe = useGetMyraMeQuery(
    {},
    {
      enabled: triggerMyraQuery,
    }
  );

  const refreshToken = useRefreshToken(url, EBankingTokenType.Myra);

  const hasDataReturned = getMyraMe?.data?.eBanking?.auth;
  const hasData = getMyraMe?.data?.eBanking?.auth?.meMyraUser?.data;

  const userData = getMyraMe?.data?.eBanking?.auth?.meMyraUser?.data;

  useEffect(() => {
    refreshToken()
      .then((res) => {
        if (res) {
          setTriggerMyraQuery(true);
        }
      })
      .catch(() => {
        dispatch(logout());
        replace('/login').then(() => setIsLoading(false));
      });
  }, [dispatch, refreshToken, replace]);

  useEffect(() => {
    if (hasDataReturned) {
      if (userData) {
        dispatch(
          authenticate({
            user: userData,
          })
        );
        setIsLoading(false);
      } else {
        dispatch(logout());
        replace('/login').then(() => setIsLoading(false));
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, replace]);

  return { isLoading };
};
