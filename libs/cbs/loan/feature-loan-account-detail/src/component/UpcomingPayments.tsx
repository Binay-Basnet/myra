import { useMemo, useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Button, DetailsCard, Modal, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useAppSelector } from '@coop/cbs/data-access';
import { exportVisibleTableToExcel, localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

type CustomPaymentItem = {
  index?: string | number;
  installmentNo: number | undefined;
  installmentDate: Record<'local' | 'en' | 'np', string> | null | undefined;
  payment: string | undefined;
  principal: string | undefined;
  interest: string | undefined;
  remainingPrincipal: string | undefined;
  paid: boolean | undefined;
  paidDate: Record<'local' | 'en' | 'np', string> | null | undefined;
  remainingIntrest?: number | string;
  currentRemainingPrincipal?: number | string;
};

interface IPaymentProps {
  paymentList: CustomPaymentItem[];
  allList: CustomPaymentItem[];
}

export const UpcomingPayments = ({ paymentList, allList }: IPaymentProps) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const { generalInfo } = useLoanAccountDetailHooks();

  const { isOpen, onClose, onToggle } = useDisclosure();
  const preference = useAppSelector((state) => state.auth?.preference);

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
        header: 'Installment No',
        accessorKey: 'installmentNo',
      },
      {
        header: 'Date',
        accessorKey: 'installmentDate',

        cell: (props) =>
          localizedDate(
            props?.getValue() as Record<'local' | 'en' | 'np', string> | null | undefined
          ),
      },
      {
        header: 'Paid Date',
        accessorKey: 'paidDate',

        cell: (props) =>
          localizedDate(
            props?.getValue() as Record<'local' | 'en' | 'np', string> | null | undefined
          ),
      },
      {
        header: 'Installment Amount',
        accessorKey: 'payment',
        cell: (props) =>
          props.getValue() ? <Text>{amountConverter(props.getValue() as string)}</Text> : 'N/A',
      },
      {
        header: 'Principal',
        accessorKey: 'principal',
        cell: (props) => {
          const data = props?.row?.original;
          return (
            <>
              {amountConverter(data?.principal)}
              {data?.currentRemainingPrincipal !== '0' && (
                <>
                  (Current Remaining Principal: {amountConverter(data?.currentRemainingPrincipal)})
                </>
              )}
              {data?.remainingIntrest !== '0' && (
                <>(Remaining Interest: {amountConverter(data?.remainingIntrest)})</>
              )}
            </>
          );
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interest',
        cell: (props) =>
          props.getValue() ? <Text>{amountConverter(props.getValue() as string)}</Text> : 'N/A',
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
    [preference]
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
        headerButton={
          <Button
            variant="ghost"
            onClick={() =>
              exportVisibleTableToExcel(
                `${generalInfo?.accountName} - Payment Schedule - `,
                tableRef
              )
            }
          >
            Export
          </Button>
        }
      >
        <Table
          isDetailPageTable
          isStatic
          data={allPaymentListWithIndex}
          columns={columns}
          noDataTitle="Loan Repayment Schedule"
          ref={tableRef}
        />
      </Modal>
    </>
  );
};
