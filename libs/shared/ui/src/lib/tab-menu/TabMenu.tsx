import { IconType } from 'react-icons';
import { AiOutlineSend } from 'react-icons/ai';
import { BsArrowLeftRight, BsFileText } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';
import { IoIosList } from 'react-icons/io';
import { IoCubeOutline, IoMailUnread, IoPerson } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Icon } from '@coop/shared/ui';
import { en, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface TabMenuProps {}

const NAVBAR_TAB_OBJECT: Record<string, number> = {
  members: 0,
  share: 1,
  accounts: 2,
  transactions: 3,
  loan: 4,
  reports: 5,
  transfer: 6,
  requests: 7,
};

const demotabs: { title: keyof typeof en; icon: IconType; link: string }[] = [
  {
    title: 'members',
    icon: IoPerson,
    link: '/members/list',
  },
  {
    title: 'share',
    icon: IoCubeOutline,
    link: '/share/balance',
  },
  {
    title: 'savings',
    icon: ImStack,
    link: '/accounts/list',
  },

  {
    title: 'transactions',
    icon: IoIosList,
    link: '/transactions/deposit/list',
  },
  {
    title: 'loan',
    icon: BsArrowLeftRight,
    link: '/loan/applications',
  },
  {
    title: 'reports',
    icon: BsFileText,
    link: '/reports/cbs/share-report',
  },
  {
    title: 'transfer',
    icon: AiOutlineSend,
    link: '/transfer/vault-transfer/list',
  },
  {
    title: 'requests',
    icon: IoMailUnread,
    link: '/requests/member',
  },
];

export const TabMenu = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) => router.asPath.split('/')[1] === string) ??
        '/dashboard'
    ];

  return (
    <Box
      height="50px"
      px="s16"
      pt="s4"
      pb="5px"
      background="secondary.700"
      alignItems="center"
      display="flex"
    >
      {/* <Box w="240px">
        <Text fontWeight="SemiBold" fontSize="s16" color="gray.0" letterSpacing="wide">
          {t['corebankingSystems']}
        </Text>
      </Box> */}
      <Tabs index={currentIndex} size="md" height="100%" variant="enclosed">
        <TabList border="none" height="100%" display="flex" gap="s8">
          {demotabs.map(({ title, icon, link }) => {
            const isActive = router.asPath.split('/')[1].includes(title.toLowerCase());

            return (
              <Link href={link} key={title}>
                <Tab
                  _focus={{}}
                  px="s16"
                  py="s4"
                  display="flex"
                  alignItems="center"
                  gap="s8"
                  border="none"
                  _hover={{
                    bg: 'background.500',
                    color: 'neutralColorLight.Gray-60',
                    borderRadius: 'br2',
                  }}
                  _selected={{
                    bg: 'background.500',
                    color: 'gray.800',
                    borderRadius: 'br2',
                  }}
                  _active={{
                    color: 'gray.800',
                  }}
                  color="gray.0"
                >
                  <Icon as={icon} size="md" color={isActive ? 'primary.500' : 'primary.300'} />

                  <Text fontSize="r1" lineHeight="0" fontWeight={isActive ? '600' : '500'}>
                    {t[title]}
                  </Text>
                </Tab>
              </Link>
            );
          })}
        </TabList>
      </Tabs>
    </Box>
  );
};

export default TabMenu;
