import { ReactNode } from 'react';

import { Box, Text } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface ClientDetailHeaderProps {
  title: string;
  button: ReactNode;
}

export const ClientDetailHeader = ({ title, button }: ClientDetailHeaderProps) => (
  <Box height="50px" display="flex" justifyContent="space-between" alignItems="center" p="s16">
    <Text fontSize="r1" fontWeight={600}>
      {title}
    </Text>

    {button}
  </Box>
);

export default ClientDetailHeader;
