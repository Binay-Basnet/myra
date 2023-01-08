import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  authenticate,
  logout,
  setPreference,
  useAppDispatch,
  useGetMeQuery,
  useRefreshToken,
} from '@coop/cbs/data-access';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AbilityContext, permissions, updateAbility } from '@coop/cbs/utils';
import { getSchemaPath, useReplace } from '@coop/shared/utils';

const url = getSchemaPath();

export const useInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter();
  const [triggerQuery, setTriggerQuery] = React.useState(false);
  const dispatch = useAppDispatch();
  const replace = useReplace();

  const ability = useContext(AbilityContext);

  const getMe = useGetMeQuery(
    {},
    {
      enabled: triggerQuery,
    }
  );

  const refreshToken = useRefreshToken(url ?? '');

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
        if (route?.pathname.includes('password-recovery')) {
          setIsLoading(false);
          return;
        }
        dispatch(logout());
        replace('/login').then(() => setIsLoading(false));
      });
  }, [dispatch, refreshToken, replace]);

  useEffect(() => {
    if (hasDataReturned) {
      if (userData) {
        updateAbility(ability, permissions[userData.role || 'SUPER_ADMIN']);

        dispatch(authenticate({ user: userData }));
        preference && dispatch(setPreference({ preference }));
        setIsLoading(false);
      } else {
        if (route?.pathname.includes('password-recovery')) {
          setIsLoading(false);
          return;
        }
        dispatch(logout());
        replace('/login').then(() => setIsLoading(false));
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData, replace]);

  return { isLoading };
};
