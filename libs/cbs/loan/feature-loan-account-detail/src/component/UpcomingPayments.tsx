import { useMemo } from 'react';

import { DetailsCard, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

type CustomPaymentItem = {
  index?: string | number;
  installmentNo: number | undefined;
  installmentDate: Record<'local' | 'en' | 'np', string> | null | undefined;
  payment: string | undefined;
  principal: string | undefined;
  interest: string | undefined;
  remainingPrincipal: string | undefined;
  paid: boolean | undefined;
};

interface IPaymentProps {
  paymentList: CustomPaymentItem[];
}

export const UpcomingPayments = ({ paymentList }: IPaymentProps) => {
  const paymentListWithIndex =
    paymentList?.map((payment, index) => ({
      index: index + 1,
      ...payment,
    })) ?? [];

  const columns = useMemo<Column<CustomPaymentItem>[]>(
    () => [
      {
        header: 'Sn',
        accessorKey: 'index',
      },
      {
        header: 'Date',
        accessorKey: 'installmentDate',
        accessorFn: (row) => localizedDate(row?.installmentDate),
      },
      {
        header: 'Installment No.',
        accessorKey: 'installmentNo',
      },
      {
        header: 'Installment Amount',
        accessorKey: 'payment',
      },
      {
        header: 'Principal',
        accessorKey: 'principal',
      },
      {
        header: 'Interest',
        accessorKey: 'interest',
      },
      {
        header: 'Remaining Principal',
        accessorKey: 'remainingPrincipal',
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
      <Table
        isDetailPageTable
        isStatic
        showFooter
        data={paymentListWithIndex}
        columns={columns}
        noDataTitle="upcoming payment"
      />
    </DetailsCard>
  );
};
