import type { ReactElement, ReactNode } from 'react';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { Snipping } from '@raralabs/web-feedback';

import { Login } from '@coop/myra/components';
import { Box, Button, FloatingShortcutButton } from '@coop/shared/ui';
import { store, theme } from '@coop/shared/utils';

import '@raralabs/web-feedback/dist/css/style.css'; // stylesheet

const { ToastContainer } = createStandaloneToast();

const snap = new Snipping({
  buttonLabel: 'Send Feedback',
  initialMarkMode: 'mark',
  fileName: 'feedbackScreenshot.png',
  /** other configs **/
});

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

      // onError: (error) => {
      //   toast({
      //     title: '500 Server Error',
      //     description: 'Check Console for More Info',
      //     status: 'error',
      //     variant: 'left-accent',
      //     position: 'bottom-right',
      //     isClosable: true,
      //     size: 'lg',
      //   });
      // },
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

  useEffect(() => {
    snap.init((data) => {
      const { image, base64Image } = data;
      console.log(image);
    });
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
          <Box
            position="fixed"
            bottom={'40px'}
            right={'32px'}
            display="flex"
            flexDirection={'row-reverse'}
          >
            <FloatingShortcutButton />
          </Box>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default CustomApp;
