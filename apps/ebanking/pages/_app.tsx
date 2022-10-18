import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import { store, useCoopInit, useInit } from '@coop/ebanking/data-access';
import { Toaster } from '@coop/shared/ui';
import { theme } from '@coop/shared/utils';

import './styles.css';

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
    },
  },
});

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);

  useCoopInit();
  useInit();

  return (
    <>
      <Head>
        <title>E Banking</title>
      </Head>
      <Toaster />

      <QueryClientProvider client={queryClient}>
        <main suppressHydrationWarning>{getLayout(<Component {...pageProps} />)}</main>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

const CustomApp = (props: AppPropsWithLayout) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App {...props} />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);

export default CustomApp;
