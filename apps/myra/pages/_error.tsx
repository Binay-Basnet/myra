import { NextPageContext } from 'next';

import { Box } from '@myra-ui/foundations';
import { Error } from '@myra-ui/templates';

const ErrorPage = ({ statusCode, message }: { statusCode: number; message: string }) => (
  <Box display="flex" alignItems="center" justifyContent="center" minH="100vh" overflow="hidden">
    <Error isPage isCentered errorCode={statusCode} message={message} />
  </Box>
);

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode: statusCode || 500, message: err?.message };
};

export default ErrorPage;
