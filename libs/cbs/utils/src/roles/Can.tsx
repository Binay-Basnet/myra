import { createContext, ReactNode } from 'react';
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
          <Text fontSize="r2" color="gray.500" fontWeight="600">
            Error Code: 401
          </Text>
          <Box
            display="flex"
            flexDir="column"
            alignItems={isCentered ? 'center' : 'start'}
            gap="s8"
          >
            <Text fontSize="36px" fontWeight="600" color="gray.700">
              Forbidden Resource
            </Text>
            <Text
              w="70ch"
              fontSize="r1"
              fontWeight="400"
              color="gray.600"
              textAlign={isCentered ? 'center' : 'left'}
            >
              Sorry, you are not authorized to access this resource. Please make sure you are logged
              in with the correct credentials or contact the website administrator for assistance.
            </Text>
          </Box>
        </Box>
        <Button variant="outline" shade="neutral" onClick={() => router.push(ROUTES.HOME)}>
          Get back to home page
        </Button>
      </Box>
    </Box>
  );
};
