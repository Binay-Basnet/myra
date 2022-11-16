import { useMemo } from 'react';

import {
  DateType,
  useAccountDetails,
  useAppSelector,
  useGetInstallmentsListDataQuery,
} from '@coop/cbs/data-access';
import { Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';

export const UpcomingInstallments = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const { accountDetails } = useAccountDetails();

  const { data: installmentsListQueryData } = useGetInstallmentsListDataQuery(
    { id: accountDetails?.accountId as string, fromN: 1, toN: 6 },
    {
      enabled: !!accountDetails?.accountId,
    }
  );

  const data = useMemo(
    () =>
      installmentsListQueryData?.account?.getInstallments?.data?.map((installment) => ({
        installmentNo: installment?.number,
        date: preferenceDate === DateType.Bs ? installment?.dueDate?.np : installment?.dueDate?.en,
        installmentAmount: accountDetails?.installmentAmount,
        fine: installment?.fine ?? 0,
        rebate: installment?.rebate ?? 0,
        total: Number(accountDetails?.installmentAmount) + Number(installment?.fine ?? 0),
      })) ?? [],
    [installmentsListQueryData]
  );

  return (
    <DetailsCard title="Upcoming Payments" bg="white" hasTable>
      <Table
        isStatic
        showFooter
        data={data}
        noDataTitle="upcoming payment"
        columns={[
          {
            header: 'Installment No.',
            accessorKey: 'installmentNo',
          },
          {
            header: 'Date',
            accessorKey: 'date',
          },
          {
            header: 'Installment Amount',
            accessorKey: 'installmentAmount',
          },
          {
            header: 'Fine',
            accessorKey: 'fine',
          },
          {
            header: 'Rebate',
            accessorKey: 'rebate',
          },
          {
            header: 'Total',
            accessorKey: 'total',
          },
        ]}
      />
    </DetailsCard>
  );
};
