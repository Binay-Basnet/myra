import React, { useEffect, useState } from 'react';

import {
  authenticate,
  logout,
  setPreference,
  useAppDispatch,
  useGetMeQuery,
  useRefreshToken,
} from '@coop/cbs/data-access';

import { useReplace } from './useReplace';

const url = process.env['NX_SCHEMA_PATH'] ?? '';

export const useInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [triggerQuery, setTriggerQuery] = React.useState(false);
  const dispatch = useAppDispatch();
  const replace = useReplace();

  const getMe = useGetMeQuery(
    {},
    {
      enabled: triggerQuery,
    }
  );

  const refreshToken = useRefreshToken(url);

  const hasDataReturned = getMe?.data?.auth;
  const userData = getMe?.data?.auth?.me?.data?.user;
  const preference = getMe?.data?.auth?.me?.data?.preference;
  const hasData = getMe?.data?.auth?.me?.data;

  useEffect(() => {
    refreshToken()
      .then((res) => {
        if (res) {
          setTriggerQuery(true);
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
        dispatch(authenticate({ user: userData }));
        preference && dispatch(setPreference({ preference }));
        setIsLoading(false);
      } else {
        dispatch(logout());
        replace('/login').then(() => setIsLoading(false));
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, replace]);

  return { isLoading };
};
