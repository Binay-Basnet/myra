import { ReactNode } from 'react';

import { Box, Text } from '@myra-ui';

/* eslint-disable-next-line */
export interface ClientDetailHeaderProps {
  title: string;
  button: ReactNode;
}

export const ClientDetailHeader = ({ title, button }: ClientDetailHeaderProps) => (
  <Box height="3.125rem" display="flex" justifyContent="space-between" alignItems="center" p="s16">
    <Text fontSize="r1" fontWeight={600}>
      {title}
    </Text>

    {button}
  </Box>
);

export default ClientDetailHeader;
