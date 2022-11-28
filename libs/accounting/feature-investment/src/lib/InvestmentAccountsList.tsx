import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { InvestmentType, useGetInvestmentAccountsListDataQuery } from '@coop/cbs/data-access';
import { formatTableAddress } from '@coop/cbs/utils';
import { Column, Table } from '@coop/shared/table';
import { TablePopover } from '@myra-ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

const investmentAccountType = {
  [InvestmentType.Share]: 'Share',
  [InvestmentType.Saving]: 'Savings & Deposit',
  [InvestmentType.FixedDeposit]: 'Fixed Deposit',
};

export const InvestmentAccountsList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetInvestmentAccountsListDataQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.accounting?.investment?.listAccount?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'name',
        accessorFn: (row) => row?.node?.name,
        header: 'Name',
        // enableSorting: true,
        // cell: (props) => (
        //   <Box display="flex" alignItems="center" gap="s12">
        //     <Text
        //       fontSize="s3"
        //       textTransform="capitalize"
        //       textOverflow="ellipsis"
        //       overflow="hidden"
        //     >
        //       {props.getValue() as string}
        //     </Text>
        //   </Box>
        // ),

        meta: {
          width: '400px',
        },
      },
      {
        header: 'Type',
        accessorFn: (row) => (row?.node?.type ? investmentAccountType[row?.node?.type] : ''),
      },
      {
        header: 'Address',
        accessorFn: (row) => formatTableAddress(row?.node?.address),
        meta: {
          width: '220px',
        },
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: 'Edit Account',
                  onClick: (row) => {
                    router.push(`/accounting/investment/investment-account/edit/${row['id']}`);
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <AccountingPageHeader heading="Investment Accounts" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        // rowOnClick={(row) => {
        //   router.push(`/members/details?id=${row?.node?.id}`);
        // }}
        isLoading={isFetching}
        columns={columns}
        noDataTitle="account list"
        pagination={{
          total: data?.accounting?.investment?.listAccount?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.investment?.listAccount?.pageInfo,
        }}
      />
    </>
  );
};

export default InvestmentAccountsList;
