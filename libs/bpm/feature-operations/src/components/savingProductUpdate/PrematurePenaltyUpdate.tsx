import { useFormContext } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import { Alert, Box, FormSection, Text } from '@myra-ui';

import { useGetSavingsProductDetailQuery } from '@coop/cbs/data-access';
import { FormNumberInput } from '@coop/shared/form';

export const ProductTenureUpdate = () => {
  const methods = useFormContext();
  const productId = methods.watch('productId');

  const { data } = useGetSavingsProductDetailQuery({ id: productId as string });
  const detailData = data?.settings?.general?.depositProduct?.depositProductDetail?.data;

  return (
    <FormSection templateColumns={2} header="Account Premium Update">
      <GridItem colSpan={2}>
        <Alert title="Existing Details" status="info" hideCloseIcon>
          <Box display="flex" flexDir="column">
            <ul>
              <li>
                <Text fontSize="s3" textTransform="capitalize">
                  Unit: {detailData?.tenureUnit}
                </Text>
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
        label="Minimum Tenure"
        name="tenure.minTenureUnitNumber"
        rightElement={
          <Text fontSize="r1" fontWeight={500} color="accent.debit">
            {detailData?.tenureUnit?.toLowerCase()}
          </Text>
        }
      />
      <FormNumberInput
        label="Maximum Tenure"
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
