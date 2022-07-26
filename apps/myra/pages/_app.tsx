import type { ReactElement, ReactNode } from 'react';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider, useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next';
import type { AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import axios from 'axios';

import { Login } from '@coop/myra/components';
import { useGetMeQuery } from '@coop/shared/data-access';
import { Box, FloatingShortcutButton } from '@coop/shared/ui';
import { RootState, useSnap } from '@coop/shared/utils';
import { store, theme } from '@coop/shared/utils';
import { authenticate, logout } from '@coop/shared/utils';

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

interface ManAppProps extends AppInitialProps {
  Component: NextPageWithLayout;
}

const useRefreshToken = (url: string) => {
  const history = useRouter();

  const refreshToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return Promise.reject(() => 'No refresh Token');
    return axios
      .post(url, {
        query: `mutation{
          auth{
            token(refreshToken:"${refreshToken}"){
            token{
              refresh
              access
            }
            }
          }
        }`,
      })
      .then((res) => {
        return res.data?.access;
      })
      .catch((err) => {
        history.replace('/');
      });
  };

  return refreshToken;
};

function MainApp({ Component, pageProps }: ManAppProps) {
  const [triggerQuery, setTriggerQuery] = React.useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state?.auth);
  const getMe = useGetMeQuery(
    {},
    {
      enabled: triggerQuery,
      onSuccess: () => {
        setTriggerQuery(false);
      },
    }
  );

  const url = process.env['NX_SCHEMA_PATH'] ?? '';
  const refreshToken = useRefreshToken(url);

  console.log('get me', 'hello', getMe);

  const hasDataReturned = getMe?.data?.auth;
  const isDatasuccessful = getMe?.data?.auth?.me?.data;

  useEffect(() => {
    console.log('hello123');
    refreshToken().then((res) => setTriggerQuery(true));
    // const localStorage.getItem("refreshToken")
  }, []);
  useEffect(() => {
    if (hasDataReturned) {
      if (isDatasuccessful) {
        dispatch(authenticate(auth?.auth));
      } else {
        dispatch(logout());
      }
    }
  }, [hasDataReturned, isDatasuccessful]);
  // getMe.data.auth.me
  const getLayout = Component.getLayout || ((page) => page);

  useSnap();
  console.log('hello123', auth?.isLogged);
  return (
    <>
      <Head>
        <title>Myra | Cloud Cooperative Platform</title>
      </Head>
      <ToastContainer />
      {auth.isLogged === null ? (
        <Box
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner />
        </Box>
      ) : auth?.isLogged ? (
        <main className="app">{getLayout(<Component {...pageProps} />)}</main>
      ) : (
        <main className="app">
          <Login />
        </main>
      )}
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
