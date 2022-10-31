import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetLoanRepaymentListQuery } from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, PageHeader, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

export const CBSLoanRepaymentList = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const { data, isLoading } = useGetLoanRepaymentListQuery(
    {
      paginate: getRouterQuery({ type: ['PAGINATION'], query: router.query }),
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.loanAccount?.repaymentList?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'depositProductEdit',
      //   onClick: (id: string) => router.push(`/accounts/account-open/edit/${id}`),
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Member Id',
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: 'Member Name',
        accessorFn: (row) => row?.node?.memberName?.local,
        cell: (props) => (
          <Box
            display="flex"
            flexDirection="row"
            gap="s8"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar
              name={props.row?.original?.node?.memberName.local}
              size="sm"
              src={props.row?.original?.node?.memberProfilePicUrl ?? undefined}
            />
            <Text fontWeight="400" fontSize="r1">
              {props.row?.original?.node?.memberName?.local}
            </Text>
          </Box>
        ),
      },

      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.loanAccountName,
      },
      {
        header: 'Product Name',
        accessorFn: (row) => row?.node?.loanProductName,
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
      },
      {
        header: 'Payment Date',
        accessorFn: (row) => row?.node?.paymentDate,
        cell: (props) => <span>{props?.row?.original?.node?.paymentDate?.split('T')[0]} </span>,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <ActionPopoverComponent
            items={popoverTitle}
            id={props?.row?.original?.node?.id as string}
          />
        ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <Box position="sticky" top="110px" zIndex={3}>
        <PageHeader heading="Loan Repayment List" />
      </Box>

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.loanAccount?.repaymentList?.totalCount ?? 'Many',
          pageInfo: data?.loanAccount?.repaymentList?.pageInfo,
        }}
      />
    </>
  );
};
