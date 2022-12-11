import React from 'react';
import Link from 'next/link';

import { Box, Text } from '@myra-ui';

import { TabColumn } from '@coop/myra/components';
import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  // {
  //   title: 'Member Request',
  //   link: '/requests/member',
  // },
  // {
  //   title: 'Chequebook Request',
  //   link: '/requests/cheque-book',
  // },
  // {
  //   title: 'Teller Transfer Request',
  //   link: '/requests/teller-transfer',
  // },
  // {
  //   title: 'Branch Transfer Request',
  //   link: '/requests/branch-transfer',
  // },
  {
    title: 'Withdraw Request',
    link: '/requests/withdraw-via-collector',
  },
  {
    title: 'Loan Request',
    link: '/requests/loan',
  },

  // {
  //   title: 'Block Cheque Request',
  //   link: '/requests/block-cheque',
  // },
];

export const RequestListLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();
  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          py="s16"
          pb="s8"
          justifyContent="center"
          gap="s2"
          px="s16"
        >
          <Text fontSize="s2" fontWeight="600" color="primary.500">
            {t['corebankingSystems']}
          </Text>

          <Link href="/requests/member">
            <Text lineHeight="125%" fontSize="l1" fontWeight="600" color="gray.800">
              Request
            </Text>
          </Link>
        </Box>

        <Box p="s16">
          {/* <Button
            display="flex"
            justifyContent="start"
            onClick={() => router.push('/loan/apply')}
            w="100%"
            height="44px"
            leftIcon={<Icon as={AiOutlinePlus} size="md" color="white" />}
            >
            New Request
          </Button> */}

          {/* <Divider my="s16" /> */}
          <TabColumn list={accountColumns} />
        </Box>
      </Box>
      <Box
        // boxShadow="xl"
        width="calc(100% - 260px)"
        marginLeft="260px"
      >
        <Box bg="white" minHeight="calc(100vh - 110px)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
