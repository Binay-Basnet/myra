import { IconType } from 'react-icons';
import { AiOutlineSend } from 'react-icons/ai';
import { BsArrowLeftRight, BsFileText } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';
import { IoIosList } from 'react-icons/io';
import { IoCubeOutline, IoMailUnreadOutline, IoPerson, IoPrismOutline } from 'react-icons/io5';
import { TbMailForward } from 'react-icons/tb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Icon } from '@myra-ui/foundations';

import { en, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface TabMenuProps {}

const cbsTabs: { title: keyof typeof en; icon: IconType; link: string; match: string[] }[] = [
  {
    title: 'members',
    icon: IoPerson,
    link: '/cbs/members/list',
    match: ['members'],
  },
  {
    title: 'share',
    icon: IoCubeOutline,
    link: '/cbs/share/balance',
    match: ['share'],
  },
  {
    title: 'savings',
    icon: ImStack,
    link: '/cbs/savings/list',
    match: ['savings'],
  },

  {
    title: 'loan',
    icon: BsArrowLeftRight,
    link: '/cbs/loan/applications',
    match: ['loan'],
  },

  {
    title: 'transactions',
    icon: IoIosList,
    link: '/cbs/transactions/deposit/list',
    match: ['transactions'],
  },
  {
    title: 'transfer',
    icon: AiOutlineSend,
    link: '/cbs/transfer/vault-transfer/list',
    match: ['transfer'],
  },

  {
    title: 'requests',
    icon: IoMailUnreadOutline,
    link: '/cbs/requests/member',
    match: ['requests'],
  },
  {
    title: 'withdrawSlip',
    icon: TbMailForward,
    link: '/cbs/withdraw/withdraw-slip-book/list',
    match: ['withdraw'],
  },
  {
    title: 'reports',
    icon: BsFileText,
    link: '/cbs/reports/cbs/organizations',
    match: ['reports'],
  },
  {
    title: 'others',
    icon: IoPrismOutline,
    link: '/cbs/others/market-representative/list',
    match: ['others'],
  },
];

interface ITabMenuProps {
  tabs?: {
    title: string;
    icon: IconType;
    link: string;
    // Match refers to array of string that needs to match with given route
    match: string[];
  }[];

  // Route Index is the index of the router?.asPath.split('/cbs/') that needs to be matched
  routeIndex?: number;
}

export const TabMenu = ({ tabs = cbsTabs, routeIndex = 2 }: ITabMenuProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const currentIndex = tabs?.findIndex((tab) =>
    tab.match.includes(router?.asPath.split('/')[routeIndex])
  );

  return (
    <Box
      height="50px"
      px="s16"
      pt="s4"
      pb="5px"
      gap="32px"
      background="secondary.700"
      alignItems="center"
      display="flex"
      overflowX="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Tabs index={currentIndex} size="md" height="100%" variant="enclosed">
        <TabList border="none" height="100%" display="flex" gap="s8">
          {tabs.map(({ title, icon, link, match }) => {
            const isActive = match.includes(router?.asPath.split('/')[routeIndex]);

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

                  <Text
                    fontSize="r1"
                    w="max-content"
                    lineHeight="0"
                    fontWeight={isActive ? '600' : '500'}
                  >
                    {t[title] ?? title}
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
