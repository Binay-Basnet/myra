import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  GetLoanListQuery,
  LoanAccountEdge,
  LoanObjState,
  ObjState,
  useGetLoanListQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const LoanAccountList = () => {
  const router = useRouter();

  const { data, isFetching } = useGetLoanListQuery({
    paginate: getPaginationQuery(),

    filter: {
      objectState: LoanObjState?.Disbursed,
    },
  });

  return (
    <>
      <PageHeader heading="Loan Accounts List" />
      <LoanTable
        data={data}
        viewLink="/loan/accounts/view"
        isLoading={isFetching}
        type={(router.query['objState'] ?? ObjState.Approved) as LoanObjState}
      />
    </>
  );
};

interface ILoanTable {
  data: GetLoanListQuery | undefined;
  isLoading: boolean;
  type: LoanObjState;
  viewLink: string;
}

const LoanTable = ({ data, isLoading, type, viewLink }: ILoanTable) => {
  const router = useRouter();

  const rowData = useMemo<LoanAccountEdge[]>(
    () => (data?.loanAccount?.list?.edges as LoanAccountEdge[]) ?? [],
    [data]
  );

  const columns = useMemo<Column<LoanAccountEdge>[]>(
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
              src={props.row.original.node?.member?.profilePicUrl as string}
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
        header: 'Applied Date',
        accessorFn: (row) => row?.node?.createdAt,
        cell: (props) => <span>{props?.row?.original?.node?.createdAt.split('T')[0]} </span>,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props.row.original.node && (
            <TablePopover
              node={props.row.original.node}
              items={
                type === LoanObjState.Cancelled
                  ? [
                      {
                        title: 'View Loan Application',
                        onClick: (row) => router.push(`${viewLink}?id=${row.id}`),
                      },
                    ]
                  : [
                      {
                        title: 'Edit',
                        onClick: (row) =>
                          router.push(`${ROUTES.CBS_LOAN_APPLICATIONS_ADD}?id=${row.id}`),
                      },
                      {
                        title: 'View Loan Application',
                        onClick: (row) => router.push(`${viewLink}?id=${row.id}`),
                      },
                      {
                        title: 'View Loan Details',
                        onClick: (row) => {
                          router.push(`${ROUTES.CBS_LOAN_APPLICATION_DETAILS}?id=${row?.id}`);
                        },
                      },
                    ]
              }
            />
          ),
        meta: {
          width: '50px',
        },
      },
    ],
    [router]
  );

  return (
    <Table
      isLoading={isLoading}
      data={rowData}
      columns={columns}
      rowOnClick={(row) => router.push(`${viewLink}?id=${row?.node?.id}`)}
      pagination={{
        total: data?.loanAccount?.list?.totalCount ?? 'Many',
        pageInfo: data?.loanAccount.list?.pageInfo,
      }}
    />
  );
};
