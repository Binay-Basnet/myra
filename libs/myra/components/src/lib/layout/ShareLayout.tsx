import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Icon, Text } from '@saccos/myra/ui';
import { useRouter } from 'next/router';

import { TabColumn } from '../tab/TabforMemberPage';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const shareColumns = [
  {
    title: 'shareBalance',
    link: '/share/balance',
  },
  {
    title: 'shareRegister',
    link: '/share/register',
  },
  {
    title: 'shareReport',
    link: '/share/report',
  },
];

export const SharePageLayout = ({ children }: IMemberPageLayout) => {
  const router = useRouter();

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0}>
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Share
        </Text>
        <Divider my="s16" />
        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => {
            console.log('NEW SHARE');
          }}
        >
          New Share
        </Button>
        <Divider my="s16" />
        <TabColumn list={shareColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/members/settings')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          Share Settings
        </Button>
      </Box>
      <Box p="s16" width="100%" borderRadius="br3">
        <Box bg="white" borderRadius="br3">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
