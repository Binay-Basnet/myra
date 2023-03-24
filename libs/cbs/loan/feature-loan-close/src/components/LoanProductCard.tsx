import { useEffect, useState } from 'react';

import { Box, Text } from '@myra-ui';

import {
  LoanProductInstallment,
  useGetLoanCloseDataQuery,
  useGetLoanPreviewQuery,
} from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface IProductProps {
  loanAccountId: string;
}

export const LoanProductCard = ({ loanAccountId }: IProductProps) => {
  const [triggerQuery, setTriggerQuery] = useState(false);

  const loanPreview = useGetLoanPreviewQuery(
    { id: loanAccountId as string },
    {
      enabled: triggerQuery,
    }
  );
  const loanData = loanPreview?.data?.loanAccount?.loanPreview?.data;
  const loanPayment = useGetLoanCloseDataQuery(
    { loanAccountId: loanAccountId as string },
    {
      enabled: triggerQuery,
    }
  );
  const loanPaymentData =
    loanPayment?.data?.loanAccount?.remainingPayments?.data?.totalPayableAmount;
  useEffect(() => {
    if (loanAccountId) {
      setTriggerQuery(true);
    }
  }, [loanAccountId]);
  const loanGeneralInfo = loanData?.generalInformation;
  return (
    <Box display="flex" flexDirection="column" gap="s16">
      {' '}
      <Box border="1px solid" borderColor="border.layout" borderRadius="br2">
        <Box w="100%" p="s16" display="flex" flexDirection="column" gap="s4" bg="gray.100">
          <Box display="flex" flexDirection="column" gap="s4" alignItems="start">
            <RedirectButton
              label={loanGeneralInfo?.loanProduct as string}
              link={`${ROUTES.SETTINGS_GENERAL_LP_DETAILS}?id=${loanData?.productId}`}
            />

            <Text fontWeight="500" fontSize="s3">
              {loanGeneralInfo?.loanSubType}
            </Text>
          </Box>
          <Text fontWeight="Medium" fontSize="s3">
            {loanGeneralInfo?.productCode}
          </Text>
          <Text fontWeight="Medium" fontSize="s3">
            Interest Rate : <b>{loanData?.loanDetails?.interestRate}%</b>
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
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Interest Amount{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {amountConverter(loanData?.loanDetails?.interestAmount || 0)}
            </Text>
          </Box>
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
              {localizedDate(loanData?.repaymentDetails?.lastPaymentDate)}
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
        </Box>
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between" p="s16" bg="border.layout">
          <Text fontWeight="400" fontSize="s3">
            Total Payable Amount
          </Text>
          <Text fontWeight="600" fontSize="s3">
            {amountConverter(loanPaymentData || '0')}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};