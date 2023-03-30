import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useEodHistoryDetailsQuery } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { exportVisibleTableToExcel } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

export const LoanInterestBooking = () => {
  const router = useRouter();

  const eodDate = router?.query?.['id'];

  const objState = router?.query?.['objState'];

  const { data: eodDetailsData, isFetching } = useEodHistoryDetailsQuery({
    pagination: getPaginationQuery(),
    filter: {
      eodDate: eodDate as string,
      jobType: 'LOAN_INTEREST_BOOKING',
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
        header: 'Interest Accrued',
        accessorFn: (row) => amountConverter(row?.payload?.interest_accrued ?? 0),
      },
      {
        header: 'Principal Amount',
        accessorFn: (row) => amountConverter(row?.payload?.principal_amount ?? 0),
      },
      {
        header: 'Narration',
        accessorKey: 'narration',
      },
    ],
    []
  );

  return (
    <SettingsCard
      title="Loan Interest Booking"
      headerButton={
        <Button
          variant="ghost"
          onClick={() =>
            exportVisibleTableToExcel(
              `Loan Interest Booking - ${objState === 'success' ? 'Success' : 'Errors'}`
            )
          }
        >
          Export
        </Button>
      }
    >
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
