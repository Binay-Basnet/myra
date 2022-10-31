import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { useGetNewIdMutation } from '@coop/cbs/data-access';
import { TabColumn } from '@coop/myra/components';
import {
  AddButtonList,
  Box,
  Button,
  Divider,
  Icon,
  PopOverComponentForButtonList,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface ISalesLayoutProps {
  children: React.ReactNode;
}

const inventoryColumns = [
  {
    title: 'accountingSalesSalesEntry',
    link: '/accounting/sales/list',
    addLinkId: '/accounting/sales',
  },
  {
    title: 'creditNote',
    link: '/accounting/sales/credit-note/list',
    addLinkId: '/accounting/sales/credit-note',
  },
  {
    title: 'customerPayment',
    link: '/accounting/sales/customer-payment/list',
    addLinkId: '/accounting/sales/customer-payment',
  },
  {
    title: 'accountingSalesCustomers',
    link: '/accounting/sales/customer/list',
    addLinkId: '/accounting/sales/customer',
  },
];

export const SalesLayout = ({ children }: ISalesLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const newId = useGetNewIdMutation();

  const dropdownButtons: { label: string; link?: string; linkId?: string }[] = [
    {
      label: t['accountingSalesSalesEntry'],
      linkId: '/accounting/sales/add',
    },
    {
      label: t['creditNote'],
      linkId: '/accounting/sales/credit-note/add',
    },
    {
      label: t['customerPayment'],
      linkId: '/accounting/sales/customer-payment/add',
    },
    {
      label: t['accountingSalesCustomers'],
      linkId: '/accounting/sales/customers/add',
    },
  ];

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['accountingsales']}
        </Text>
        <Divider my="s16" />

        <PopOverComponentForButtonList buttonLabel={t['accountingPurchaseSidebarCreate']}>
          {dropdownButtons.map((item) => (
            <Box key={item.link}>
              <AddButtonList
                label={t[item.label] ?? item.label}
                onClick={() => {
                  if (item.linkId) {
                    newId
                      .mutateAsync({})
                      .then((res) => router.push(`${item.linkId}/${res?.newId}`));
                  } else {
                    item.link && router.push(item.link);
                  }
                }}
              />
            </Box>
          ))}
        </PopOverComponentForButtonList>

        <Divider my="s16" />
        <TabColumn list={inventoryColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/accounting/sales/settings')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
        >
          {t['accountingSalesSettings']}
        </Button>
      </Box>
      <Box
        width="calc(100% - 275px)"
        position="relative"
        left="275px"
        minH="calc(100vh - 110px)"
        bg="white"
      >
        {children}
      </Box>
    </Box>
  );
};
