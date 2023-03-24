/* eslint-disable-next-line */
import { VStack, Divider, Box, Text } from '@myra-ui';
import React from 'react';

export interface SettingsCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const SettingsCard = ({ title, subtitle, children }: SettingsCardProps) => (
  <VStack
    width="100%"
    border="1px"
    spacing="0"
    alignItems="start"
    divider={<Divider border="1px" borderColor="border.layout" />}
    borderColor="border.layout"
    borderRadius="br2"
  >
    <Box display="flex" alignItems="center" px="s12" height="60px">
      <Box display="flex" flexDir="column" gap="s4">
        <Text fontSize="r1" color="gray.800" fontWeight="600" lineHeight="16.25px">
          {title}
        </Text>
        {subtitle && (
          <Text fontSize="s3" color="gray.600" fontWeight="500" lineHeight="16.25px">
            {subtitle}
          </Text>
        )}
      </Box>
    </Box>
    <Box p="s16" width="100%">
      {children}
    </Box>
  </VStack>
);

export default SettingsCard;
