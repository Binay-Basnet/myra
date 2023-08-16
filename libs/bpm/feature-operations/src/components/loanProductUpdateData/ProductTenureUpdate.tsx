import { useFormContext } from 'react-hook-form';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import { useGetLoanProductDetailQuery } from '@coop/cbs/data-access';
import { FormNumberInput } from '@coop/shared/form';

export const LoanTenureUpdate = () => {
  const methods = useFormContext();
  const productId = methods.watch('productId');

  const { data } = useGetLoanProductDetailQuery({ id: productId as string });
  const detailData = data?.settings?.general?.loanProducts?.getProductDetail?.data;

  return (
    <FormSection templateColumns={2} header="Product Tenure Update">
      <GridItem colSpan={2}>
        <Alert title="Existing Details" status="info" hideCloseIcon>
          <Box display="flex" flexDir="column">
            <ul>
              <li>
                <Text fontSize="s3">Unit: {detailData?.tenureUnit}</Text>
              </li>
              <li>
                <Text fontSize="s3">
                  Minimum Tenure:{' '}
                  {`${detailData?.minTenureUnitNumber} ${detailData?.tenureUnit?.toLowerCase()}`}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  Maximum Tenure:{' '}
                  {`${detailData?.maxTenureUnitNumber} ${detailData?.tenureUnit?.toLowerCase()}`}
                </Text>
              </li>
            </ul>
          </Box>
        </Alert>
      </GridItem>
      <FormNumberInput
        label="Minimum Interest Rate"
        name="tenure.minTenureUnitNumber"
        rightElement={
          <Text fontSize="r1" fontWeight={500} color="accent.debit">
            {detailData?.tenureUnit?.toLowerCase()}
          </Text>
        }
      />
      <FormNumberInput
        label="Maximum Interest Rate"
        name="tenure.maxTenureUnitNumber"
        rightElement={
          <Text fontSize="r1" fontWeight={500} color="accent.debit">
            {detailData?.tenureUnit?.toLowerCase()}
          </Text>
        }
      />
    </FormSection>
  );
};
