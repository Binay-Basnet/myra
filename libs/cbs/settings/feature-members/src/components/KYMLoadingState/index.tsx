import React from 'react';
import { Skeleton } from '@chakra-ui/react';

import { AccordionPanel } from '@coop/shared/ui';

export const KYMLoadingState = () => {
  return (
    <AccordionPanel pb={0} display="flex" flexDirection="column" gap="s16">
      <Skeleton height="40px" borderRadius="br1" />
      <Skeleton height="40px" borderRadius="br1" />
      <Skeleton height="40px" borderRadius="br1" />
    </AccordionPanel>
  );
};
