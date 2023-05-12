import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { store, useInit } from '@dhadda-migration/data-access';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Box, Loader, Toaster } from '@myra-ui';
import { theme } from '@myra-ui/theme';

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
      refetchOnMount: true,
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
      cacheTime: fiveMinutesInMs,
      staleTime: fiveMinutesInMs,
    },
  },
});

const MainApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { isLoading } = useInit();

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Dhadda-migration!</title>
      </Head>
      <Toaster />
      {isLoading ? (
        <Box h="100vh" bg="white" display="flex" alignItems="center" justifyContent="center">
          <Loader height={300} />
        </Box>
      ) : (
        <main className="app">{getLayout(<Component {...pageProps} />)}</main>
      )}
    </>
  );
};

const CustomApp = (props: AppPropsWithLayout) => (
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MainApp {...props} />
      </QueryClientProvider>
    </ChakraProvider>
  </Provider>
);

export default CustomApp;
