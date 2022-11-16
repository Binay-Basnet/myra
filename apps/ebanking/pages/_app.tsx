import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store, useCoopInit, useInit } from '@coop/ebanking/data-access';
import { Loader, Toaster } from '@coop/shared/ui';
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
  const { isLoading: loading } = useInit();
  const { isLoading: coopLoading } = useCoopInit({ isMeEnabled: !loading });

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Myra | EBanking </title>
      </Head>
      <Toaster />

      <QueryClientProvider client={queryClient}>
        {coopLoading || loading ? (
          <Box h="100vh" bg="white" display="flex" alignItems="center" justifyContent="center">
            <Loader height={300} />
          </Box>
        ) : (
          <main suppressHydrationWarning>{getLayout(<Component {...pageProps} />)}</main>
        )}
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
