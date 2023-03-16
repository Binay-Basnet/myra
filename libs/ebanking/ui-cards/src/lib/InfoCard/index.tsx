import React from 'react';

import { Box, Button, Divider, Text, VStack } from '@myra-ui';

export interface InfoCardProps {
  title?: string;
  subtitle?: string;
  header?: React.ReactNode;
  children?: React.ReactNode;
  btn?: React.ReactNode;
  footerButtonLabel?: string;
  footerButtonHandler?: () => void;
}

export const InfoCard = ({
  title,
  header,
  subtitle,
  children,
  btn,
  footerButtonLabel,
  footerButtonHandler,
}: InfoCardProps) => (
  <VStack
    width="100%"
    bg="white"
    spacing="0"
    alignItems="start"
    divider={<Divider borderBottom="1px" borderBottomColor="border.layout" />}
    borderRadius="br2"
  >
    {header || (
      <Box
        display="flex"
        alignItems="center"
        w="100%"
        justifyContent="space-between"
        px="s16"
        py={subtitle ? 's16' : 's0'}
        minH="3.125rem"
      >
        <Box display="flex" flexDir="column" gap="s4">
          <Text fontSize="r1" color="gray.800" fontWeight="600" lineHeight="125%">
            {title}
          </Text>
          {subtitle && (
            <Text fontSize="s3" color="gray.600" fontWeight="500" lineHeight="16.25px">
              {subtitle}{' '}
            </Text>
          )}
        </Box>
        {btn}
      </Box>
    )}
    <Box width="100%">{children}</Box>
    {footerButtonLabel && footerButtonHandler && (
      <Box p="s16">
        <Button onClick={footerButtonHandler}>{footerButtonLabel}</Button>
      </Box>
    )}
  </VStack>
);

export default InfoCard;
