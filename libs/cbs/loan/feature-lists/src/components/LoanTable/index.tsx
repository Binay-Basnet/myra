import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { GetLoanListQuery, LoanAccountEdge, LoanObjState } from '@coop/cbs/data-access';

interface ILoanTable {
  data: GetLoanListQuery | undefined;
  isLoading: boolean;
  type: LoanObjState;
  viewLink: string;
  isDisbured?: boolean;
}

export const LoanTable = ({ data, isLoading, type, viewLink, isDisbured }: ILoanTable) => {
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
        id: 'loan Account Creation Date id',
        header: () => (isDisbured ? 'Account Opened Date' : 'Loan Applied Date'),
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
                type === LoanObjState.Cancelled || type === LoanObjState.Disbursed
                  ? [
                      {
                        title: 'View Loan Application',
                        onClick: (row) => router.push(`${viewLink}?id=${row.id}`),
                      },
                    ]
                  : [
                      {
                        title: 'Edit',
                        onClick: (row) => router.push(`/loan/apply?id=${row.id}`),
                      },
                      {
                        title: 'View Loan Application',
                        onClick: (row) => router.push(`${viewLink}?id=${row.id}`),
                      },
                      {
                        title: type === LoanObjState.Approved ? 'Disburse Loan' : 'Approve Loan',
                        onClick: (row) => {
                          type === LoanObjState.Approved
                            ? router.push(`/loan/applications/disburse?id=${row?.id}`)
                            : router.push(`/loan/applications/approve?id=${row?.id}`);
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
