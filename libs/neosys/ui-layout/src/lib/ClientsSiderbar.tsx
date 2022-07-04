import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, Divider, Text } from '@coop/shared/ui';

interface IClientsSidebarProps {
  children: React.ReactNode;
}

export const ClientsSiderbarLayout = ({ children }: IClientsSidebarProps) => {
  return (
    <Box display="flex">
      <Box width="275px" p="s24">
        <Box>
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            Clients
          </Text>

          <Divider my="s16" />

          <Button
            width="full"
            size="lg"
            justifyContent="start"
            leftIcon={<AddIcon h="11px" />}
          >
            {'Add CLient'}
          </Button>

          <Divider my="s16" />

          <Button
            width="full"
            size="lg"
            color="gray.600"
            // color="#37474F"
            fontWeight={600}
            variant="ghost"
            justifyContent="start"
          >
            Client List
          </Button>

          <Divider my="s16" />

          <Button
            width="full"
            size="lg"
            justifyContent="start"
            variant="ghost"
            color="gray.600"
            leftIcon={<AiOutlineSetting height="11px" />}
          >
            {'Client Settings'}
          </Button>
        </Box>
      </Box>
      <Box width="calc(100% - 275px)" left="275px">
        {children}
      </Box>
    </Box>
  );
};
