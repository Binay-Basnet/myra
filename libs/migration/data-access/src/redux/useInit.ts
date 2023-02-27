import { useEffect, useState } from 'react';
import {
  logout,
  useAppDispatch,
  // useGetMeQuery,
  useRefreshToken,
} from '@migration/data-access';

import { getSchemaPath, useReplace } from '@coop/shared/utils';

const url = getSchemaPath();

export const useInit = () => {
  const [isLoading, setIsLoading] = useState(true);

  // const [triggerQuery, setTriggerQuery] = React.useState(false);
  const dispatch = useAppDispatch();
  const replace = useReplace();

  // const getMe = useGetMeQuery(
  //   {},
  //   {
  //     enabled: triggerQuery,
  //   }
  // );

  const refreshToken = useRefreshToken(url);

  // const hasDataReturned = getMe?.data?.neosys?.auth;
  // const hasData = getMe?.data?.neosys?.auth?.me?.data;
  // const userData = getMe?.data?.neosys?.auth?.me?.data;

  useEffect(() => {
    refreshToken()
      .then((res) => {
        if (res) {
          setIsLoading(false);
          // setTriggerQuery(true);
        }
      })
      .catch(() => {
        dispatch(logout());
        replace('/login').then(() => setIsLoading(false));
      });
  }, [dispatch, refreshToken, replace]);

  // useEffect(() => {
  //   if (hasDataReturned) {
  //     if (userData) {
  //       dispatch(authenticate({ user: userData }));
  //       setIsLoading(false);
  //     } else {
  //       dispatch(logout());
  //       replace('/login').then(() => setIsLoading(false));
  //     }
  //   }
  // }, [dispatch, hasDataReturned, hasData, userData, replace]);

  return { isLoading };
};
