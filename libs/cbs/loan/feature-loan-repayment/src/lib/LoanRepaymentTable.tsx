import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetLoanRepaymentListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getRouterQuery,
  getUrl,
  useTranslation,
} from '@coop/shared/utils';

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

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Payment Date',
        accessorFn: (row) => row?.node?.paymentDate,
        cell: (props) => <span>{props?.row?.original?.node?.paymentDate?.split('T')[0]} </span>,
      },
      {
        header: 'Member Code',
        accessorFn: (row) => row?.node?.memberCode,
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
        header: 'Amount',
        accessorFn: (row) => amountConverter(row?.node?.amount ?? 0),
      },

      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: t['transDetailViewDetail'],
                  onClick: (row) => {
                    router.push(`${ROUTES.CBS_LOAN_REPAYMENT_DETAILS}?id=${row?.id}`);
                  },
                },
                {
                  title: t['LoanApplicationView'],
                  onClick: (row) => {
                    router.push(`${ROUTES.CBS_LOAN_APPLICATION_DETAILS}?id=${row?.loanAccountId}`);
                  },
                },
              ]}
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
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader heading={`Loan Repayment - ${featureCode.loanRepayment} `} />
      </Box>

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`/${getUrl(router.pathname, 3)}/details?id=${row?.node?.id}`);
        }}
        pagination={{
          total: data?.loanAccount?.repaymentList?.totalCount ?? 'Many',
          pageInfo: data?.loanAccount?.repaymentList?.pageInfo,
        }}
      />
    </>
  );
};
