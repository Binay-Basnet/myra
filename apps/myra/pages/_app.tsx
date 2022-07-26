import type { ReactElement, ReactNode } from 'react';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppInitialProps, AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

import { Login } from '@coop/myra/components';
import { Box, FloatingShortcutButton } from '@coop/shared/ui';
import {
  AuthProvider,
  store,
  theme,
  useAuth,
  useSnap,
} from '@coop/shared/utils';

// import '../styles/feedback.css';
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

function MainApp({ Component, pageProps }: ManAppProps) {
  const auth = useAuth();
  const getLayout = Component.getLayout || ((page) => page);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    typeof window !== 'undefined' &&
      setIsLoggedIn(Boolean(isLoggedIn || false));
  }, []);

  useSnap();
  console.log('auth', auth);
  return (
    <>
      <Head>
        <title>Myra | Cloud Cooperative Platform</title>
      </Head>
      <ToastContainer />
      {/* {auth?.auth?.user ? ( */}
      <main className="app">{getLayout(<Component {...pageProps} />)}</main>
      {/* ) : (
        <main className="app">
          <Login />
        </main>
      )} */}
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
