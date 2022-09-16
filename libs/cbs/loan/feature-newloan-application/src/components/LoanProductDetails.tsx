import { useEffect, useState } from 'react';

import { useGetLoanProductDetailsDataQuery } from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

interface IProductProps {
  productId: string;
}

export const LoanProductCard = ({ productId }: IProductProps) => {
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
          Interest Rate : {productData?.interest?.minRate} -{productData?.interest?.maxRate}
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
            Loan Amount Limit
          </Text>
          <Text fontSize="s3" fontWeight="600">
            {productData?.minimumLoanAmount}- {productData?.maxLoanAmount}
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" fontWeight="400">
            Withdraw Amount Limit
          </Text>
          <Text fontSize="s3" fontWeight="600" />
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" fontWeight="400">
            Tenure
          </Text>
          <Text fontSize="s3" fontWeight="600">
            {productData?.minTenureUnitNumber} {productData?.tenureUnit}-
            {productData?.minTenureUnitNumber} {productData?.tenureUnit}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
