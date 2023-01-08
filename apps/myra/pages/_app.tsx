import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Box, Loader, Toaster } from '@myra-ui';
import { theme } from '@myra-ui/theme';

import { store, useInit } from '@coop/cbs/data-access';

import '@raralabs/web-feedback/dist/css/style.css';
import './app.css';
import { buildEmptyPermissions, AbilityContext } from '@coop/cbs/utils';

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
      staleTime: 0,
    },
  },
});

const MainApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // useSnap();
  const { isLoading } = useInit();

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Myra | Cloud Cooperative Platform</title>
      </Head>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <ToastContainer />
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

const ability = buildEmptyPermissions();

const CustomApp = (props: AppPropsWithLayout) => {
  return (
    <Provider store={store}>
      {/* <AuthProvider> */}
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AbilityContext.Provider value={ability}>
            <MainApp {...props} />
          </AbilityContext.Provider>
        </ChakraProvider>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
      {/* </AuthProvider> */}
    </Provider>
  );
};

export default CustomApp;
