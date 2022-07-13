import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { PopoverComponent } from '@coop/myra/components';
import { ObjState, useGetMemberListQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, DEFAULT_PAGE_SIZE, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseSupplierPaymentProps {}

export function AccountingFeaturePurchaseSupplierPayment(
  props: AccountingFeaturePurchaseSupplierPaymentProps
) {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetMemberListQuery(
    router.query['before']
      ? {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          pagination: {
            last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            before: router.query['before'] as string,
          },
        }
      : {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          pagination: {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
          },
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'memberListTableViewMemberProfile',
    },
    {
      title: 'memberListTableEditMember',
      onClick: (memberId?: string) =>
        router.push(`/members/individual/edit/${memberId}`),
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
        cell: (props) => {
          return (
            <Box display="flex" alignItems="center" gap="s12">
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
              <Text
                fontSize="s3"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.getValue()}
              </Text>
            </Box>
          );
        },

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
        accessorFn: (row) => row?.node?.dateJoined?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent
            items={popoverTitle}
            memberId={cell?.row?.original?.node?.id}
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
      <AccountingPageHeader
        heading={t['accountingSupplierPaymentListSupplierPayment']}
        buttonLabel={t['accountingSupplierPaymentListSupplierPaymentNew']}
        buttonHandler={() =>
          router.push('/accounting/purchase/supplier-payment/add')
        }
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.members?.list?.totalCount ?? 'Many',
          endCursor: data?.members?.list.pageInfo?.endCursor ?? '',
          startCursor: data?.members?.list.pageInfo?.startCursor ?? '',
        }}
      />
    </>
  );
}

export default AccountingFeaturePurchaseSupplierPayment;
