import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { GetLoanListQuery, LoanAccountEdge, LoanObjState } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface ILoanAccTable {
  data: GetLoanListQuery | undefined;
  isLoading: boolean;
  type: LoanObjState;
  viewLink: string;
}

export const LoanAccTable = ({ data, isLoading, type, viewLink }: ILoanAccTable) => {
  const router = useRouter();

  const rowData = useMemo<LoanAccountEdge[]>(
    () => (data?.loanAccount?.list?.edges as LoanAccountEdge[]) ?? [],
    [data]
  );

  const columns = useMemo<Column<LoanAccountEdge>[]>(
    () => [
      {
        header: 'Loan ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        id: 'loan Account Creation Date id',
        header: () => 'Loan Applied Date',
        accessorFn: (row) => row?.node?.appliedDate,
        cell: (props) => localizedDate(props?.row?.original?.node?.appliedDate),
      },
      {
        header: 'Product Name',
        accessorFn: (row) => row?.node?.product.productName,
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
        meta: {
          width: '200px',
        },
      },
      {
        header: 'Loan Amount',
        accessorFn: (row) => amountConverter(row?.node?.totalSanctionedAmount as string),
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
        pageInfo: data?.loanAccount?.list?.pageInfo,
      }}
    />
  );
};
