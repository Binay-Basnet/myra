import { useEffect, useState } from 'react';

import {
  LoanProductInstallment,
  useGetLoanPreviewQuery,
  useGetLoanProductDetailsDataQuery,
} from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

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
  useEffect(() => {
    if (loanAccountId) {
      setTriggerQuery(true);
    }
  }, [loanAccountId]);
  const productId = loanData?.productId as string;
  const productDetails = useGetLoanProductDetailsDataQuery({ id: productId });
  const productData = productDetails?.data?.settings?.general?.loanProducts?.formState?.data;
  return (
    <Box display="flex" flexDirection="column" gap="s16">
      {' '}
      <Box border="1px solid" borderColor="border.layout" borderRadius="br2">
        <Box w="100%" p="s16" display="flex" flexDirection="column" gap="s4" bg="gray.100">
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontWeight="500" fontSize="r1" color="#006837">
              {productData?.productName}
            </Text>
            <Text fontWeight="500" fontSize="s3">
              {productData?.productSubType}
            </Text>
          </Box>
          <Text fontWeight="Medium" fontSize="s3">
            {productData?.productCode?.prefix}-{productData?.productCode?.initialNo}
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
              {loanData?.loanDetails?.totalDisbursedAmount}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Interest Amount{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {loanData?.loanDetails?.interestAmount}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Disburse Date{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {loanData?.loanDetails?.disburseDate}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Expiry Date{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {loanData?.loanDetails?.expiryDate}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Last Payment Date{' '}
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {loanData?.repaymentDetails?.lastPaymentDate}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Interest Method
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {productData?.interestMethod}
            </Text>
          </Box>
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Loan Repayment Scheme
            </Text>
            <Text fontSize="s3" fontWeight="600">
              {productData?.repaymentScheme}
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
        <Box display="flex" flexDirection="column" gap="s8" p="s8">
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="400" fontSize="s3">
              Remaining Principal Amount
            </Text>
            <Text fontWeight="600" fontSize="s3">
              {loanData?.repaymentDetails?.remainingPrincipal}{' '}
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Text fontWeight="400" fontSize="s3">
              Remaining Interest Amount{' '}
            </Text>
            <Text fontWeight="600" fontSize="s3">
              {loanData?.repaymentDetails?.remainingInterest}
            </Text>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" p="s16" bg="border.layout">
          <Text fontWeight="400" fontSize="s3">
            Total Remaining Amount
          </Text>
          <Text fontWeight="600" fontSize="s3">
            {loanData?.repaymentDetails?.remainingTotal}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
