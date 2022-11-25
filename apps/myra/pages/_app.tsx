import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store } from '@coop/cbs/data-access';
import { Box, Loader, Toaster } from '@coop/shared/ui';
import { theme, useSnap } from '@coop/shared/utils';

import '@raralabs/web-feedback/dist/css/style.css'; // stylesheet
import '@raralabs/react-patro/src/styles.css';
import './app.css';

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
    },
  },
});

const MainApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  useSnap();
  // const { isLoading } = useInit();
  const isLoading = false;

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

const CustomApp = (props: AppPropsWithLayout) => (
  <Provider store={store}>
    {/* <AuthProvider> */}
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <MainApp {...props} />
      </ChakraProvider>
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
    {/* </AuthProvider> */}
  </Provider>
);

export default CustomApp;
