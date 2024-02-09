import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

import { TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  TransferType,
  useAppSelector,
  useGetAccountTransferFilterMappingQuery,
  useGetAccountTransferListDataQuery,
  useGetMemberFilterMappingQuery,
} from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

const transferType = {
  [TransferType.Self]: 'Self Transfer',
  [TransferType.Member]: 'Member to Member',
};

/* eslint-disable-next-line */
export interface AccountTransferListProps {}

export const AccountTransferList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [triggerQuery, setTriggerQuery] = useState(false);

  const { data: accountTransferFilterMapping } = useGetAccountTransferFilterMappingQuery();
  const { data: memberFilterMapping } = useGetMemberFilterMappingQuery();

  const { data, isFetching } = useGetAccountTransferListDataQuery(
    {
      pagination: getPaginationQuery(),
      filter: getFilterQuery(),
    },
    { enabled: triggerQuery }
  );

  const rowData = useMemo(() => data?.transaction?.listTransfer?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: t['accountTransferListDate'],
        accessorKey: 'node.date.local',
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.date)}</Text>,
        enableColumnFilter: true,
        filterFn: 'dateTime',
        enableSorting: true,
        meta: {
          width: '200px',
          orderId: 'id',
        },
      },
      {
        header: t['accountTransferListTransactionId'],
        accessorFn: (row) => row?.node?.transactionCode,
        meta: {
          width: '300px',
        },
      },
      {
        id: 'transferType',
        enableColumnFilter: true,
        header: t['accountTransferListTransactionType'],
        accessorFn: (row) => (row?.node?.transferType ? transferType[row?.node?.transferType] : ''),
        meta: {
          filterMaps: {
            comparator: 'CONTAINS',
            list: accountTransferFilterMapping?.transaction?.filterMapping?.transfer?.type,
          },
        },
      },
      {
        id: 'branchId',
        header: 'Service Center',
        accessorKey: 'node.branchName',
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: memberFilterMapping?.members?.filterMapping?.serviceCenter || [],
          },
        },
      },
      {
        id: 'amount',
        header: t['accountTransferListAmount'],
        meta: {
          isNumeric: true,
        },
        enableColumnFilter: true,
        filterFn: 'amount',
        accessorFn: (row) => (row?.node?.amount ? amountConverter(row?.node?.amount) : '-'),
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
                  aclKey: 'CBS_TRANSACTIONS_ACCOUNT_TRANSFER',
                  action: 'VIEW',
                  onClick: (row) => {
                    router.push(
                      `${ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_DETAILS}?id=${row?.transactionCode}`
                    );
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    [
      t,
      accountTransferFilterMapping?.transaction?.filterMapping?.transfer?.type,
      memberFilterMapping?.members?.filterMapping?.serviceCenter,
      router,
    ]
  );

  const user = useAppSelector((state) => state.auth?.user);

  useEffect(() => {
    const queryString = qs.stringify(
      {
        branchId: {
          value: user?.currentBranch?.id,
          compare: '=',
        },
      },
      { allowDots: true, arrayFormat: 'brackets', encode: false }
    );

    router
      .push(
        {
          query: {
            ...router.query,
            filter: queryString,
          },
        },
        undefined,
        { shallow: true }
      )
      .then(() => setTriggerQuery(true));
  }, []);

  return (
    <>
      <TransactionPageHeader
        heading={`${t['accountTransferListAccountTransferList']} - ${featureCode?.accountTransferList}`}
        // tabItems={tabList}
        buttonLabel={t['accountTransferListNewAccountTransfer']}
        buttonHandler={() => router.push(ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_ADD)}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={triggerQuery ? isFetching : true}
        columns={columns}
        rowOnClick={(row) =>
          router.push(
            `${ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_DETAILS}?id=${row?.node?.transactionCode}`
          )
        }
        pagination={{
          total: data?.transaction?.listTransfer?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listTransfer?.pageInfo,
        }}
        searchPlaceholder={t['accountTransferListSearch']}
        menu="TRANSACTIONS"
      />
    </>
  );
};

export default AccountTransferList;
