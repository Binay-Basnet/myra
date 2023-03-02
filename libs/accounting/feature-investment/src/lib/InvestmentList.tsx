import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import {
  DateType,
  InvestmentType,
  RootState,
  useAppSelector,
  useGetInvestmentEntriesListDataQuery,
} from '@coop/cbs/data-access';
import { Column, Table } from '@myra-ui/table';
import { TablePopover } from '@myra-ui';
import { getPaginationQuery } from '@coop/shared/utils';

const investmentAccountType = {
  [InvestmentType.Share]: 'Share',
  [InvestmentType.Saving]: 'Savings & Deposit',
  [InvestmentType.FixedDeposit]: 'Fixed Deposit',
};

export const InvestmentList = () => {
  const preferenceDate = useAppSelector((state: RootState) => state?.auth?.preference?.date);

  const router = useRouter();

  const { data, isFetching } = useGetInvestmentEntriesListDataQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.accounting?.investment?.listEntry?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'id',
        header: 'Entry ID',
        accessorFn: (row) => row?.node?.id,
        // enableSorting: true,
      },
      {
        id: 'name',
        accessorFn: (row) => row?.node?.name,
        header: 'Name of Organization',
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
        meta: {
          width: '220px',
        },
      },
      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
        meta: {
          width: '120px',
        },
      },
      {
        header: 'Last Updated Date',
        accessorFn: (row) => {
          const date = preferenceDate === DateType.Bs ? row?.node?.date?.np : row?.node?.date?.en;
          return date?.split(' ')[0] ?? 'N/A';
        },
        meta: {
          width: '100px',
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
                  title: 'Edit',
                  onClick: (row) => {
                    router.push(`/accounting/investment/edit/${row['id']}`);
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
    [preferenceDate]
  );

  return (
    <>
      <AccountingPageHeader heading="Investments" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        // rowOnClick={(row) => {
        //   router.push(`/members/details?id=${row?.node?.id}`);
        // }}
        isLoading={isFetching}
        columns={columns}
        noDataTitle="entries list"
        pagination={{
          total: data?.accounting?.investment?.listEntry?.totalCount ?? 'Many',
          pageInfo: data?.accounting?.investment?.listEntry?.pageInfo,
        }}
      />
    </>
  );
};

export default InvestmentList;
