import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, PageHeader, Text } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { TellerTransferType, useGetTellerTransactionListDataQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { featureCode, getRouterQuery, getUrl, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface VaultTransferListProps {}

export const VaultTransferList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetTellerTransactionListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        type: [TellerTransferType.VaultToCash, TellerTransferType.CashToVault],
      },
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.listTellerTransaction?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Vault Transfer Code',
        accessorFn: (row) => row?.node?.transferCode,
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
                  ? props?.row?.original?.node?.destProfilePicUrl
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

        meta: {
          width: 'auto',
        },
      },
      {
        header: 'Cash Amount',

        accessorFn: (row) => row?.node?.amount,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Transfer Date',
        accessorFn: (row) => row?.node?.date?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original?.node}
            items={[
              {
                title: 'loanProductViewDetails',
                onClick: () => {
                  router.push(
                    `/${getUrl(router.pathname, 3)}/view?id=${props?.row?.original?.node?.ID}`
                  );
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
        pagination={{
          total: data?.transaction?.listTellerTransaction?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listTellerTransaction?.pageInfo,
        }}
        noDataTitle="vault transfer list"
      />
    </>
  );
};

export default VaultTransferList;
