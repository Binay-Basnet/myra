import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table } from '@myra-ui/table';

import { useEodHistoryDetailsQuery } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

export const MaturityCheck = () => {
  const router = useRouter();

  const eodDate = router?.query?.['id'];

  const objState = router?.query?.['objState'];

  const { data: eodDetailsData, isFetching } = useEodHistoryDetailsQuery({
    pagination: getPaginationQuery(),
    filter: {
      eodDate: eodDate as string,
      jobType: 'SAVING_ACCOUNT_MATURITY',
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
        header: 'Account Balance',
        accessorFn: (row) => amountConverter((row?.payload?.account_balance ?? 0) as number),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Transferred Account',
        accessorFn: (row) => row?.payload?.transferred_account ?? 0,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Narration',
        accessorKey: 'narration',
      },
    ],
    []
  );

  return (
    <SettingsCard title="Maturity Check">
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
    </SettingsCard>
  );
};
