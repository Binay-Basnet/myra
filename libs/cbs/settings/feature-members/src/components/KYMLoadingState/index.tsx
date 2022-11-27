import { Skeleton } from '@chakra-ui/react';

import { AccordionPanel } from '@myra-ui';

export const KYMLoadingState = () => (
  <AccordionPanel pb={0} display="flex" flexDirection="column" gap="s16">
    <Skeleton height="40px" borderRadius="br1" />
    <Skeleton height="40px" borderRadius="br1" />
    <Skeleton height="40px" borderRadius="br1" />
  </AccordionPanel>
);
