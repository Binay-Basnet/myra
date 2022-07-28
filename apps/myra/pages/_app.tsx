import { ReactElement, ReactNode, useCallback, useRef, useState } from 'react';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider, useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next';
import type { AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';

import { useGetMeQuery } from '@coop/shared/data-access';
import { Box, FloatingShortcutButton } from '@coop/shared/ui';
import { RootState, useRefreshToken, useSnap } from '@coop/shared/utils';
import { store, theme } from '@coop/shared/utils';
import { authenticate, logout, saveToken } from '@coop/shared/utils';

import Login from './login';

import '@raralabs/web-feedback/dist/css/style.css'; // stylesheet

const { ToastContainer } = createStandaloneToast();

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
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
      cacheTime: fiveMinutesInMs,
      staleTime: fiveMinutesInMs,

      // onError: (error) => {
      //   toast({
      //     title: '500 Server Error',
      //     description: 'Check Console for More Info',
      //     status: 'error',
      //     variant: 'left-accent',
      //     position: 'bottom-right',
      //     isClosable: true,
      //     size: 'lg',
      //   });
      // },
    },
  },
});

const url = process.env['NX_SCHEMA_PATH'] ?? '';

// https://github.com/vercel/next.js/issues/18127#issuecomment-950907739
// Nextjs Seems to have router memoization problem. so had to create this hook
function useReplace() {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const [{ replace }] = useState<Pick<NextRouter, 'replace'>>({
    replace: (path) => routerRef.current.replace(path),
  });
  return replace;
}

function useInit() {
  const [triggerQuery, setTriggerQuery] = React.useState(false);
  const dispatch = useDispatch();
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
}

function MainApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page) => page);
  const auth = useSelector((state) => state?.auth);

  useInit();

  useSnap();

  console.log('rfeekk main');

  if (auth.isLogged === null) {
    return (
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner />
      </Box>
    );
  }

  if (!auth.isLogged) {
    return <Login />;
  }
  return (
    <>
      <Head>
        <title>Myra | Cloud Cooperative Platform</title>
      </Head>
      <ToastContainer />
      <main className="app">{getLayout(<Component {...pageProps} />)}</main>
      <Box
        position="fixed"
        bottom={'40px'}
        right={'32px'}
        display="flex"
        flexDirection={'row-reverse'}
        zIndex="99"
      >
        <FloatingShortcutButton />
      </Box>
    </>
  );
}

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <MainApp Component={Component} pageProps={pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      {/* </AuthProvider> */}
    </Provider>
  );
}

export default CustomApp;
