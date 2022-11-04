import { useMemo } from 'react';

import { DateType, useAppSelector, useGetAvailableSlipsListQuery } from '@coop/cbs/data-access';
import { Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';
import { useAccountDetails } from '@coop/shared/utils';

export const AvailableWithdrawSlipList = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const { accountDetails } = useAccountDetails();

  const { data: availableSlipsListQueryData } = useGetAvailableSlipsListQuery(
    { accountId: accountDetails?.accountId as string },
    { enabled: !!accountDetails?.accountId }
  );

  const availableSlipLists = useMemo(
    () =>
      availableSlipsListQueryData?.withdrawSlip?.listAvailableSlips?.data?.map((withdrawSlip) => ({
        slipNumber: withdrawSlip?.slipNumber,
        date: preferenceDate === DateType.Bs ? withdrawSlip?.date?.np : withdrawSlip?.date?.en,
      })) ?? [],
    [availableSlipsListQueryData, preferenceDate]
  );

  return (
    <DetailsCard title="Available Withdraw Slip List" bg="white" hasTable>
      <Table
        // variant="report"
        // size="small"
        isStatic
        showFooter
        data={availableSlipLists}
        noDataTitle="available withdraw slip"
        columns={[
          {
            header: 'Withdraw Slip Number',
            accessorKey: 'slipNumber',
          },
          {
            header: 'Created Date',
            accessorKey: 'date',
          },
        ]}
      />
    </DetailsCard>
  );
};
