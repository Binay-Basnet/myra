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
        replace('/login');
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
      } else {
        dispatch(logout());
        replace('/login');
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, replace]);
};
