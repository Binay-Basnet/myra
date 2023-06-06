import { useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Button, DetailsCard, Modal } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LoanInstallment, useGetLoanPreviewQuery } from '@coop/cbs/data-access';
import { exportVisibleTableToExcel, localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const UpcomingPayments = () => {
  const router = useRouter();

  const { id } = router.query;

  const tableRef = useRef<HTMLTableElement>(null);

  const { generalInfo } = useLoanAccountDetailHooks();

  const { isOpen, onClose, onToggle } = useDisclosure();

  const { data: loanPreviewData, isFetching: isLoanPreviewFetching } = useGetLoanPreviewQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
  );

  const paymentListWithIndex = useMemo(
    () =>
      loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.installments
        ?.slice(0, 10)
        ?.map((payment, index) => ({
          index: index + 1,
          ...payment,
        })) ?? [],
    [loanPreviewData]
  );

  const allPaymentListWithIndex = useMemo(
    () =>
      loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.installments?.map(
        (payment, index) => ({
          index: index + 1,
          ...payment,
        })
      ) ?? [],
    [loanPreviewData]
  );

  const { total, totalPrincipal, totalInterest } = useMemo(
    () => ({
      total: loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.total,
      totalPrincipal:
        loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.totalPrincipal,
      totalInterest: loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.totalInterest,
    }),
    [loanPreviewData]
  );

  const columns = useMemo<Column<LoanInstallment>[]>(
    () => [
      {
        header: 'Ins. No.',
        accessorFn: (row) => row?.installmentNo,
        meta: {
          Footer: {
            display: 'none',
          },
        },
      },

      {
        header: 'Installment Date',
        accessorKey: 'installmentDate',
        cell: (props) => localizedDate(props?.row?.original?.installmentDate),
        footer: 'Total Cost of Loan',
        meta: {
          width: '3.125rem',
          Footer: {
            colspan: 2,
          },
        },
      },

      {
        header: 'Principal',
        accessorKey: 'principal',
        cell: (props) => amountConverter(props?.row?.original?.principal),
        footer: () => amountConverter(totalPrincipal),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interest',
        cell: (props) => amountConverter(props?.row?.original?.interest),
        footer: () => amountConverter(totalInterest),
        meta: {
          isNumeric: true,
        },
      },

      {
        header: 'Total',
        accessorKey: 'payment',
        cell: (props) => amountConverter(props?.row?.original?.payment ?? 0),
        footer: () => amountConverter(total) || '-',
        meta: {
          isNumeric: true,
        },
      },
    ],
    [total, totalPrincipal, totalInterest]
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
          showFooter
          data={paymentListWithIndex}
          columns={columns}
          isLoading={isLoanPreviewFetching}
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
          showFooter
          data={allPaymentListWithIndex}
          columns={columns}
          isLoading={isLoanPreviewFetching}
          noDataTitle="Loan Repayment Schedule"
          ref={tableRef}
        />
      </Modal>
    </>
  );
};
