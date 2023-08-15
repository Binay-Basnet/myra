import { useFormContext } from 'react-hook-form';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import { useGetLoanProductDetailQuery } from '@coop/cbs/data-access';
import { FormNumberInput } from '@coop/shared/form';

export const LoanAccountPremiumUpdate = () => {
  const methods = useFormContext();
  const productId = methods.watch('productId');

  const { data } = useGetLoanProductDetailQuery({ id: productId as string });
  const detailData = data?.settings?.general?.loanProducts?.getProductDetail?.data;

  return (
    <FormSection templateColumns={2} header="Account Premium Update">
      <GridItem colSpan={2}>
        <Alert title="Existing Details" status="info" hideCloseIcon>
          <Box display="flex" flexDir="column">
            <ul>
              <li>
                <Text fontSize="s3">
                  Minimum Interest Rate: {detailData?.interest?.minRate ?? 'N/A'}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  Maximum Balance Limit: {detailData?.interest?.maxRate ?? 'N/A'}
                </Text>
              </li>
            </ul>
          </Box>
        </Alert>
      </GridItem>
      <FormNumberInput label="Minimum Interest Rate" name="accountPremium.minRate" />
      <FormNumberInput label="Maximum Interest Rate" name="accountPremium.maxRate" />
    </FormSection>
  );
};
