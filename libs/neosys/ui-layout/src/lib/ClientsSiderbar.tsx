import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, Divider, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IClientsSidebarProps {
  children: React.ReactNode;
}

export const ClientsSiderbarLayout = ({ children }: IClientsSidebarProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <Box display="flex">
      <Box width="275px" p="s24" position="fixed" flexShrink={0}>
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['neoClientSiderbarClients']}
        </Text>

        <Divider my="s16" />

        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => router.push('/clients/[action]')}
        >
          {t['neoClientSiderbarClientsAdd']}
        </Button>

        <Divider my="s16" />

        <Button
          width="full"
          size="lg"
          color="gray.600"
          fontWeight={600}
          variant="ghost"
          justifyContent="start"
          onClick={() => router.push('/clients')}
        >
          {t['neoClientSidebarClientList']}
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
          {t['neoClientSiderbarSettings']}
        </Button>
      </Box>
      <Box
        width="calc(100% - 275px)"
        left="275px"
        overflowX="hidden"
        position="relative"
        minHeight="calc(100vh - 110px)"
        bg="white"
      >
        {children}
      </Box>
    </Box>
  );
};
