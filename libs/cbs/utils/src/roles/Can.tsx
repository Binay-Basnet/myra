import { createContext, ReactNode } from 'react';
import { BoundCanProps, createContextualCan } from '@casl/react';

import { Box } from '@myra-ui/foundations';
import { Error } from '@myra-ui/templates';

import { AppAbilityType } from './ability';

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
              <Error
                errorCode={403}
                // errorTitle="Forbidden Resource"
                // errorMessage="You do not have permissions to access this resource."
                // errorMessageSubTitle=" If you need assistance, please contact branch admin or website administrator."
                isCentered={isErrorCentered}
              />
            </Box>
          );
        }
        return null;
      }
      return children as ReactNode;
    }}
  </SimpleCan>
);
