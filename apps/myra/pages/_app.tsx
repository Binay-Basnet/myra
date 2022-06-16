import type { ReactElement, ReactNode } from 'react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from '@coop/myra/components';
import { store, theme } from '@coop/shared/utils';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

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
      cacheTime: fiveMinutesInMs,
      staleTime: fiveMinutesInMs,
    },
  },
});

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn')) ||
      false
  );
  // React.useEffect(() => {
  //   setIsLoggedIn(
  //     typeof window !== 'undefined' && localStorage.getItem('isLoggedIn')
  //   );
  // }, [isLoggedIn]);
  const getLayout = Component.getLayout || ((page) => page);
  console.log('hello', isLoggedIn);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>Myra | Cloud Cooperative Platform</title>
          </Head>
          {isLoggedIn === 'true' ? (
            <main className="app">
              {getLayout(<Component {...pageProps} />)}
            </main>
          ) : (
            <Login />
          )}
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default CustomApp;
