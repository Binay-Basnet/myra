import { AppProps } from 'next/app';
import Head from 'next/head';

import './styles.css';

const CustomApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Welcome to employee-portal!</title>
    </Head>
    <main className="app">
      <Component {...pageProps} />
    </main>
  </>
);

export default CustomApp;
