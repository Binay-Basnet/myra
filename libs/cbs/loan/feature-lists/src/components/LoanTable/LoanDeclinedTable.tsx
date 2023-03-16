import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  GetLoanListQuery,
  LoanAccountEdge,
  LoanObjState,
  useGetLoanFilterMappingQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';

interface ILoanDeclinedTable {
  data: GetLoanListQuery | undefined;
  isLoading: boolean;
  type: LoanObjState;
  viewLink: string;
}

export const LoanDeclinedTable = ({ data, isLoading, type, viewLink }: ILoanDeclinedTable) => {
  const router = useRouter();

  const { data: loanFilterMapping } = useGetLoanFilterMappingQuery();

  const rowData = useMemo<LoanAccountEdge[]>(
    () => (data?.loanAccount?.list?.edges as LoanAccountEdge[]) ?? [],
    [data]
  );

  const columns = useMemo<Column<LoanAccountEdge>[]>(
    () => [
      {
        id: 'appliedDate',
        header: () => 'Loan Applied Date',
        accessorFn: (row) => row?.node?.appliedDate,
        cell: (props) => localizedDate(props?.row?.original?.node?.appliedDate),
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
      {
        header: 'Loan ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.LoanAccountName,
      },
      {
        id: 'productName',
        header: 'Product Name',
        accessorFn: (row) => row?.node?.product.productName,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: loanFilterMapping?.loanAccount?.filterMapping?.productName,
          },
        },
      },
      {
        header: 'Member',
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
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props.row.original.node && (
            <TablePopover
              node={props.row.original.node}
              items={
                type === LoanObjState.Cancelled ||
                type === LoanObjState.Disbursed ||
                type === LoanObjState.Completed
                  ? [
                      {
                        title:
                          type === LoanObjState.Disbursed || type === LoanObjState.Completed
                            ? 'View Loan Details'
                            : 'View Loan Application',
                        onClick: (row) => router.push(`${viewLink}?id=${row.id}`),
                      },
                    ]
                  : [
                      {
                        title: 'Edit',
                        onClick: (row) =>
                          router.push(`${ROUTES.CBS_LOAN_APPLICATIONS_EDIT}?id=${row.id}`),
                      },
                      {
                        title: 'View Loan Application',
                        onClick: (row) => router.push(`${viewLink}?id=${row.id}`),
                      },
                      {
                        title: type === LoanObjState.Approved ? 'Disburse Loan' : 'Approve Loan',
                        onClick: (row) => {
                          type === LoanObjState.Approved
                            ? router.push(`${ROUTES.CBS_LOAN_DISBURSE}?id=${row?.id}`)
                            : router.push(`${ROUTES.CBS_LOAN_APPROVE}?id=${row?.id}`);
                        },
                      },
                    ]
              }
            />
          ),
        meta: {
          width: '3.125rem',
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
        pageInfo: data?.loanAccount?.list?.pageInfo,
      }}
    />
  );
};
