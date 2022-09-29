import { useEffect, useState } from 'react';

import {
  useGetLoanApplicationDetailsQuery,
  useGetLoanProductDetailsDataQuery,
} from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

interface IProductProps {
  productId: string;
  loanAccountId?: string;
}

export const LoanProductCard = ({ productId, loanAccountId }: IProductProps) => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const productDetails = useGetLoanProductDetailsDataQuery(
    { id: productId },
    {
      enabled: triggerQuery,
    }
  );
  const productData = productDetails?.data?.settings?.general?.loanProducts?.formState?.data;

  useEffect(() => {
    if (productId) {
      setTriggerQuery(true);
    }
  }, [productId]);
  const loanApplicationDetails = useGetLoanApplicationDetailsQuery({ id: loanAccountId as string });
  const loan = loanApplicationDetails?.data?.loanAccount?.formState?.data;

  const loanInterest = loan?.intrestRate;

  return (
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
          Interest Rate : <b>{loanInterest}%</b>
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
            {productData?.interestMethod}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" fontWeight="400">
            Interest Amount{' '}
          </Text>
          <Text fontSize="s3" fontWeight="600">
            {productData?.repaymentScheme}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" fontWeight="400">
            Disburse Date{' '}
          </Text>
          <Text fontSize="s3" fontWeight="600">
            {productData?.minimumLoanAmount}- {productData?.maxLoanAmount}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" fontWeight="400">
            Expiry Date{' '}
          </Text>
          <Text fontSize="s3" fontWeight="600">
            {productData?.minimumLoanAmount}- {productData?.maxLoanAmount}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" fontWeight="400">
            Last Payment Date{' '}
          </Text>
          <Text fontSize="s3" fontWeight="600">
            {productData?.minimumLoanAmount}- {productData?.maxLoanAmount}
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
          <Text fontSize="s3" fontWeight="600" />
        </Box>
      </Box>
    </Box>
  );
};
