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
  const [triggerQuery, setTriggerQuery] = React.useState(false);
  const dispatch = useAppDispatch();
  const replace = useReplace();
  const { asPath, isReady } = useRouter();

  const ability = useContext(AbilityContext);

  const getMe = useGetMeQuery(
    {},
    {
      enabled: triggerQuery,
    }
  );

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
    const getRefreshToken = async () => {
      try {
        const response = await refreshToken();

        if (response) {
          setTriggerQuery(true);
        }
      } catch (e) {
        replace(
          {
            pathname: '/login',
            query: {
              redirect: asPath,
            },
          },
          '/login'
        ).then(() => {
          dispatch(logout());
          setIsLoading(false);
        });
      }
    };

    // next.js renders twice for dynamic pages since it takes time to fill dynamic fields such as [action]
    if (asPath.includes('login') || asPath.includes('password-recovery') || asPath.includes('[')) {
      return;
    }

    getRefreshToken();
  }, [isReady]);

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
        if (asPath.includes('password-recovery')) {
          setIsLoading(false);
          return;
        }

        if (!asPath.includes('login')) {
          replace(
            {
              pathname: '/login',
              query: {
                redirect: asPath,
              },
            },
            '/login'
          ).then(() => {
            dispatch(logout());
            setIsLoading(false);
          });
        }
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData]);

  return { isLoading };
};
