import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Box, Loader, Toaster } from '@myra-ui';
import { theme } from '@myra-ui/theme';

import { store, useInit } from '@coop/cbs/data-access';
import { AbilityContext, buildEmptyPermissions } from '@coop/cbs/utils';

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

const MainApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { isLoading } = useInit();

  const getLayout = Component.getLayout || ((page) => page);

  if (isLoading) {
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
