import { useMemo } from 'react';

import { Avatar, Box, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseSupplierPaymentProps {}

export const AccountingFeaturePurchaseSupplierPayment = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetMemberListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.members?.list?.data?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'memberListTableViewMemberProfile',
    },
    {
      title: 'memberListTableEditMember',
    },
    {
      title: 'memberListTableMakeInactive',
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['accountingSupplierPaymentListBillNo'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['accountingSupplierPaymentListSupplierName'],
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar name="Dan Abrahmov" size="sm" src="https://bit.ly/dan-abramov" />
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
          width: '60%',
        },
      },
      {
        header: t['accountingSupplierPaymentListAmount'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['accountingSupplierPaymentListDate'],
        accessorFn: (row) => row?.node?.dateJoined?.en,
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent items={popoverTitle} member={cell?.row?.original?.node} />
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
      <AccountingPageHeader heading={t['accountingSupplierPaymentListSupplierPayment']} />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.members?.list?.data?.totalCount ?? 'Many',
          pageInfo: data?.members.list.data?.pageInfo,
        }}
      />
    </>
  );
};

export default AccountingFeaturePurchaseSupplierPayment;
