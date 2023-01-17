import Image from 'next/legacy/image';
import { useRouter } from 'next/router';

import { Box, Button, Text } from '@myra-ui/foundations';

import { ROUTES } from '@coop/cbs/utils';

export interface ErrorProps {
  isPage?: boolean;
  isCentered?: boolean;
  errorCode: number;
  errorTitle: string;
  errorMessage: string;
  errorMessageSubTitle: string;
}

export const Error = ({
  isPage,
  isCentered,
  errorMessage,
  errorTitle,
  errorCode,
  errorMessageSubTitle,
}: ErrorProps) => {
  const router = useRouter();

  return (
    <Box
      {...(isPage
        ? {}
        : isCentered
        ? {
            display: 'flex',
            justifyContent: 'center',
            pt: '20vh',
          }
        : { pt: '120px', pl: '120px' })}
    >
      <Box display="flex" flexDir="column" alignItems={isCentered ? 'center' : 'start'} gap="s16">
        <Box display="flex" flexDir="column" alignItems={isCentered ? 'center' : 'start'} gap="s4">
          <Image
            src="/401.svg"
            width="100"
            height="100"
            objectFit="contain"
            objectPosition="center"
          />

          <Text fontSize="r2" color="gray.500" fontWeight="600">
            Error Code: {errorCode}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            alignItems={isCentered ? 'center' : 'start'}
            gap="s8"
          >
            <Text fontSize="36px" lineHeight="100%" fontWeight="600" color="gray.700">
              {errorTitle}
            </Text>
            <Text
              w="70ch"
              fontSize="r1"
              fontWeight="400"
              color="gray.600"
              textAlign={isCentered ? 'center' : 'left'}
            >
              {errorMessage}
              <br />
              <Box display="inline">{errorMessageSubTitle}</Box>
            </Text>
          </Box>
        </Box>
        <Box display="flex" gap="s16">
          <Button variant="solid" shade="primary" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button variant="outline" shade="neutral" onClick={() => router.push(ROUTES.HOME)}>
            Get back to home page
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Error;
