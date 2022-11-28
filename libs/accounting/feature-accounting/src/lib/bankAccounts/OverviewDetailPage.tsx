import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { DetailPageTopCard } from '@coop/accounting/ui-components';
import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Box, Text, TextFields } from '@myra-ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

export const OverviewDetailPage = () => {
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
          width: '60px',
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

          <TextFields variant="link" onClick={() => router.push('/')}>
            {t['bankAccountsViewLedger']}
          </TextFields>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" color="neutralColorLight.Gray-70" fontWeight="Medium">
            {t['bankAccountsBankBalance']}
          </Text>
          <Text fontSize="l1" color="neutralColorLight.Gray-70" fontWeight="Medium">
            34,000
          </Text>

          <TextFields variant="link" onClick={() => router.push('/')}>
            {t['bankAccountsViewBankStatement']}
          </TextFields>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" color="neutralColorLight.Gray-70" fontWeight="Medium">
            {t['bankAccountsDifferenceBalance']}
          </Text>
          <Text fontSize="l1" color="neutralColorLight.Gray-70" fontWeight="Medium">
            125,000
          </Text>

          <TextFields variant="link" onClick={() => router.push('/')}>
            {t['bankAccountsGoReconciliation']}
          </TextFields>
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

          <TextFields variant="link" onClick={() => router.push('/')}>
            {t['bankAccountsViewAllTransactions']}
          </TextFields>
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
