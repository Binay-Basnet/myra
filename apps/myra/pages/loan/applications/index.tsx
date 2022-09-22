import { ReactElement, useMemo } from 'react';
import { useRouter } from 'next/router';

import { LoanObjState, ObjState, useGetLoanListQuery } from '@coop/cbs/data-access';
import { LoanListLayout } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, MainLayout, PageHeader, TablePopover, Text } from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

export const LOAN_LIST_TAB_ITEMS = [
  {
    title: 'memberNavApproved',
    key: 'APPROVED',
  },
  {
    title: 'memberNavInactive',
    key: 'SUBMITTED',
  },
  {
    title: 'memberNavDraft',
    key: 'DRAFT',
  },
];

const LoanApplicationListPage = () => {
  const router = useRouter();

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
    filter: {
      objectState: (router.query['objState'] ?? ObjState.Approved) as LoanObjState,
    },
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
            <Avatar
              name={props.row?.original?.node?.member?.name?.local}
              src={props.row.original.node.member.profilePicUrl}
              size="sm"
            />
            <Text
              fontWeight="400"
              fontSize="s3"
              whiteSpace="nowrap"
              overflow="hidden"
              textTransform="capitalize"
              textOverflow="ellipsis"
            >
              {props.row?.original?.node?.member?.name?.local}
            </Text>
          </Box>
        ),
        meta: {
          width: '200px',
        },
      },

      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.LoanAccountName,
      },
      {
        header: 'Product Name',
        accessorFn: (row) => row?.node?.product.productName,
      },
      {
        header: 'Approved Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => <span>{props?.row?.original?.node?.createdAt.split('T')[0]} </span>,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            items={[
              {
                title: 'Edit',
                onClick: (row) => router.push(`/loan/apply?id=${row.id}`),
              },
              {
                title: 'View Loan Application',
                onClick: (row) => router.push(`/loan/view?id=${row.id}`),
              },
              {
                title:
                  router.query['objState'] === ObjState.Approved ? 'Disburse Loan' : 'Approve Loan',
                onClick: (row) => {
                  router.query['objState'] === ObjState.Approved
                    ? router.push(`/loan/approve?id=${row.id}`)
                    : router.push(`/loan/disburse?id=${row.id}`);
                },
              },
            ]}
            node={props.row.original.node}
          />
        ),
        meta: {
          width: '50px',
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Loan Application List" tabItems={LOAN_LIST_TAB_ITEMS} />
      <Table
        isLoading={isFetching}
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

LoanApplicationListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};
export default LoanApplicationListPage;
