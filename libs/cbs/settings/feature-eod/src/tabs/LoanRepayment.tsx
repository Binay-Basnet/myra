import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useEodHistoryDetailsQuery } from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

export const LoanRepayment = () => {
  const router = useRouter();

  const eodDate = router?.query?.['id'];

  const objState = router?.query?.['objState'];

  const { data: eodDetailsData, isFetching } = useEodHistoryDetailsQuery({
    pagination: getPaginationQuery(),
    filter: {
      eodDate: eodDate as string,
      jobType: 'LOAN_REPAYMENT',
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
        header: 'Principal Due',
        accessorFn: (row) => amountConverter(row?.payload?.principal_due ?? 0),
      },
      {
        header: 'Interest Due',
        accessorFn: (row) => amountConverter(row?.payload?.interest_due ?? 0),
      },
      {
        header: 'Penalty Due',
        accessorFn: (row) => amountConverter(row?.payload?.penalty_due ?? 0),
      },
      {
        header: 'Total Payable Amount',
        accessorFn: (row) => amountConverter(row?.payload?.total_payable_amount ?? 0),
      },
      {
        header: 'Available Balance',
        accessorFn: (row) => amountConverter(row?.payload?.available_balance ?? 0),
      },
      {
        header: 'Narration',
        accessorKey: 'narration',
      },
    ],
    []
  );

  return (
    <SettingsCard title="Loan Repayment">
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
