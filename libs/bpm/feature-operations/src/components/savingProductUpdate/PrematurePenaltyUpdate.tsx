import { useFormContext } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import { Alert, Box, FormSection, Text } from '@myra-ui';

import { PrematurePenaltyDateType, useGetSavingsProductDetailQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormNumberInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
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

const penaltyDataType = [
  {
    label: 'Effective Days From Start',
    value: PrematurePenaltyDateType.EffectiveDaysFromStart,
  },
  {
    label: 'Remaining Days to Get Matured',
    value: PrematurePenaltyDateType.RemainingDaysToGetMatured,
  },
];

export const PrematurePenaltyUpdate = () => {
  const methods = useFormContext();
  const productId = methods.watch('productId');
  const prematurePenaltyEnable = methods.watch('prematurePenalty.allowPenalty');

  const { data } = useGetSavingsProductDetailQuery({ id: productId as string });
  const detailData = data?.settings?.general?.depositProduct?.depositProductDetail?.data;

  return (
    <FormSection templateColumns={2} header="Premature Penalty Update">
      <GridItem colSpan={2}>
        <Alert title="Existing Details" status="info" hideCloseIcon>
          <Box display="flex" flexDir="column">
            <ul>
              <li>
                <Text fontSize="s3" display="flex" gap="s4">
                  Penalty Date Type:{' '}
                  {detailData?.prematurePenalty?.penaltyDateType ? (
                    <Text textTransform="capitalize">
                      {detailData?.prematurePenalty?.penaltyDateType
                        ?.replace(/_/g, ' ')
                        ?.toLowerCase()}
                    </Text>
                  ) : (
                    'N/A'
                  )}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  No of Days: {`${detailData?.prematurePenalty?.noOfDays} days`}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  Penalty Amount:{' '}
                  {`${amountConverter(detailData?.prematurePenalty?.penaltyAmount)}`}
                </Text>
              </li>
              <li>
                <Text fontSize="s3">
                  Penalty Rate: {`${detailData?.prematurePenalty?.penaltyRate}`}
                </Text>
              </li>
            </ul>
          </Box>
        </Alert>
      </GridItem>
      <GridItem colSpan={2} pt="s16">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Text fontSize="s3" fontWeight="500" color="gray.700">
            Premature Penalty
          </Text>
          <FormSwitchTab name="prematurePenalty.allowPenalty" options={enableSwitch} />
        </Box>
      </GridItem>
      {prematurePenaltyEnable && (
        <>
          {' '}
          <FormSelect
            name="prematurePenalty.payload.penaltyDateType"
            label="Penalty Date Type"
            options={penaltyDataType}
          />
          <FormNumberInput name="prematurePenalty.payload.noOfDays" label="Number Of Days" />
          <FormNumberInput
            isRequired
            name="prematurePenalty.payload.penaltyRate"
            label="Penalty Rate"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
            textAlign="right"
          />
          <FormAmountInput name="prematurePenalty.payload.penaltyAmount" label="Penalty Amount" />
          <GridItem colSpan={2}>
            <Alert status="warning" hideCloseIcon>
              <Text fontWeight="Medium" fontSize="r1">
                If both penalty amount and penalty rate is filled, the total penalty is the total
                sum of the two.
              </Text>
            </Alert>
          </GridItem>
        </>
      )}
    </FormSection>
  );
};
