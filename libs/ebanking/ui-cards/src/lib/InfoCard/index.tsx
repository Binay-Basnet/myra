import React from 'react';

import { Box, Divider, Text, VStack } from '@coop/shared/ui';

export interface InfoCardProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  btn?: React.ReactNode;
}

export function InfoCard({ title, subtitle, children, btn }: InfoCardProps) {
  return (
    <VStack
      width="100%"
      bg="white"
      spacing="0"
      alignItems="start"
      divider={<Divider border="1px" borderColor="border.layout" />}
      borderRadius="br2"
    >
      <Box
        display="flex"
        alignItems="center"
        w="100%"
        justifyContent="space-between"
        px="s16"
        height="50px"
      >
        <Box display="flex" flexDir="column" gap="s4">
          <Text
            fontSize="r1"
            color="gray.700"
            fontWeight="600"
            lineHeight={'125%'}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              fontSize="s3"
              color="gray.600"
              fontWeight="500"
              lineHeight={'16.25px'}
            >
              {subtitle}{' '}
            </Text>
          )}
        </Box>
        {btn}
      </Box>
      <Box width="100%">{children}</Box>
    </VStack>
  );
}

export default InfoCard;
