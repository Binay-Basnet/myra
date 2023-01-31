import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  authenticate,
  logout,
  RoleInfo,
  useAppDispatch,
  useAppSelector,
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
  const { asPath } = useRouter();

  const ability = useContext(AbilityContext);

  const getMe = useGetMeQuery(
    {},
    {
      enabled: triggerQuery,
    }
  );

  const isLoggedIn = useAppSelector((state) => state.auth.isLogged);

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
    if (!asPath.includes('login') && !isLoggedIn) {
      refreshToken()
        .then((res) => {
          if (res) {
            setTriggerQuery(true);
          }
        })
        .catch(() => {
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
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch, refreshToken, replace, asPath]);

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

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setTriggerQuery(true);
  //   }
  // }, [isLoggedIn]);

  return { isLoading };
};
