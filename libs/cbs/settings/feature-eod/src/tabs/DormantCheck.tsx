import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useEodHistoryDetailsQuery } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { getPaginationQuery } from '@coop/shared/utils';

export const DormantCheck = () => {
  const router = useRouter();

  const eodDate = router?.query?.['id'];

  const objState = router?.query?.['objState'];

  const { data: eodDetailsData, isFetching } = useEodHistoryDetailsQuery({
    pagination: getPaginationQuery(),
    filter: {
      eodDate: eodDate as string,
      jobType: 'ACCOUNT_DORMANCY',
      success: objState === 'success',
    },
  });

  const detailList = useMemo(
    () => eodDetailsData?.endOfDay?.details?.edges?.map((detail) => detail?.node) ?? [],
    [eodDetailsData]
  );

  const columns = useMemo<Column<typeof detailList[0]>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'Account Number',
        accessorKey: 'accountNumber',
      },
      {
        header: 'Dormancy Reason',
        accessorFn: (row) => row?.payload?.dormancy_reason,
      },
      {
        header: 'Narration',
        accessorKey: 'narration',
      },
    ],
    []
  );

  return (
    <SettingsCard title="Dormant Check">
      <Box height="30rem">
        <Table
          isLoading={isFetching}
          isStatic
          data={detailList}
          columns={columns}
          pagination={{
            total: eodDetailsData?.endOfDay?.details?.totalCount ?? 'Many',
            pageInfo: eodDetailsData?.endOfDay?.details?.pageInfo,
          }}
        />
      </Box>
    </SettingsCard>
  );
};
