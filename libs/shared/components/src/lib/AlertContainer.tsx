import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

import { Box, BoxProps, Button } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IAlertContainer extends BoxProps {
  children: React.ReactNode;
}

export const AlertContainer = ({ children, ...rest }: IAlertContainer) => {
  const { t } = useTranslation();
  return (
    <Alert status="success">
      <AlertIcon />
      <Box>
        <AlertTitle>{t['bankAccountNewChequeBook']} </AlertTitle>
        <AlertDescription>
          It looks like you are run out of cheque leafs. Consider Creating new
          cheque book
        </AlertDescription>
      </Box>
      <Button
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        // onClick={onClose}
      />
    </Alert>
  );
};
