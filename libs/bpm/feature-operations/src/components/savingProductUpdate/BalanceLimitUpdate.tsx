import { useFormContext } from 'react-hook-form';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import { useGetSavingsProductDetailQuery } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const BalanceLimitUpdate = () => {
  const methods = useFormContext();
  const productId = methods.watch('productId');

  const { data } = useGetSavingsProductDetailQuery({ id: productId as string });
  const detailData = data?.settings?.general?.depositProduct?.depositProductDetail?.data;

  return (
    <FormSection templateColumns={2} header="Balance Limit Update">
      <GridItem colSpan={2}>
        <Alert status="info" hideCloseIcon>
          {detailData?.nature !== 'TERM_SAVING_OR_FD' && (
            <Box display="flex" flexDir="column">
              <Text fontSize="r2" fontWeight="medium">
                Existing Balance Limit
              </Text>
              <ul>
                <li>
                  <Text fontSize="s3">
                    Minimum Balance Limit: {amountConverter(detailData?.balanceLimit?.minAmount)}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Maximum Balance Limit: {amountConverter(detailData?.balanceLimit?.maxAmount)}
                  </Text>
                </li>
              </ul>
            </Box>
          )}
          {detailData?.nature === 'TERM_SAVING_OR_FD' && (
            <Box display="flex" flexDir="column">
              <Text fontSize="r2" fontWeight="medium">
                Fixed Deposit Amount Limit
              </Text>
              <ul>
                <li>
                  <Text fontSize="s3">
                    Minimum Amount:{' '}
                    {amountConverter(detailData?.fixedDepositAmountLimit?.minAmount)}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Maximum Amount:{' '}
                    {amountConverter(detailData?.fixedDepositAmountLimit?.maxAmount)}
                  </Text>
                </li>
              </ul>
            </Box>
          )}
        </Alert>
      </GridItem>
      <FormInput
        label={
          detailData?.nature === 'TERM_SAVING_OR_FD'
            ? 'New Minimum FD Amount Limit'
            : 'New Minimum Balance Limit'
        }
        name="balanceLimit.minAmount"
      />
      <FormInput
        label={
          detailData?.nature === 'TERM_SAVING_OR_FD'
            ? 'New Maximum FD Amount Limit'
            : 'New Maximum Balance Limit'
        }
        name="balanceLimit.maxAmount"
      />
    </FormSection>
  );
};
