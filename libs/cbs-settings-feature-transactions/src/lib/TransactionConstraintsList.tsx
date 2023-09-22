import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { PageHeader, Tooltip } from '@myra-ui';
import { AvatarCell, Column, Table } from '@myra-ui/table';

import { ObjState, useTransactionConstraintsListQuery } from '@coop/cbs/data-access';
import { localizedDate, localizedText, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

const TAB_ITEMS = [
  {
    title: 'Active',
    key: ObjState.Active,
  },
  {
    title: 'Inactive',
    key: ObjState.Inactive,
  },
];

export const TransactionConstraintsList = () => {
  const router = useRouter();

  const objState = router.query['objState'] ?? ObjState.Active;

  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useTransactionConstraintsListQuery({
    pagination: getPaginationQuery(),
    filter: {
      query: searchTerm,
      orConditions: [
        { andConditions: [{ column: 'objState', comparator: 'EqualTo', value: objState }] },
      ],
    },
  });

  const rowData = useMemo(() => data?.settings?.transactionConstraint?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorFn: (row) => localizedDate(row?.node?.valueDate),
      },
      {
        id: 'name',
        header: 'Member',
        cell: (props) =>
          props?.row?.original?.node?.member?.name ? (
            <AvatarCell
              name={localizedText(props?.row?.original?.node?.member?.name)}
              src={props.row.original?.node?.member?.profilePicUrl}
            />
          ) : (
            '-'
          ),
      },
      {
        header: 'Account',
        accessorFn: (row) => row?.node?.account?.accountName || '-',
        cell: (props) => (
          <RedirectButton
            label={<Tooltip title={props?.row?.original?.node?.account?.accountName as string} />}
            link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${props?.row?.original?.node?.account?.ID}`}
          />
        ),
      },
      {
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branch?.name || '-',
      },
      {
        header: 'Ledger Id',
        accessorFn: (row) => row?.node?.ledgerId || '-',
        cell: (props) => (
          <RedirectButton
            label={props?.row?.original?.node?.ledgerId}
            link={`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props?.row?.original?.node?.ledgerId}`}
          />
        ),
      },
      {
        header: 'COA Head',
        accessorFn: (row) => row?.node?.coaHead || '-',
        cell: (props) => (
          <RedirectButton
            label={props?.row?.original?.node?.coaHead}
            link={`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props?.row?.original?.node?.coaHead}`}
          />
        ),
      },
      {
        header: 'Effective Since',
        accessorFn: (row) => localizedDate(row?.node?.effectiveSince),
      },
      {
        header: 'Effective Till',
        accessorFn: (row) => localizedDate(row?.node?.effectiveTill),
      },
      {
        header: 'Transaction Type',
        accessorFn: (row) => row?.node?.txnType,
      },
      {
        header: 'User',
        accessorFn: (row) => row?.node?.user,
      },
      {
        header: 'Initiation Type',
        accessorFn: (row) => row?.node?.initiationType || '-',
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Transaction Constraints" tabItems={TAB_ITEMS} />

      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.settings?.transactionConstraint?.totalCount ?? 'Many',
          pageInfo: data?.settings?.transactionConstraint?.pageInfo,
        }}
      />
    </>
  );
};
