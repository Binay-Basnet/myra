import { createContext, ReactNode } from 'react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import { BoundCanProps, createContextualCan } from '@casl/react';

import { Box, Button, Text } from '@myra-ui/foundations';

import { AppAbilityType } from './ability';
import { ROUTES } from '../constants/ROUTES';

export const AbilityContext = createContext<AppAbilityType>(undefined!);

const SimpleCan = createContextualCan(AbilityContext.Consumer);

type CanProps = BoundCanProps<AppAbilityType> & {
  showError?: boolean;
  isErrorCentered?: boolean;
};

export const Can = ({ showError = false, children, isErrorCentered, ...rest }: CanProps) => (
  <SimpleCan passThrough={showError || rest.passThrough} {...rest}>
    {(allowed) => {
      if (!allowed) {
        if (showError) {
          return (
            <Box>
              <Error isCentered={isErrorCentered} />
            </Box>
          );
        }
        return null;
      }
      return children as ReactNode;
    }}
  </SimpleCan>
);

interface IErrorProps {
  isCentered?: boolean;
}

const Error = ({ isCentered = false }: IErrorProps) => {
  const router = useRouter();

  return (
    <Box
      {...(isCentered
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
            Error Code: 401
          </Text>
          <Box
            display="flex"
            flexDir="column"
            alignItems={isCentered ? 'center' : 'start'}
            gap="s8"
          >
            <Text fontSize="36px" lineHeight="100%" fontWeight="600" color="gray.700">
              Unauthorized Access
            </Text>
            <Text
              w="70ch"
              fontSize="r1"
              fontWeight="400"
              color="gray.600"
              textAlign={isCentered ? 'center' : 'left'}
            >
              You do not have permissions to access this resource.
              <br />
              <Box display="inline">
                If you need assistance, please contact branch admin or website administrator.
              </Box>
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
