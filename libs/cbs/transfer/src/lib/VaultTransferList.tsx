import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  TellerTransferType,
  useGetMemberFilterMappingQuery,
  useGetTellerTransactionListDataQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  getUrl,
} from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface VaultTransferListProps {}

export const VaultTransferList = () => {
  const router = useRouter();
  const { data: filterMapping } = useGetMemberFilterMappingQuery();

  const { data, isFetching } = useGetTellerTransactionListDataQuery(
    {
      pagination: getPaginationQuery(),
      filter: getFilterQuery({
        type: {
          compare: '=',
          value: [TellerTransferType.VaultToCash, TellerTransferType.CashToVault],
        },
      }),
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.listTellerTransaction?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: 'Transfer Date',
        accessorFn: (row) => localizedDate(row?.node?.date),
        cell: (props) => localizedDate(props?.row?.original?.node?.date),
        filterFn: 'dateTime',
        enableColumnFilter: true,
      },
      {
        header: 'Transfer Code',
        accessorFn: (row) => row?.node?.transferCode,
        meta: {
          width: '15%',
        },
      },
      {
        accessorFn: (row) =>
          row?.node?.transferType === TellerTransferType.VaultToCash
            ? row?.node?.destTeller?.local
            : row?.node?.srcTeller?.local,
        header: 'Teller Name',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={
                props?.row?.original?.node?.transferType === TellerTransferType.VaultToCash
                  ? props?.row?.original?.node?.destProfilePicUrl ?? ''
                  : props?.row?.original?.node?.srcProfilePicUrl ?? ' '
              }
            />
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),
      },
      {
        id: 'branchId',
        header: 'Transaction Service Center',
        accessorFn: (row) => row?.node?.transactionBranchName,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: filterMapping?.members?.filterMapping?.serviceCenter,
          },
        },
      },
      {
        id: 'amount',
        header: 'Cash Amount',

        accessorFn: (row) => amountConverter(row?.node?.amount as string),
        filterFn: 'amount',
        enableColumnFilter: true,
        meta: {
          isNumeric: true,
          width: '15%',
        },
      },

      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original?.node}
            items={[
              {
                title: 'viewDetails',
                aclKey: 'CBS_TRANSFERS_VAULT_TRANSFER',
                action: 'VIEW',
                onClick: () => {
                  router.push(
                    `/${getUrl(router.pathname, 3)}/view?id=${props?.row?.original?.node?.ID}`
                  );
                },
              },
            ]}
          />
        ),
      },
    ],
    [filterMapping?.members?.filterMapping?.serviceCenter, router]
  );

  return (
    <>
      <PageHeader
        heading={`Vault Transfer - ${featureCode.vaultTransferList}`}
        // tabItems={tabList}
        button
        buttonTitle="Vault Transfer"
        onClick={() => router.push(ROUTES.CBS_TRANSFER_VAULT_ADD)}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) => router.push(`/${getUrl(router.pathname, 3)}/view?id=${row?.node?.ID}`)}
        pagination={{
          total: data?.transaction?.listTellerTransaction?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listTellerTransaction?.pageInfo,
        }}
        noDataTitle="vault transfer list"
        menu="TRANSFERS"
      />
    </>
  );
};

export default VaultTransferList;
