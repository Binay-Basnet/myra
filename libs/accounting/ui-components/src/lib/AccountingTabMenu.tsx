import { IconType } from 'react-icons';
import { AiOutlineAppstore } from 'react-icons/ai';
import { ImStack } from 'react-icons/im';
import { IoIosList } from 'react-icons/io';
import { IoCubeOutline, IoPerson } from 'react-icons/io5';
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
  '/loan': 3,
  '/investment': 4,
  '/accounting': 2,
};

// ! TODO create theme and tests
export const AccountingTabMenu = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const demotabs: { title: keyof typeof en; icon: IconType; link: string }[] = [
    {
      title: t['accountingAccountingTabMenuSales'],
      icon: AiOutlineAppstore,
      link: '/accounting/sales/list',
    },
    {
      title: t['accountingAccountingTabMenuPurchase'],
      icon: IoPerson,
      link: '/accounting/purchase/list',
    },
    {
      title: t['accountingAccountingTabMenuAccounting'],
      icon: IoCubeOutline,
      link: '/accounting/accounting/journal-vouchers/list',
    },
    {
      title: t['accountingAccountingTabMenuLoan'],
      icon: ImStack,
      link: '/accounting/loan/external-loan/list',
    },

    {
      title: t['accountingAccountingTabMenuInvestment'],
      icon: IoIosList,
      link: '/accounting/investment/list',
    },
  ];

  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) => router?.pathname.includes(string)) ??
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
      justifyContent="flex-start"
      display="flex"
      gap="s8"
    >
      <Box w="200px">
        <Text fontWeight="600" fontSize="16px" color="gray.0" letterSpacing="wide">
          {t['accountingAccountingTabMenuAccounting']}
        </Text>
      </Box>
      <Tabs index={currentIndex} height="100%" size="md" variant="enclosed">
        <TabList border="none" height="100%">
          {demotabs.map(({ title, icon, link }, index) => {
            const isActive = index === currentIndex;
            return (
              <Link href={link} key={link}>
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
                  <Icon as={icon} size="md" color={isActive ? 'primary.500' : 'primary.300'} />

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
};

export default AccountingTabMenu;
