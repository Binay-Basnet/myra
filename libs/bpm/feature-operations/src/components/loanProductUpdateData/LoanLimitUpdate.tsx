import { useFormContext } from 'react-hook-form';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import { useGetLoanProductDetailQuery } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';

export const LoanLimitUpdate = () => {
  const methods = useFormContext();
  const productId = methods.watch('productId');

  const { data } = useGetLoanProductDetailQuery({ id: productId as string });
  const detailData = data?.settings?.general?.loanProducts?.getProductDetail?.data;

  return (
    <FormSection templateColumns={2} header="Loan Limit Update">
      <GridItem colSpan={2}>
        <Alert status="info" hideCloseIcon>
          <Box display="flex" flexDir="column">
            <Text fontSize="r2" fontWeight="medium">
              Existing Loan Limit
            </Text>
            <ul>
              <li>
                <Text fontSize="s3">Minimum Loan Limit: {detailData?.minimumLoanAmount}</Text>
              </li>
              <li>
                <Text fontSize="s3">Maximum Loan Limit: {detailData?.maxLoanAmount}</Text>
              </li>
            </ul>
          </Box>
        </Alert>
      </GridItem>
      <FormInput label="New Minimum Loan Limit" name="loanLimit.minAmount" />
      <FormInput label="New Maximum Loan Limit" name="loanLimit.maxAmount" />
    </FormSection>
  );
};
