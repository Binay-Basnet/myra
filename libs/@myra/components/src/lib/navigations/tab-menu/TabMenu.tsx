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

import { AclKey, Can, MenuType, ModuleType, ROUTES, Subjects, useMenuLink } from '@coop/cbs/utils';
import { en, useTranslation } from '@coop/shared/utils';

const cbsTabs: {
  title: keyof typeof en;
  icon: IconType;
  link: string;
  match: string[];
  aclKey: Subjects;
  navMenu: MenuType;
}[] = [
  {
    title: 'members',
    icon: IoPerson,
    link: ROUTES.CBS_MEMBER_LIST,
    match: ['members'],
    aclKey: 'CBS_MEMBERS_MEMBER',
    navMenu: 'MEMBERS',
  },
  {
    title: 'share',
    icon: IoCubeOutline,
    link: ROUTES.CBS_SHARE_BALANCE,
    match: ['share'],
    aclKey: 'CBS_SHARE',
    navMenu: 'SHARE',
  },
  {
    title: 'savings',
    icon: ImStack,
    link: ROUTES.CBS_ACCOUNT_LIST,
    match: ['savings'],
    aclKey: 'CBS_SAVINGS',
    navMenu: 'SAVINGS',
  },

  {
    title: 'loan',
    icon: BsArrowLeftRight,
    link: ROUTES.CBS_LOAN_APPLICATIONS_LIST,
    match: ['loan'],
    aclKey: 'CBS_LOAN',
    navMenu: 'LOAN',
  },

  {
    title: 'transactions',
    icon: IoIosList,
    link: ROUTES.CBS_TRANS_DEPOSIT_LIST,
    match: ['transactions'],

    aclKey: 'CBS_TRANSACTIONS',
    navMenu: 'TRANSACTIONS',
  },
  {
    title: 'transfer',
    icon: AiOutlineSend,
    link: ROUTES.CBS_TRANSFER_VAULT_LIST,
    match: ['transfers'],
    aclKey: 'CBS_TRANSFERS',
    navMenu: 'TRANSFERS',
  },

  {
    title: 'requests',
    icon: IoMailUnreadOutline,
    link: ROUTES.CBS_REQUESTS_MEMBER_LIST,
    match: ['requests'],
    aclKey: 'CBS_REQUESTS',
    navMenu: 'REQUESTS',
  },
  {
    title: 'withdrawSlip',
    icon: TbMailForward,
    link: ROUTES.CBS_WITHDRAW_SLIP_BOOK_LIST,
    match: ['withdraw'],
    aclKey: 'CBS_WITHDRAWSLIP',
    navMenu: 'WITHDRAW_SLIP',
  },
  {
    title: 'reports',
    icon: BsFileText,
    link: ROUTES.CBS_REPORT_LIST,
    match: ['cbs'],
    aclKey: 'CBS_REPORTS',
    navMenu: 'REPORTS',
  },
  {
    title: 'others',
    icon: IoPrismOutline,
    link: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_LIST,
    match: ['others'],
    aclKey: 'CBS_OTHERS',
    navMenu: 'OTHERS',
  },
];

interface ITabMenuProps {
  tabs?: {
    title: string;
    icon: IconType;
    link: string;
    // Match refers to array of string that needs to match with given route
    match: string[];
    // Key Mapped to Permission Related Info
    aclKey: AclKey;
    navMenu: MenuType;
  }[];

  // Route Index is the index of the router?.asPath.split('/cbs/') that needs to be matched
  routeIndex?: number;

  module: ModuleType;
}

export const TabMenu = ({ tabs = cbsTabs, routeIndex = 2, module }: ITabMenuProps) => (
  <Box
    height="50px"
    w="100%"
    zIndex={20}
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
    <Tabs size="md" height="100%" variant="enclosed">
      <TabList border="none" height="100%" display="flex" gap="s8">
        {tabs.map((tabProps) => (
          <MenuTab {...tabProps} module={module} routeIndex={routeIndex} />
        ))}
      </TabList>
    </Tabs>
  </Box>
);

interface IMenuTabProps {
  title: string;
  icon: IconType;
  // link: string;
  // Match refers to array of string that needs to match with given route
  match: string[];
  // Key Mapped to Permission Related Info
  aclKey: Subjects;
  navMenu: MenuType;
  module: ModuleType;
  routeIndex: number;
}

const MenuTab = ({ aclKey, icon, match, module, navMenu, title, routeIndex }: IMenuTabProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const isActive = match.includes(router?.asPath.split('/')[routeIndex]);

  const { link } = useMenuLink(navMenu, module);

  return (
    <Can I="SHOW_IN_MENU" a={aclKey}>
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
          sx={
            isActive
              ? {
                  bg: 'background.500',
                  color: 'gray.800',
                  borderRadius: 'br2',
                }
              : {
                  bg: 'transparent',
                  color: 'gray.0',
                  borderRadius: 'none',
                }
          }
          color="gray.0"
        >
          <Icon as={icon} size="md" color={isActive ? 'primary.500' : 'primary.300'} />

          <Text fontSize="r1" w="max-content" lineHeight="0" fontWeight={isActive ? '600' : '500'}>
            {t[title] ?? title}
          </Text>
        </Tab>
      </Link>
    </Can>
  );
};

export default TabMenu;
