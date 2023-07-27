import { useEffect, useMemo, useState } from 'react';

import { Box, Text } from '@myra-ui';

import {
  LoanProductInstallment,
  PenaltyType,
  useGetLoanAccountDetailsQuery,
  useGetLoanPreviewQuery,
} from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

interface IProductProps {
  loanAccountId: string;
}

const penaltyType: Partial<Record<PenaltyType, string>> = {
  RemainingPrincipal: 'Remaining Principal',
  LoanInstallmentAmount: 'Loan Installment Amount',
  PenalInterest: 'Penalt Interest',
};

export const LoanProductCard = ({ loanAccountId }: IProductProps) => {
  const [triggerQuery, setTriggerQuery] = useState(false);

  const loanPreview = useGetLoanPreviewQuery(
    { id: loanAccountId as string },
    {
      enabled: triggerQuery,
    }
  );

  const { data: loanAccountDetailsQueryData } = useGetLoanAccountDetailsQuery(
    {
      loanAccountId: loanAccountId as string,
      paginate: getPaginationQuery(),
    },
    { enabled: triggerQuery }
  );

  const overviewData = loanAccountDetailsQueryData?.loanAccount?.loanAccountDetails?.overView;

  const loanData = loanPreview?.data?.loanAccount?.loanPreview?.data;
  useEffect(() => {
    if (loanAccountId) {
      setTriggerQuery(true);
    }
  }, [loanAccountId]);
  const loanGeneralInfo = loanData?.generalInformation;

  const penaltyInfo: { label: string; value: string | null | undefined }[] = useMemo(() => {
    const penaltyGeneralInfo = loanData?.generalInformation?.penalty;

    return [
      {
        label: 'Penalty Type',
        value: penaltyType[penaltyGeneralInfo?.penaltyType as PenaltyType],
      },
      {
        label: 'Days After Installment Date',
        value: String(penaltyGeneralInfo?.penaltyDayAfterInstallmentDate ?? '-'),
      },
      {
        label: 'Penalty Rate',
        value: penaltyGeneralInfo?.penaltyRate ? `${penaltyGeneralInfo?.penaltyRate} %` : '-',
      },
      {
        label: 'Penalty Amount',
        value: amountConverter(penaltyGeneralInfo?.penaltyAmount),
      },
      {
        label: 'Dues Since',
        value:
          loanData?.paymentSchedule?.duesSince &&
          localizedDate(loanData?.paymentSchedule?.duesSince),
      },
    ];
  }, [loanData]);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      {' '}
      <Box border="1px solid" borderColor="border.layout" borderRadius="br2">
        <Box w="100%" p="s16" display="flex" flexDirection="column" gap="s4" bg="gray.100">
          <Box
            display="flex"
            flexDirection="column"
            gap="s4"
            alignItems="start"
            wordBreak="break-word"
          >
            <RedirectButton
              label={`${loanGeneralInfo?.loanProduct} (${loanGeneralInfo?.productCode})`}
              link={`${ROUTES.SETTINGS_GENERAL_LP_DETAILS}?id=${loanData?.productId}`}
            />

            <Text fontWeight="500" fontSize="s3">
              {loanGeneralInfo?.loanSubType}
            </Text>
          </Box>
          <Text fontWeight="Medium" fontSize="s3">
            {loanAccountId}
          </Text>
          <Text fontWeight="Medium" fontSize="s3">
            Interest Rate : <b>{loanData?.loanDetails?.interestRate?.toFixed(2)}%</b>
          </Text>
        </Box>
        <Box
          borderTop="1px solid"
          borderColor="border.layout"
          display="flex"
          flexDirection="column"
          gap="s8"
          p="s16"
        >
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Disbursed Principal Amount{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {amountConverter(loanData?.loanDetails?.totalDisbursedAmount as string)}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Sanctioned Principal Amount{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {amountConverter(loanData?.loanDetails?.totalSanctionedAmount as string)}
            </Text>
          </Box>
          {/* <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Interest Amount{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {amountConverter(loanData?.loanDetails?.interestAmount || 0)}
            </Text>
          </Box> */}
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Disburse Date{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {localizedDate(loanData?.loanDetails?.disburseDate)}
            </Text>
          </Box>
          {/* <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Expiry Date{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {loanData?.loanDetails?.expiryDate ?? '-'}
            </Text>
          </Box> */}
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Last Payment Date{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {loanData?.repaymentDetails?.lastPaymentDate?.local
                ? localizedDate(loanData?.repaymentDetails?.lastPaymentDate)
                : '-'}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Interest Method
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {loanData?.loanDetails?.interestMethod}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Loan Repayment Scheme
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {loanData?.loanDetails?.loanRepaymentScheme}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Payment Frequency{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {loanData?.loanDetails?.paymentFrequency === LoanProductInstallment?.Daily
                ? 'Daily'
                : loanData?.loanDetails?.paymentFrequency === LoanProductInstallment?.Weekly
                ? 'Wekly'
                : loanData?.loanDetails?.paymentFrequency === LoanProductInstallment?.Monthly
                ? 'Monthly'
                : loanData?.loanDetails?.paymentFrequency === LoanProductInstallment?.Quarterly
                ? 'Quaterly'
                : loanData?.loanDetails?.paymentFrequency === LoanProductInstallment?.HalfYearly
                ? 'Half-Yearly'
                : 'Yearly'}
            </Text>
          </Box>
          {penaltyInfo?.map(
            (info) =>
              info?.value && (
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontSize="s3" fontWeight="400">
                    {info?.label}
                  </Text>
                  <Text fontSize="s3" fontWeight="600">
                    {info?.value}
                  </Text>
                </Box>
              )
          )}
        </Box>
      </Box>
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="s8"
          p="s8"
          border="1px solid"
          borderColor="border.layout"
          borderRadius="br2"
        >
          {loanData?.loanDetails?.loanRepaymentScheme === 'LOC' && (
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="400" fontSize="s3">
                Withdrawable Amount
              </Text>
              <Text fontWeight="600" fontSize="s3">
                {amountConverter(
                  (
                    Number(overviewData?.generalInformation?.sanctionedAmount) -
                    Number(overviewData?.totalRemainingPrincipal)
                  ).toFixed(2)
                )}
              </Text>
            </Box>
          )}
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="400" fontSize="s3">
              Remaining Principal Amount
            </Text>
            <Text fontWeight="600" fontSize="s3">
              {amountConverter(loanData?.paymentSchedule?.totalPayablePrincipal as string)}{' '}
            </Text>
          </Box>
          {loanData?.paymentSchedule?.totalPayableInterest && (
            <Box display="flex" justifyContent="space-between">
              <Text fontWeight="400" fontSize="s3">
                Remaining Interest Amount{' '}
              </Text>
              <Text fontWeight="600" fontSize="s3">
                {amountConverter(loanData?.paymentSchedule?.totalPayableInterest)}
              </Text>
            </Box>
          )}
        </Box>
        {loanData?.paymentSchedule?.totalRemainingPayable && (
          <Box display="flex" justifyContent="space-between" p="s16" bg="border.layout">
            <Text fontWeight="400" fontSize="s3">
              Total Remaining Amount
            </Text>
            <Text fontWeight="600" fontSize="s3">
              {amountConverter(loanData?.paymentSchedule.totalRemainingPayable)}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};
