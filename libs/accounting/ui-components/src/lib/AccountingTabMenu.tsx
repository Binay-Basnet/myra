import { IconType } from 'react-icons';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BsArrowLeftRight, BsFileText } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';
import { IoIosList } from 'react-icons/io';
import { IoCubeOutline, IoPerson } from 'react-icons/io5';
import { MdOutlineWaterDrop } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Icon } from '@coop/shared/ui';
import { en, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingTabMenuProps {}

const NAVBAR_TAB_OBJECT: Record<string, number> = {
  '/sales': 0,
  '/purchase': 1,
  '/accounting': 2,
  '/loan': 3,
  '/investment': 4,
};

// ! TODO create theme and tests
export function AccountingTabMenu() {
  const router = useRouter();
  const { t } = useTranslation();

  const demotabs: { title: keyof typeof en; icon: IconType; link: string }[] = [
    {
      title: 'Sales',
      icon: AiOutlineAppstore,
      link: '/accounting/sales/list',
    },
    {
      title: 'Purchase',
      icon: IoPerson,
      link: '/accounting/sales/list',
    },
    {
      title: 'Accounting',
      icon: IoCubeOutline,
      link: '/accounting/accounting/list',
    },
    {
      title: 'Loan',
      icon: ImStack,
      link: '/accounting/loan/list',
    },

    {
      title: 'Investment',
      icon: IoIosList,
      link: '/accounting/investment/list',
    },
  ];

  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) =>
        router?.pathname.includes(string)
      ) ?? '/dashboard'
    ];

  return (
    <Box
      height="50px"
      px="s16"
      pt="s4"
      pb="5px"
      background="secondary.700"
      alignItems="center"
      justifyContent={'flex-start'}
      display="flex"
      gap="s8"
    >
      <Box w="200px">
        <Text
          fontWeight={'600'}
          fontSize="16px"
          color={'gray.0'}
          letterSpacing="wide"
        >
          {'Accounting'}
        </Text>
      </Box>
      <Tabs index={currentIndex} height="100%" size="md" variant="enclosed">
        <TabList border="none" height="100%">
          {demotabs.map(({ title, icon, link }, index) => {
            const isActive = index === currentIndex;
            return (
              <Link href={link} key={index}>
                <Tab
                  _focus={{}}
                  px="s16"
                  py="s4"
                  display="flex"
                  alignItems="center"
                  gap="s8"
                  border="none"
                  _selected={{
                    bg: 'background.500',
                    color: 'gray.800',
                    borderRadius: 'br2',
                  }}
                >
                  <Icon
                    as={icon}
                    size={'md'}
                    color={isActive ? 'primary.500' : 'primary.300'}
                  />

                  <Text
                    fontSize="r1"
                    lineHeight="0"
                    color={isActive ? 'gray.800' : 'gray.0'}
                    fontWeight={isActive ? '600' : '500'}
                  >
                    {title}
                  </Text>
                </Tab>
              </Link>
            );
          })}
        </TabList>
      </Tabs>
    </Box>
  );
}

export default AccountingTabMenu;
