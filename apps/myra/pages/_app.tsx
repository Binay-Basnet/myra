import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';

import { Box, FloatingShortcutButton, Toaster } from '@coop/shared/ui';
import { store, theme, useInit, useSnap } from '@coop/shared/utils';

import '@raralabs/web-feedback/dist/css/style.css'; // stylesheet
import 'react-patro/src/styles.css';
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
  useInit();
  useSnap();

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Myra | Cloud Cooperative Platform</title>
      </Head>
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      <ToastContainer />
      <Toaster />
      <main className="app">{getLayout(<Component {...pageProps} />)}</main>
      <Box
        position="fixed"
        bottom="40px"
        left="32px"
        display="flex"
        flexDirection="row-reverse"
        zIndex="99"
      >
        <FloatingShortcutButton />
      </Box>
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
      <ReactQueryDevtools />
    </QueryClientProvider>
    {/* </AuthProvider> */}
  </Provider>
);

export default CustomApp;
