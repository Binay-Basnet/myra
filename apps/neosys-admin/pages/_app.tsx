import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Box, Loader, Toaster } from '@myra-ui';
import { neosysTheme } from '@myra-ui/theme';

import { store, useInit } from '@coop/neosys-admin/data-access';
import { useSnap } from '@coop/shared/utils';

import '@raralabs/web-feedback/dist/css/style.css'; // stylesheet

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
  useSnap();

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Neosys Admin</title>
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
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={neosysTheme}>
        <MainApp {...props} />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Provider>
);

export default CustomApp;
