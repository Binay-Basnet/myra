import { useEffect, useState } from 'react';

import { useGetAccountOpenProductDetailsQuery } from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

interface ProductProps {
  productId: string;
}

export const ProductCard = ({ productId }: ProductProps) => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: productId },
    {
      enabled: triggerQuery,
    }
  );
  const productData = poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;
  useEffect(() => {
    if (productId) {
      setTriggerQuery(true);
    }
  }, [productId]);
  return (
    <Box border="1px solid" borderColor="border.layout" borderRadius={'br2'}>
      <Box w="100%" p="s16" display={'flex'} flexDirection="column" gap="s4" bg="gray.100">
        <Text fontWeight={'500'} fontSize="r1" color="#006837">
          {productData?.productName}
        </Text>
        <Text fontWeight="Medium" fontSize="s3">
          {
            poductDetails?.data?.settings?.general?.depositProduct?.formState?.data?.productCode
              ?.prefix
          }
          -
          {
            poductDetails?.data?.settings?.general?.depositProduct?.formState?.data?.productCode
              ?.initialNo
          }
        </Text>
        <Text fontWeight="Medium" fontSize="s3">
          Interest Rate : {productData?.interest?.minRate} - {''}
          {productData?.interest?.maxRate}
        </Text>
      </Box>
      <Box
        borderTop={'1px solid'}
        borderColor="border.layout"
        display={'flex'}
        flexDirection="column"
        gap="s8"
        p="s16"
      >
        {' '}
        <Box display={'flex'} flexDirection="column" gap="s4">
          <Text fontSize={'s3'} fontWeight="400">
            Allowed Number of Transactions
          </Text>

          <Text fontSize={'s3'} fontWeight="600"></Text>
        </Box>
        <Box display={'flex'} flexDirection="column" gap="s4">
          <Text fontSize={'s3'} fontWeight="400">
            Balance Limit
          </Text>

          <Text fontSize={'s3'} fontWeight="600">
            {productData?.balanceLimit?.minAmount}- {productData?.balanceLimit?.maxAmount}
          </Text>
        </Box>
        <Box display={'flex'} flexDirection="column" gap="s4">
          <Text fontSize={'s3'} fontWeight="400">
            Deposit Amount Limit
          </Text>

          <Text fontSize={'s3'} fontWeight="600">
            {productData?.depositAmount?.minAmount}- {productData?.depositAmount?.maxAmount}
          </Text>
        </Box>
        <Box display={'flex'} flexDirection="column" gap="s4">
          <Text fontSize={'s3'} fontWeight="400">
            Withdraw Amount Limit
          </Text>

          <Text fontSize={'s3'} fontWeight="600"></Text>
        </Box>
        <Box display={'flex'} flexDirection="column" gap="s4">
          <Text fontSize={'s3'} fontWeight="400">
            Tenure
          </Text>

          <Text fontSize={'s3'} fontWeight="600">
            {productData?.minTenureUnitNumber} {productData?.minTenureUnit}-
            {productData?.minTenureUnitNumber} {productData?.minTenureUnit}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
