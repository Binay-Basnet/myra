import { useFormContext } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import { Alert, Box, FormSection, Text } from '@myra-ui';

import { useGetSavingsProductDetailQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormNumberInput, FormSwitchTab } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

const enableSwitch = [
  {
    label: 'Enable',
    value: true,
  },
  {
    label: 'Disable',
    value: false,
  },
];

export const RebateUpdate = () => {
  const methods = useFormContext();
  const productId = methods.watch('productId');

  const { data } = useGetSavingsProductDetailQuery({ id: productId as string });
  const detailData = data?.settings?.general?.depositProduct?.depositProductDetail?.data;
  const isRebateAllowed = methods?.watch('rebate.isRebateAllowed');

  return (
    <FormSection templateColumns={2} header="Rebate Update">
      <GridItem colSpan={2}>
        <Alert title="Existing Details" status="info" hideCloseIcon>
          <Box display="flex" flexDir="column">
            <ul>
              <li>
                <Text fontSize="s3">
                  Days Before Installment Date:{' '}
                  {detailData?.rebateData?.dayBeforeInstallmentDate
                    ? `${detailData?.rebateData?.dayBeforeInstallmentDate} days`
                    : 'N/A'}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  No of Installment: {detailData?.rebateData?.noOfInstallment ?? 'N/A'}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  Rebate Amount: {`${amountConverter(detailData?.rebateData?.rebateAmount)}`}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  Rebate Rate:{' '}
                  {detailData?.rebateData?.rebateRate
                    ? `${detailData?.rebateData?.rebateRate}`
                    : 'N/A'}
                </Text>
              </li>
            </ul>
          </Box>
        </Alert>
      </GridItem>
      <GridItem colSpan={2} pt="s16">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Text fontSize="s3" fontWeight="500" color="gray.700">
            Rebate Update
          </Text>
          <FormSwitchTab name="rebate.isRebateAllowed" options={enableSwitch} />
        </Box>
      </GridItem>
      {isRebateAllowed && (
        <>
          <FormNumberInput
            name="rebate.rebate.dayBeforeInstallmentDate"
            label="Day Before Installment Date "
          />
          <FormNumberInput
            name="rebate.rebate.noOfInstallment"
            label="No Of Installments"
            helperText="Enter Number of Installments"
          />

          <FormNumberInput
            isRequired
            name="rebate.rebate.rebateRate"
            label="Percentage of Deposited Amount"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
            textAlign="right"
          />
          <FormAmountInput name="rebate.rebate.rebateAmount" label="Rebate Amount" />
          <GridItem colSpan={2}>
            <Alert status="warning">
              <Text fontWeight="Medium" fontSize="r1">
                If both rebate amount and rebate rate is filled, the total rebate is the total sum
                of the two.
              </Text>
            </Alert>
          </GridItem>
        </>
      )}
    </FormSection>
  );
};
