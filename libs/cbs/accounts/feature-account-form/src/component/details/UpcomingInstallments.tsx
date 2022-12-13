import { useMemo } from 'react';

import { DetailsCard, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  DateType,
  useAccountDetails,
  useAppSelector,
  useGetInstallmentsListDataQuery,
} from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

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

  const columns = useMemo<Column<typeof data[0]>[]>(
    () => [
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
        cell: (props) =>
          props.getValue() ? (
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              {amountConverter(props.getValue() as string)}
            </Text>
          ) : (
            'N/A'
          ),
      },
    ],
    []
  );

  return (
    <DetailsCard title="Upcoming Payments" bg="white" hasTable>
      <Table isStatic showFooter data={data} columns={columns} noDataTitle="upcoming payment" />
    </DetailsCard>
  );
};
