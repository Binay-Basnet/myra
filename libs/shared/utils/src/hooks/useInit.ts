import React, { useEffect } from 'react';

import { useGetMeQuery } from '@coop/shared/data-access';

import { useRefreshToken } from './useRefreshToken';
import { useReplace } from './useReplace';
import { authenticate, logout } from '../redux/authSlice';
import { useAppDispatch } from '../redux/store';

const url = process.env['NX_SCHEMA_PATH'] ?? '';

export const useInit = () => {
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
  const isDatasuccessful = getMe?.data?.auth?.me?.data;
  const userData = getMe?.data?.auth?.me?.data;

  useEffect(() => {
    refreshToken()
      .then((res) => {
        if (res) {
          setTriggerQuery(true);
          return;
        }
      })
      .catch((err) => {
        dispatch(logout());
        replace('/login');
      });
  }, [dispatch, refreshToken, replace]);

  useEffect(() => {
    if (hasDataReturned) {
      if (userData) {
        dispatch(authenticate({ user: userData }));
      } else {
        dispatch(logout());
        replace('/login');
      }
    }
  }, [dispatch, hasDataReturned, isDatasuccessful, userData, replace]);
};
