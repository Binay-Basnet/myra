import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@myra-ui/table';
import { Avatar, Box, Text } from '@myra-ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureJournalVouchersListProps {}

export const AccountingFeatureJournalVouchersList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetMemberListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    },
  });

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['accountingJournalVouchersListItemId'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['accountingJournalVouchersListName'],
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
        header: t['accountingJournalVouchersListType'],
        accessorFn: (row) => row?.node?.code,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['accountingJournalVouchersListUnitPrice'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['accountingJournalVouchersListTotalCost'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['accountingJournalVouchersListItemQuantity'],
        accessorFn: (row) => row?.node?.dateJoined?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent
            items={[
              {
                title: 'memberListTableViewMemberProfile',
              },
              {
                title: 'memberListTableEditMember',
                onClick: (member) => router.push(`/members/individual/edit/${member?.id}`),
              },
              {
                title: 'memberListTableMakeInactive',
              },
            ]}
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
        heading={t['accountingJournalVouchersListJournalVouchers']}
        buttonLabel={t['accountingJournalVouchersListNewJournalVoucher']}
        buttonHandler={() => router.push('/accounting/accounting/journal-vouchers/add')}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.members?.list?.totalCount ?? 'Many',
          pageInfo: data?.members?.list?.pageInfo,
        }}
      />
    </>
  );
};

export default AccountingFeatureJournalVouchersList;
