import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import {
  useGetEndOfDayDateDataQuery,
  useGetSavingsProductDetailQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormInput } from '@coop/shared/form';

export const ProductInterestUpdate = () => {
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const methods = useFormContext();
  const productId = methods.watch('productId');

  const { data } = useGetSavingsProductDetailQuery({ id: productId as string });

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);
  return (
    <FormSection templateColumns={2} header="Product Interest Update">
      <GridItem colSpan={2}>
        <Alert status="info" hideCloseIcon title="Existing Details">
          <Box p="s16">
            <ul>
              <li>
                <Text>
                  Product Premium for Current Date
                  {
                    data?.settings?.general?.depositProduct?.depositProductDetail?.data
                      ?.productPremiumInterest
                  }{' '}
                  %
                </Text>
              </li>
            </ul>
          </Box>
        </Alert>
      </GridItem>
      <FormInput
        name="interestUpdate.rate"
        type="number"
        label="New Product Premium"
        textAlign="right"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />

      <FormDatePicker
        name="interestUpdate.effectiveDate"
        label="Effective Date"
        minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
      />
    </FormSection>
  );
};
