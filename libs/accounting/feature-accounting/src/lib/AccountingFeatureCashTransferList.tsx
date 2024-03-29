import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { useGetMemberListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { PopoverComponent } from '@coop/myra/components';
import { getFilterQuery, getPaginationQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeatureCashTransferListProps {}

export const AccountingFeatureCashTransferList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isFetching } = useGetMemberListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.members?.list?.data?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Item Id',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: 'Name',
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
        header: 'Type',
        accessorFn: (row) => row?.node?.code,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Unit Price',
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Total Cost',
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Item Quantity',
        accessorFn: (row) => localizedDate(row?.node?.dateJoined),
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
          width: 's60',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <AccountingPageHeader
        heading="Cash Transfer"
        buttonLabel="New Cash Transfer"
        buttonHandler={() => router.push('/accounting/accounting/cash-transfer/add')}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.members?.list?.data?.totalCount ?? 'Many',
          pageInfo: data?.members?.list?.data?.pageInfo,
        }}
      />
    </>
  );
};

export default AccountingFeatureCashTransferList;
