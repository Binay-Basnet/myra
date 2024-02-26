import { ReactElement, ReactNode, useContext, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Box, Loader, Toaster } from '@myra-ui';
import { theme } from '@myra-ui/theme';

import {
  authenticate,
  logout,
  RoleInfo,
  store,
  useAppDispatch,
  useGetMeQuery,
  useInit,
  useRefreshToken,
} from '@coop/cbs/data-access';
import { AbilityContext, buildEmptyPermissions, updateAbility } from '@coop/cbs/utils';
import { getSchemaPath, useReplace } from '@coop/shared/utils';

import '@raralabs/web-feedback/dist/css/style.css';
import './app.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const fiveMinutesInMs = 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: false,
      keepPreviousData: true,
      cacheTime: 0,
      staleTime: fiveMinutesInMs,
    },
  },
});

const url = getSchemaPath();

const MainApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { isLoading } = useInit();

  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();

  useTabChange();

  const lang = store.getState().auth?.preference?.languageCode;

  useEffect(() => {
    if (
      (lang === 'np' && router.locale !== 'ne' && !router.asPath.includes('login')) ||
      router.asPath.includes('password-recovery')
    ) {
      router.push(`/${router.asPath}`, undefined, {
        locale: 'ne',
      });
    }
  }, [router.locale, lang, router.asPath]);

  if (isLoading || (lang === 'np' && router.locale !== 'ne')) {
    return (
      <Box h="100vh" bg="white" display="flex" alignItems="center" justifyContent="center">
        <Loader height={300} />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Myra | Cloud Cooperative Platform</title>
      </Head>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <Toaster />

      <main className="app">{getLayout(<Component {...pageProps} />)}</main>
    </>
  );
};

const ability = buildEmptyPermissions();

const CustomApp = (props: AppPropsWithLayout) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AbilityContext.Provider value={ability}>
          <MainApp {...props} />
        </AbilityContext.Provider>
      </ChakraProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </Provider>
);

export default CustomApp;

const useTabChange = () => {
  const router = useRouter();

  const refreshToken = useRefreshToken(url ?? '');

  const [triggerQuery, setTriggerQuery] = useState(false);

  const dispatch = useAppDispatch();
  const replace = useReplace();

  const getMe = useGetMeQuery(
    {},
    {
      enabled: triggerQuery,
    }
  );

  const hasDataReturned = getMe?.data?.auth;
  const hasData = getMe?.data?.auth?.me?.data;

  const loginRecord = getMe?.data?.auth?.me;
  const loginData = loginRecord?.data;

  const userData = loginData?.user;
  const preference = loginData?.preference;
  const permissions = loginData?.permission?.myPermission;
  const availableRoles = loginData?.rolesList;
  const availableBranches = loginData?.branches;

  const userAbility = useContext(AbilityContext);

  const getRefreshToken = async () => {
    try {
      const response = await refreshToken();

      if (response) {
        queryClient.invalidateQueries(['getMe']);
        setTriggerQuery(true);
      }
    } catch (e) {
      replace(
        {
          pathname: '/login',
          query: {
            redirect: router.asPath,
          },
        },
        '/login'
      ).then(() => {
        dispatch(logout());
      });
    }
  };

  useEffect(() => {
    if (hasDataReturned) {
      if (userData && preference && permissions && availableRoles && availableBranches) {
        updateAbility(userAbility, permissions as Partial<Record<string, string>>);

        dispatch(
          authenticate({
            user: userData,
            permissions: permissions as Record<string, string>,
            preference,
            availableRoles: availableRoles as RoleInfo[],
            availableBranches: availableBranches as RoleInfo[],
          })
        );
      }
    }
  }, [dispatch, hasDataReturned, hasData, userData]);

  if (!router.isReady) {
    return;
  }

  document.onvisibilitychange = () => {
    if (document.visibilityState === 'visible') {
      getRefreshToken();
    }
  };
};
