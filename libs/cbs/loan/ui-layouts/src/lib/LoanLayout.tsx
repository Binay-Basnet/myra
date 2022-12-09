import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { CgLoadbarDoc } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  AddButtonList,
  Box,
  Divider,
  PopOverComponentForButtonList,
  SettingsButton,
  Text,
} from '@myra-ui';

import { TabColumn } from '@coop/myra/components';
import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'Loan Applications',
    link: '/loan/applications',
    addLink: '/loan/apply',
  },
  {
    title: 'Loan Accounts',
    link: '/loan/accounts',
  },
  {
    title: 'Loan Repayment',
    link: '/loan/repayments',
    addLink: '/loan/repayments/add',
  },
  {
    title: 'Loan Products',
    link: '/loan/products',
  },
  { title: 'Declined Loan', link: '/loan/declined' },
];
const addButtoncolumns = [
  {
    title: 'New Loan Application',
    link: '/loan/apply',
  },
  {
    title: 'Loan Repayment',
    link: '/loan/repayments/add',
  },
];

const settingsColumn = [
  {
    label: 'loanLayoutSettings',
    navigate: '/settings/general/loan',
  },
  {
    label: 'loanLayoutProductsSettings',
    navigate: '/settings/general/loan-products',
  },
];

const reportColumn = [
  {
    label: 'loanLayoutStatementReport',
    navigate: '/reports/cbs/loan/statement/new',
  },
  {
    label: 'loanLayoutAgeingReport',
    navigate: '/settings/general/members/kym-individual',
  },
];

export const LoanListLayout = ({ children }: IAccountPageLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box minH="calc(100vh - 110px)">
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        width="260px"
        height="calc(100vh - 110px)"
        overflowY="auto"
        position="fixed"
      >
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

          <Link href="/loan/applications">
            <Text lineHeight="125%" fontSize="l1" fontWeight="600" color="gray.800">
              {t['kymIndFinancialLoan']}
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
            New Loan Application

          </Button> */}

          <PopOverComponentForButtonList buttonLabel="loanLayoutTopButton">
            {addButtoncolumns.map((item) => (
              <Box key={item?.title}>
                <AddButtonList label={item?.title} onClick={() => router.push(`${item.link}`)} />
              </Box>
            ))}
          </PopOverComponentForButtonList>
          <Divider my="s16" />
          <TabColumn list={accountColumns} />
          <Divider my="s16" />
          {settingsColumn.map((item) => (
            <SettingsButton
              icon={AiOutlineSetting}
              buttonLabel={t[item?.label]}
              onClick={() => router.push(item?.navigate)}
            />
          ))}
          {reportColumn.map((item) => (
            <SettingsButton
              onClick={() => item?.navigate && router.push(item?.navigate)}
              icon={CgLoadbarDoc}
              buttonLabel={t[item?.label]}
            />
          ))}
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
