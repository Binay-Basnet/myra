import { useEffect, useState } from 'react';

import { Box, Text } from '@myra-ui';

import {
  NatureOfDepositProduct,
  useGetAccountOpenProductDetailsQuery,
} from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';

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
    <Box border="1px solid" borderColor="border.layout" borderRadius="br2">
      <Box
        w="100%"
        p="s16"
        display="flex"
        flexDirection="column"
        gap="s4"
        bg="gray.100"
        alignItems="start"
      >
        <RedirectButton
          link={`${ROUTES.SETTINGS_GENERAL_SAVING_PRODUCTS_DETAILS}?id=${productId}`}
          label={productData?.productName as string}
        />
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
          Interest Rate :
          <b>
            {' '}
            {productData?.interest?.minRate} % -{productData?.interest?.maxRate}%{' '}
          </b>
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
        {' '}
        {productData?.noOftransactionAllowed && (
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Allowed Number of Transactions
            </Text>

            <Text fontSize="s3" fontWeight="600">
              {productData?.noOftransactionAllowed}
            </Text>
          </Box>
        )}
        {(productData?.balanceLimit?.minAmount || productData?.balanceLimit?.maxAmount) && (
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Balance Limit
            </Text>

            <Text fontSize="s3" fontWeight="600">
              {productData?.balanceLimit?.minAmount}- {productData?.balanceLimit?.maxAmount}
            </Text>
          </Box>
        )}
        {(productData?.depositAmount?.minAmount || productData?.depositAmount?.maxAmount) && (
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Deposit Amount Limit
            </Text>

            <Text fontSize="s3" fontWeight="600">
              {productData?.depositAmount?.minAmount}- {productData?.depositAmount?.maxAmount}
            </Text>
          </Box>
        )}
        {(productData?.withdrawAmountLimit?.minAmount ||
          productData?.withdrawAmountLimit?.maxAmount) && (
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="400">
              Withdraw Amount Limit
            </Text>

            <Text fontSize="s3" fontWeight="600">
              {' '}
              {productData?.withdrawAmountLimit?.minAmount}-
              {productData?.withdrawAmountLimit?.maxAmount}
            </Text>
          </Box>
        )}
        {productData?.nature !== NatureOfDepositProduct?.Saving &&
          productData?.nature !== NatureOfDepositProduct?.Current &&
          (productData?.minTenureUnitNumber || productData?.maxTenureUnitNumber) && (
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontSize="s3" fontWeight="400">
                Tenure
              </Text>

              <Text fontSize="s3" fontWeight="600">
                {productData?.minTenureUnitNumber} {productData?.tenureUnit}-
                {productData?.maxTenureUnitNumber} {productData?.tenureUnit}
              </Text>
            </Box>
          )}
      </Box>
    </Box>
  );
};
