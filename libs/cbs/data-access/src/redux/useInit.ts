import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  authenticate,
  logout,
  RoleInfo,
  useAppDispatch,
  useGetMeQuery,
  useRefreshToken,
} from '@coop/cbs/data-access';
import { AbilityContext, updateAbility } from '@coop/cbs/utils';
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

  // const isLoggedIn = useAppSelector((state) => state.auth.isLogged);

  const refreshToken = useRefreshToken(url ?? '');

  const hasDataReturned = getMe?.data?.auth;
  const hasData = getMe?.data?.auth?.me?.data;

  const loginRecord = getMe?.data?.auth?.me;
  const loginData = loginRecord?.data;

  const userData = loginData?.user;
  const preference = loginData?.preference;
  const permissions = loginData?.permission?.myPermission;
  const availableRoles = loginData?.rolesList;
  const availableBranches = loginData?.branches;

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
      if (userData && preference && permissions && availableRoles && availableBranches) {
        updateAbility(ability, permissions as Partial<Record<string, string>>);

        dispatch(
          authenticate({
            user: userData,
            permissions,
            preference,
            availableRoles: availableRoles as RoleInfo[],
            availableBranches: availableBranches as RoleInfo[],
          })
        );

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

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setTriggerQuery(true);
  //   }
  // }, [isLoggedIn]);

  return { isLoading };
};
