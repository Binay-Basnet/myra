import type { ReactElement, ReactNode } from 'react';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

import { Login } from '@coop/myra/components';
import { store, theme } from '@coop/shared/utils';

const { ToastContainer, toast } = createStandaloneToast();

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
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
      cacheTime: fiveMinutesInMs,
      staleTime: fiveMinutesInMs,

      onError: (error) => {
        toast({
          title: '500 Server Error',
          description: 'Check Console for More Info',
          status: 'error',
          variant: 'left-accent',
          position: 'bottom-right',
          isClosable: true,
          size: 'lg',
        });
      },
    },
  },
});

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    typeof window !== 'undefined' &&
      setIsLoggedIn(Boolean(isLoggedIn || false));
  }, []);

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Myra | Cloud Cooperative Platform</title>
          </Head>
          <ToastContainer />
          {isLoggedIn === true ? (
            <main className="app">
              {getLayout(<Component {...pageProps} />)}
            </main>
          ) : (
            <main className="app">
              <Login />
            </main>
          )}
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default CustomApp;
