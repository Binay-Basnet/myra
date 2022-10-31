import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

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
export const LoanListLayout = ({ children }: IAccountPageLayoutProps) => {
  const router = useRouter();

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed">
        <Box height="60px" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            Loan
          </Text>
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
          <Button
            onClick={() => router.push('/settings/general/loan')}
            variant="ghost"
            color="#37474F"
            height="s48"
            width="full"
            justifyContent="start"
            leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
          >
            Loan Settings
          </Button>
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
