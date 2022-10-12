import React, { useEffect } from 'react';

import {
  authenticate,
  logout,
  useAppDispatch,
  useGetMeQuery,
  useRefreshToken,
} from '@coop/neosys-admin/data-access';
import { useReplace } from '@coop/shared/utils';

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

  const hasDataReturned = getMe?.data?.neosys?.auth;
  const hasData = getMe?.data?.neosys?.auth?.me?.data;
  const userData = getMe?.data?.neosys?.auth?.me?.data;

  useEffect(() => {
    refreshToken()
      .then((res) => {
        if (res) {
          setTriggerQuery(true);
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
        dispatch(authenticate({ user: userData }));
      } else {
        dispatch(logout());
        replace('/login');
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, replace]);
};
