import { useFormContext } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import { Alert, Box, FormSection, Text } from '@myra-ui';

import { useGetSavingsProductDetailQuery } from '@coop/cbs/data-access';
import { FormNumberInput } from '@coop/shared/form';

export const AccountPremiumUpdate = () => {
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
                <Text fontSize="s3">
                  Minimum Interest Rate: {detailData?.interest?.minRate ?? 'N/A'}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  Maximum Interest Rate: {detailData?.interest?.maxRate ?? 'N/A'}
                </Text>
              </li>
            </ul>
          </Box>
        </Alert>
      </GridItem>
      <FormNumberInput label="Minimum Interest Rate" name="accountPremium.minRate" />
      <FormNumberInput label="Maximum Interest Rate" name="accountPremium.maxRate" />{' '}
    </FormSection>
  );
};
