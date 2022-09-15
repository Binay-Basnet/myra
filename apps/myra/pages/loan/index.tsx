import { ReactElement, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetLoanListQuery } from '@coop/cbs/data-access';
import { LoanListLayout } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, MainLayout, PageHeader, Text } from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

const LoanPage = () => {
  const router = useRouter();

  const { data, isLoading } = useGetLoanListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
  });

  const rowData = useMemo(() => data?.loanAccount?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Loan Application Id',
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: 'Member Name',
        accessorFn: (row) => row?.node?.member?.name?.local,
        cell: (props) => (
          <Box
            display="flex"
            flexDirection="row"
            gap="s8"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar name={props.row?.original?.node?.member?.name?.local} size="sm" />
            <Text fontWeight="400" fontSize="r1">
              {props.row?.original?.node?.member?.name?.local}
            </Text>
          </Box>
        ),
      },

      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.LoanAccountName,
      },
      {
        header: 'Product Name',
        accessorFn: (row) => row?.node?.productType,
      },
      {
        header: 'Approved Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => <span>{props?.row?.original?.node?.createdAt.split('T')[0]} </span>,
      },
      // {
      //   id: '_actions',
      //   header: '',
      //   cell: (props) => (
      //     <ActionPopoverComponent
      //       items={popoverTitle}
      //       id={props?.row?.original?.node?.id as string}
      //     />
      //   ),
      //   meta: {
      //     width: '50px',
      //   },
      // },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Loan Application List" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.loanAccount?.list?.totalCount ?? 'Many',
          pageInfo: data?.loanAccount.list?.pageInfo,
        }}
      />
    </>
  );
};

LoanPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
export default LoanPage;
