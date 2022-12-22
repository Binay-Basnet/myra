import React from 'react';
import { useRouter } from 'next/router';

import { AddButtonList, Box, Divider, PopOverComponentForButtonList, Text } from '@myra-ui';

import { TabColumn } from '@coop/myra/components';
import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const userColumns = [
  {
    title: 'acMBanking',
    link: '/alternative-channels/users/mBanking',
    addLink: '/alternative-channels/users/activation?type=mBanking',
  },
  {
    title: 'acEBanking',
    link: '/alternative-channels/users/eBanking',
    addLink: '/alternative-channels/users/activation?type=eBanking',
  },
  {
    title: 'acSMSBanking',
    link: '/alternative-channels/users/smsBanking',
    addLink: '/alternative-channels/users/activation?type=smsBanking',
  },
];

const addButtoncolumns = [
  {
    title: 'acActivateMBanking',
    link: '/alternative-channels/users/activation?type=mBanking',
  },
  {
    title: 'acActivateEBanking',
    link: '/alternative-channels/users/activation?type=eBanking',
  },
  {
    title: 'acActivateSMSBanking',
    link: '/alternative-channels/users/activation?type=smsBanking',
  },
];

export const UserLayout = ({ children }: IAccountPageLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed">
        <Box height="60px" py="s12" px="s16">
          <Text fontSize="s2" fontWeight="600" color="primary.500">
            Alternative Channels
          </Text>
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['acUsers']}
          </Text>
        </Box>
        <Box p="s16">
          <PopOverComponentForButtonList buttonLabel="shareLayoutNewShare">
            {addButtoncolumns.map((item) => (
              <Box key={item?.title}>
                <AddButtonList label={t[item.title]} onClick={() => router.push(`${item.link}`)} />
              </Box>
            ))}
          </PopOverComponentForButtonList>

          <Divider my="s16" />
          <TabColumn list={userColumns} />
          <Divider my="s16" />
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
