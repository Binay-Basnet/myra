import { useMemo } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Button, DetailsCard, Modal, Text } from '@myra-ui';
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
  allList: CustomPaymentItem[];
}

export const UpcomingPayments = ({ paymentList, allList }: IPaymentProps) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const paymentListWithIndex =
    paymentList?.map((payment, index) => ({
      index: index + 1,
      ...payment,
    })) ?? [];

  const allPaymentListWithIndex =
    allList?.map((payment, index) => ({
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
    <>
      <DetailsCard
        title="Loan Repayment Schedule"
        bg="white"
        hasTable
        leftBtn={
          <Button variant="ghost" onClick={onToggle}>
            View Entire Schedule
          </Button>
        }
      >
        <Table
          isDetailPageTable
          isStatic
          data={paymentListWithIndex}
          columns={columns}
          noDataTitle="upcoming payment"
        />
      </DetailsCard>

      <Modal
        onClose={onClose}
        open={isOpen}
        title="Loan Repayment Schedule"
        scrollBehavior="inside"
        blockScrollOnMount
        width="4xl"
      >
        <Table
          isDetailPageTable
          isStatic
          data={allPaymentListWithIndex}
          columns={columns}
          noDataTitle="Loan Repayment Schedule"
        />
      </Modal>
    </>
  );
};
