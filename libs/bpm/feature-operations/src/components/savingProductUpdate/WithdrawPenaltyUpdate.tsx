import { useFormContext } from 'react-hook-form';

import { Alert, Box, FormSection, Text } from '@myra-ui';

import { useGetSavingsProductDetailQuery } from '@coop/cbs/data-access';
import { FormNumberInput } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const WithdrawPenaltyUpdate = () => {
  const methods = useFormContext();
  const productId = methods.watch('productId');

  const { data } = useGetSavingsProductDetailQuery({ id: productId as string });
  const detailData = data?.settings?.general?.depositProduct?.depositProductDetail?.data;

  return (
    <FormSection templateColumns={2} header="Withdraw Penalty Update">
      <Box display="flex" flexDir="column" gap={5}>
        <Alert title="Existing Details" status="info" hideCloseIcon>
          <Box display="flex" flexDir="column">
            <ul>
              <li>
                <Text fontSize="s3">
                  Penalty Amount: {`${amountConverter(detailData?.withdrawPenalty?.penaltyAmount)}`}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  Penalty Rate:{' '}
                  {detailData?.withdrawPenalty?.penaltyRate
                    ? `${detailData?.withdrawPenalty?.penaltyRate}%`
                    : 'N/A'}
                </Text>
              </li>
            </ul>
          </Box>
        </Alert>
        <Box display="flex" gap="s16">
          <FormNumberInput label="Penalty Amount" name="withdrawPenalty.penaltyAmount" />
          <FormNumberInput
            label="Penalty Rate"
            name="withdrawPenalty.penaltyRate"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
        </Box>
      </Box>
    </FormSection>
  );
};
