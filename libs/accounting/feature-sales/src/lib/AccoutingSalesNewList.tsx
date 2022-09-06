import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingSalesListProps {}

export function AccountingSalesList() {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetMemberListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    },
  });

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

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
        header: t['accountingSalesListInvoiceNo'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['accountingSalesListCustomer'],
        cell: (props) => {
          return (
            <Box
              display="flex"
              alignItems="center"
              cursor={'pointer'}
              gap="s12"
              onClick={() => {
                router.push('/accounting/sales/object');
              }}
            >
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
                {props.getValue() as string}
              </Text>
            </Box>
          );
        },

        meta: {
          width: '60%',
        },
      },
      {
        header: t['accountingSalesListTotalAmount'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['accountingSalesListInvoiceDate'],
        accessorFn: (row) => row?.node?.dateJoined?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent
            items={popoverTitle}
            member={cell?.row?.original?.node}
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
        heading={t['accountingSalesListSales']}
        buttonLabel={t['accountingSalesListSaleEntry']}
        buttonHandler={() => router.push('/accounting/sales/add')}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.members?.list?.totalCount ?? 'Many',
          pageInfo: data?.members.list.pageInfo,
        }}
      />
    </>
  );
}

export default AccountingSalesList;
