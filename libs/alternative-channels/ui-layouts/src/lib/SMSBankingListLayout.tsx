import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { HiPlus } from 'react-icons/hi';
import { useRouter } from 'next/router';

import { TabColumn } from '@coop/myra/components';
import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'acUsers',
    link: '/alternative-channels/smsBanking/users',
  },
];

export const SMSBankingListLayout = ({ children }: IAccountPageLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed">
        <Box height="60px" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['acSMSBanking']}{' '}
          </Text>
        </Box>
        <Box p="s16">
          <Button
            leftIcon={<Icon as={HiPlus} />}
            w="100%"
            justifyContent="start"
            onClick={() => router.push('/alternative-channels/activation?type=smsBanking')}
          >
            {t['new']}
          </Button>

          <Divider my="s16" />
          <TabColumn list={accountColumns} />
          <Divider my="s16" />
          <Button
            onClick={() => router.push('/settings/general/alternative-channels/charges')}
            variant="ghost"
            color="#37474F"
            height="s48"
            width="full"
            justifyContent="start"
            leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
          >
            {t['acSMSBankingSettings']}
          </Button>
        </Box>
      </Box>
      <Box width="calc(100% - 260px)" marginLeft="260px">
        <Box bg="white" minHeight="calc(100vh - 110px)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
