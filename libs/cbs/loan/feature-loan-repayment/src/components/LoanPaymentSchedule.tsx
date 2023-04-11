import { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Button, Text } from '@myra-ui';

import { LoanInstallment, useGetLoanPreviewQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, quantityConverter } from '@coop/shared/utils';

import { AllPaymentsModal } from './AllPaymentsModal';
import { FullLoanSchedule } from './FullLoanSchedule';
import { PartialLoanPaymentSchedule } from './PartialLoanPaymentSchedule';

interface ILoanPaymentScheduleProps {
  setTotalFine: Dispatch<SetStateAction<number>>;
  totalFine: number;
}

export const LoanPaymentSchedule = ({ setTotalFine, totalFine }: ILoanPaymentScheduleProps) => {
  const {
    isOpen: isRecentPaymentOpen,
    onClose: onRecentPaymentClose,
    onToggle: onRecentPaymentToggle,
  } = useDisclosure();

  const {
    isOpen: isFullScheduleOpen,
    onClose: onFullScheduleClose,
    onToggle: onFullScheduleToggle,
  } = useDisclosure();

  const { watch } = useFormContext();

  const loanAccountId = watch('loanAccountId');

  const { data: loanPreviewData, isFetching: isLoanPreviewFetching } = useGetLoanPreviewQuery(
    {
      id: loanAccountId,
    },
    {
      enabled: !!loanAccountId,
    }
  );

  const { paymentSchedule, generalInformation, repaymentDetails } = useMemo(
    () => ({ ...loanPreviewData?.loanAccount?.loanPreview?.data }),
    [loanPreviewData]
  );

  const nextInstallmentNo = repaymentDetails?.nextInstallmentNo ?? (1 as number);

  const partialPaidInstallment = paymentSchedule?.installments?.find(
    (installment) => installment?.status === 'PARTIAL' || installment?.isPartial
  );

  const paidInstallments = paymentSchedule?.installments?.filter(
    (installment) => installment?.status === 'PAID'
  );

  const overDueInstallments = useMemo(
    () =>
      paymentSchedule?.installments?.filter((installment) => installment?.status === 'OVERDUE') ??
      [],
    [paymentSchedule]
  );

  useEffect(() => {
    if (!overDueInstallments?.length) return setTotalFine(0);

    return setTotalFine(
      overDueInstallments.reduce((sum, installment) => sum + Number(installment?.penalty ?? 0), 0)
    );
  }, [overDueInstallments]);

  const currentInstallment = paymentSchedule?.installments?.find(
    (installment) => installment?.status === 'CURRENT'
  );

  const partialLoanPaymentSchedule = useMemo(() => {
    let tempInstallments = [...overDueInstallments];

    if (partialPaidInstallment && !tempInstallments.includes(partialPaidInstallment)) {
      tempInstallments?.push(partialPaidInstallment);
    }

    if (currentInstallment) {
      tempInstallments?.push(currentInstallment);
    }

    if (tempInstallments?.length) {
      tempInstallments = [
        ...tempInstallments,
        ...paymentSchedule.installments.slice(
          tempInstallments[tempInstallments.length - 1].installmentNo,
          tempInstallments[tempInstallments.length - 1].installmentNo + 2
        ),
      ];
    }

    if (!tempInstallments?.length && paymentSchedule?.installments?.length) {
      const lastUnpaidInstallment = paymentSchedule?.installments?.find(
        (installment) => !installment?.status
      )?.installmentNo;

      if (lastUnpaidInstallment) {
        tempInstallments = paymentSchedule?.installments?.slice(
          lastUnpaidInstallment - 1,
          lastUnpaidInstallment + 1
        );
      }
    }

    return tempInstallments;
  }, [
    overDueInstallments,
    partialPaidInstallment,
    currentInstallment,
    paymentSchedule?.installments,
  ]);

  const totalOverdueAmount = useMemo(
    () =>
      overDueInstallments.reduce((sum, installment) => sum + Number(installment?.overdueAmount), 0),
    [overDueInstallments]
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="r1" fontWeight="600">
          Loan Payment Schedule
        </Text>
        <Box display="flex" gap="s16">
          <Button variant="ghost" onClick={onRecentPaymentToggle}>
            View All Payments
          </Button>
          <Button variant="ghost" onClick={onFullScheduleToggle}>
            View Full Schedule
          </Button>
        </Box>
      </Box>

      <PartialLoanPaymentSchedule
        data={(partialLoanPaymentSchedule ?? []) as LoanInstallment[]}
        total={paymentSchedule?.total as string}
        nextInstallmentNumber={nextInstallmentNo}
        totalInterest={paymentSchedule?.totalInterest ?? 0}
        totalPrincipal={paymentSchedule?.totalPrincipal ?? 0}
        isLoading={isLoanPreviewFetching}
      />

      <Box>
        {partialPaidInstallment ? (
          <>
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="s3" fontWeight={500} color="gray.700">
                Partial Payment Details
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              fontSize="s3"
              px="s20"
              py="s12"
              bg="warning.0"
            >
              <Box display="flex" gap="s4">
                <Text>Installment No:</Text>
                <Text fontWeight={500}>{partialPaidInstallment?.installmentNo}</Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Principal Paid:</Text>
                <Text fontWeight={500}>{amountConverter(partialPaidInstallment?.principal)}</Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Interest Paid:</Text>
                <Text fontWeight={500}>{amountConverter(partialPaidInstallment?.interest)}</Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Last Paid Date:</Text>
                <Text fontWeight={500}>{localizedDate(partialPaidInstallment?.paidDate)}</Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Fine:</Text>
                <Text fontWeight={500} color="danger.500">
                  {amountConverter(partialPaidInstallment?.penalty ?? 0)}
                </Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Remaining Principal:</Text>
                <Text fontWeight={500} color="danger.500">
                  {amountConverter(partialPaidInstallment?.currentRemainingPrincipal)}
                </Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Remaining Interest:</Text>
                <Text fontWeight={500} color="danger.500">
                  {amountConverter(partialPaidInstallment?.remainingInterest)}
                </Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Remaining Payable:</Text>
                <Text fontWeight={500} color="danger.500">
                  {amountConverter(
                    Number(partialPaidInstallment?.remainingInterest ?? 0) +
                      Number(partialPaidInstallment?.currentRemainingPrincipal ?? 0)
                  )}
                </Text>
              </Box>
            </Box>
          </>
        ) : null}
      </Box>

      <Box>
        {overDueInstallments?.length ? (
          <>
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="s3" fontWeight={500} color="gray.700">
                Overdue Details
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              fontSize="s3"
              px="s20"
              py="s12"
              bg="danger.0"
            >
              <Box display="flex" gap="s4">
                <Text>Installment No:</Text>
                <Text fontWeight={500}>
                  {overDueInstallments?.map((installment) => installment?.installmentNo).join(', ')}
                </Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Total Overdue:</Text>
                <Text fontWeight={500}>
                  {`${quantityConverter(
                    Math.max(
                      ...overDueInstallments.map((installment) => installment?.overDueDays ?? 0)
                    )
                  )} Days`}
                </Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Total Fine:</Text>
                <Text fontWeight={500}>{amountConverter(totalFine)}</Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Total Overdue Amount:</Text>
                <Text fontWeight={500}>{amountConverter(totalOverdueAmount)}</Text>
              </Box>
            </Box>
          </>
        ) : null}
      </Box>

      <Box>
        {currentInstallment && !partialPaidInstallment && !overDueInstallments?.length && (
          <>
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="s3" fontWeight={500} color="gray.700">
                Current Installment Details
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              fontSize="s3"
              px="s20"
              py="s12"
              bg="highlight.500"
            >
              <Box display="flex" gap="s4">
                <Text>Installment No:</Text>
                <Text fontWeight={500}>{currentInstallment?.installmentNo}</Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Principal:</Text>
                <Text fontWeight={500}>
                  {amountConverter(currentInstallment?.fullPrincipal ?? 0)}
                </Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Interest Till Date:</Text>
                <Text fontWeight={500}>{amountConverter(currentInstallment?.interest)}</Text>
              </Box>
              <Box display="flex" gap="s4">
                <Text>Total Payable Amount:</Text>
                <Text fontWeight={500}>{amountConverter(currentInstallment?.payment)}</Text>
              </Box>
            </Box>
          </>
        )}
      </Box>

      <AllPaymentsModal
        isOpen={isRecentPaymentOpen}
        onClose={onRecentPaymentClose}
        data={paidInstallments as LoanInstallment[]}
        total={paymentSchedule?.total as string}
        totalInterest={paymentSchedule?.totalInterest ?? 0}
        totalPrincipal={paymentSchedule?.totalPrincipal ?? 0}
      />
      <FullLoanSchedule
        isOpen={isFullScheduleOpen}
        onClose={onFullScheduleClose}
        data={
          (paymentSchedule?.installments?.filter((installment) => installment?.status !== 'PAID') ??
            []) as LoanInstallment[]
        }
        total={paymentSchedule?.total as string}
        totalInterest={paymentSchedule?.totalInterest ?? 0}
        totalPrincipal={paymentSchedule?.totalPrincipal ?? 0}
        loanName={generalInformation?.loanName as string}
        totalRemainingPayable={paymentSchedule?.totalRemainingPayable}
      />
    </>
  );
};
