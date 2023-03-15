import { useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Button, Icon, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetLoanAccountListQuery } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

import { SideBar } from '../components';

export const AccountListPage = () => {
  const router = useRouter();
  const searchTerm = router?.query['search'] as string;
  const id = router?.query['id'] as string;

  const { data, isLoading } = useGetLoanAccountListQuery({
    paginate: {
      ...getPaginationQuery(),

      order: null,
    },
    filter: {
      query: `${searchTerm} ${id}`,
    },
  });
  const rowData = useMemo(
    () => data?.settings?.general?.loanProducts?.getLoanAccountlist?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Account No',
        accessorFn: (row) => row?.node?.id,
        cell: (props) => (
          <RedirectButton
            link={`${ROUTES.CBS_LOAN_ACCOUNT_DETAILS}?id=${props?.row?.original?.node?.id}`}
            label={props?.row?.original?.node?.id as string}
          />
        ),
      },

      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.LoanAccountName,
      },
      {
        header: 'Member',
        accessorFn: (row) => row?.node?.member?.name?.local,
      },
      {
        header: 'Approved Loan',
        accessorFn: (row) => row?.node?.appliedLoanAmount,
      },
      {
        header: 'Open Date',
        accessorFn: (row) => row?.node?.approvedDate?.local || '-',
      },
      //   {
      //     id: '_actions',
      //     header: '',
      //     cell: (props) => (
      //       <ActionPopoverComponent items={popoverTitle} id={props?.row?.original?.node?.id} />
      //     ),
      //     meta: {
      //       width: '50px',
      //     },
      //   },
    ],
    [router]
  );

  return (
    <>
      <Box
        bg="gray.0"
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        <SideBar />
      </Box>
      <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Box display="flex" justifyContent="space-between" w="100%">
          <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
            Account List
          </Text>
          <Button
            onClick={() => router.push(ROUTES.CBS_LOAN_APPLICATIONS_ADD)}
            leftIcon={<Icon as={IoAdd} size="md" />}
          >
            Add Account
          </Button>
        </Box>
      </Box>
      <Box bg="background.500" ml="320px" p="s16" minH="100vh">
        <Table
          isLoading={isLoading}
          data={rowData}
          columns={columns}
          pagination={{
            total: data?.settings?.general?.loanProducts?.getLoanAccountlist?.totalCount ?? 'Many',
            pageInfo: data?.settings?.general?.loanProducts?.getLoanAccountlist?.pageInfo,
          }}
        />
      </Box>
    </>
  );
};
