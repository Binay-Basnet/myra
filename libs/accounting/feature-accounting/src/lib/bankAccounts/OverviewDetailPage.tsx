import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { DetailPageTopCard } from '@coop/accounting/ui-components';
import { useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const OverviewDetailPage = () => {
  const { t } = useTranslation();

  const router = useRouter();

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
        header: t['bankAccountsDate'],
        accessorFn: (row) => row?.node?.id,
        // meta: {
        //   width: '20%',
        // },
      },
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: t['bankAccountsTransactionNo'],

        meta: {
          width: '30%',
          color: 'primary.500',
        },
      },
      {
        header: t['bankAccountsType'],
        accessorFn: (row) => row?.node?.code,
        meta: {
          width: '30%',
        },
      },
      {
        header: t['bankAccountsAmount'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '20%',
        },
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => (
          <PopoverComponent items={popoverTitle} member={cell?.row?.original?.node} />
        ),
        meta: {
          width: 's60',
        },
      },
    ],
    [t]
  );

  return (
    <Box display="flex" flexDirection="column" p="s16" gap="s16">
      <DetailPageTopCard>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" color="neutralColorLight.Gray-70" fontWeight="Medium">
            {t['bankAccountsBookBalance']}
          </Text>

          <Text fontSize="l1" color="neutralColorLight.Gray-70" fontWeight="Medium">
            159,000 CR
          </Text>

          <Text variant="link" onClick={() => router.push('/')}>
            {t['bankAccountsViewLedger']}
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" color="neutralColorLight.Gray-70" fontWeight="Medium">
            {t['bankAccountsBankBalance']}
          </Text>
          <Text fontSize="l1" color="neutralColorLight.Gray-70" fontWeight="Medium">
            34,000
          </Text>

          <Text variant="link" onClick={() => router.push('/')}>
            {t['bankAccountsViewBankStatement']}
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" color="neutralColorLight.Gray-70" fontWeight="Medium">
            {t['bankAccountsDifferenceBalance']}
          </Text>
          <Text fontSize="l1" color="neutralColorLight.Gray-70" fontWeight="Medium">
            125,000
          </Text>

          <Text variant="link" onClick={() => router.push('/')}>
            {t['bankAccountsGoReconciliation']}
          </Text>
        </Box>
      </DetailPageTopCard>

      <Box>
        <Box
          bg="gray.0"
          px="s16"
          paddingTop="s16"
          paddingBottom="s24"
          display="flex"
          justifyContent="space-between"
        >
          <Text fontSize="r1" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            {t['bankAccountsRecentTransactions']}
          </Text>

          <Text variant="link" onClick={() => router.push('/')}>
            {t['bankAccountsViewAllTransactions']}
          </Text>
        </Box>

        <Table
          data={rowData}
          isStatic
          getRowId={(row) => String(row?.node?.id)}
          isLoading={isFetching}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default OverviewDetailPage;
