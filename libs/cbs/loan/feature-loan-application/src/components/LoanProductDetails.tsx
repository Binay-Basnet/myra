import { useEffect, useState } from 'react';

import { Box, Text } from '@myra-ui';

import {
  useGetLoanCurrentOrganizationRateQuery,
  useGetLoanProductDetailsDataQuery,
} from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

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

  const { data: loanCurrentOrgRateData } = useGetLoanCurrentOrganizationRateQuery();

  useEffect(() => {
    if (productId) {
      setTriggerQuery(true);
    }
  }, [productId]);

  return (
    <Box border="1px solid" borderColor="border.layout" borderRadius="br2">
      <Box w="100%" p="s16" display="flex" flexDirection="column" gap="s4" bg="gray.100">
        <Box display="flex" flexDirection="column" gap="s4" alignSelf="start">
          {/* <Text fontWeight="500" fontSize="s3">
            {productData?.productSubType}
          </Text> */}
          <RedirectButton
            label={productData?.productName as string}
            link={`${ROUTES.SETTINGS_GENERAL_LP_DETAILS}?id=${productId} `}
          />
        </Box>
        <Text fontWeight="Medium" fontSize="s3">
          {productData?.productCode?.prefix}-{productData?.productCode?.initialNo}
        </Text>
        <Text fontWeight="Medium" fontSize="s3">
          Product Premium Rate : {productData?.interest?.minRate} -{productData?.interest?.maxRate}
        </Text>
        <Text fontWeight="Medium" fontSize="s3">
          Product Premium :
          <b>
            {typeof productData?.productPremiumInterest === 'number'
              ? `${productData?.productPremiumInterest} %`
              : 'N/A'}
          </b>
        </Text>
        <Text fontWeight="Medium" fontSize="s3">
          Organization Rate :
          <b>
            {typeof loanCurrentOrgRateData?.settings?.general?.loan?.getCurrentOrganizationRate ===
            'number'
              ? `${loanCurrentOrgRateData?.settings?.general?.loan?.getCurrentOrganizationRate} %`
              : 'N/A'}
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
            {amountConverter(productData?.minimumLoanAmount)}-{' '}
            {amountConverter(productData?.maxLoanAmount)}
          </Text>
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3" fontWeight="400">
            Tenure
          </Text>
          <Text fontSize="s3" fontWeight="600">
            {productData?.minTenureUnitNumber} {productData?.tenureUnit}-
            {productData?.maxTenureUnitNumber} {productData?.tenureUnit}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
