import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, Box, Text } from '@myra-ui';

import { InterestAuthority, useGetAccountOpenProductDetailsQuery } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormInput, FormRadioGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

const radioGroupdata = [
  {
    label: 'Ceo Authority',
    value: InterestAuthority?.Ceo,
  },
  {
    label: 'Board Authority',
    value: InterestAuthority?.Board,
  },
  {
    label: 'Default',
    value: InterestAuthority?.Default,
  },
  {
    label: 'Update Interest',
    value: InterestAuthority?.UpdateInterest,
  },
];
export const Interest = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [triggerQuery, setTriggerQuery] = useState(false);
  const { watch, setValue, clearErrors } = useFormContext();
  const products = watch('productId');

  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );

  const ProductData = poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;
  const [maxValue, setMaxValue] = useState(Number(ProductData?.interest?.defaultRate));

  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);

  const interestAuth = watch('interestAuthority');

  const defaultRate = Number(ProductData?.interest?.defaultRate);

  const maxRate = Number(ProductData?.interest?.maxRate);
  // useEffect(() => {
  //   setValue('interestRate', valueInput);
  // }, [valueInput, setValue]);

  useEffect(() => {
    clearErrors();
    if (router.pathname.includes('add')) {
      setValue('interestRate', defaultRate);
    }
    if (interestAuth === InterestAuthority.Board) {
      setMaxValue(
        Number(ProductData?.interest?.boardAuthority) + Number(ProductData?.interest?.defaultRate)
      );
    }
    if (interestAuth === InterestAuthority?.Ceo) {
      setMaxValue(
        Number(ProductData?.interest?.ceoAuthority) + Number(ProductData?.interest?.defaultRate)
      );
    }
  }, [defaultRate, interestAuth, ProductData]);

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" w="100%" background="neutralColorLight.Gray-0">
        <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-60" mb="s16">
          {t['accInterest']}
        </Text>
        <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap="s16">
          <InputGroupContainer>
            <FormInput
              name="interestRate"
              type="number"
              label={t['accountOpenInterestRate']}
              textAlign="right"
              isDisabled={!interestAuth || interestAuth === 'Not Applicable'}
              rules={{
                max: {
                  value: maxValue,
                  message: 'Interest Rate is invalid',
                },
                min: {
                  value: interestAuth === InterestAuthority?.UpdateInterest ? maxRate : defaultRate,
                  message: 'Interest Rate is invalid',
                },
              }}
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
          </InputGroupContainer>

          <Box display="flex" flexDirection="row" justifyContent="space-between" gap="s24">
            <FormRadioGroup name="interestAuthority" options={radioGroupdata} direction="row" />
          </Box>

          {interestAuth !== InterestAuthority?.UpdateInterest &&
            interestAuth !== InterestAuthority?.Default && (
              <Box display="flex" flexDirection="column" gap="s8">
                <Text fontWeight="500" fontSize="s3">
                  {' '}
                  Authority Document
                </Text>

                <Box w="125px">
                  {' '}
                  <FormFileInput name="interestDoc" size="md" />{' '}
                </Box>
              </Box>
            )}
          <Alert status="info" title="Rates">
            <Box display="flex" flexDirection="column" gap="s4">
              <Text fontWeight="400" fontSize="r1">
                Interest Rate:{' '}
                <b>
                  {ProductData?.interest?.minRate} %- {ProductData?.interest?.maxRate} %{' '}
                </b>
              </Text>
              <Text fontWeight="400" fontSize="r1">
                Ceo Authority <b>{ProductData?.interest?.ceoAuthority} %</b>
              </Text>
              <Text fontWeight="400" fontSize="r1">
                Board Authority <b>{ProductData?.interest?.boardAuthority} %</b>
              </Text>
              {ProductData?.ladderRate && (
                <Box display="flex" flexDirection="row" gap="s4">
                  <Text fontWeight="400" fontSize="r1">
                    Ladder Rate:
                  </Text>
                  {ProductData?.ladderRateData?.map((item) => (
                    <Text fontWeight="400" fontSize="r1" key={`${item?.rate}${item?.type}`}>
                      <b>
                        {' '}
                        {item?.amount} and more : {item?.rate}%{' '}
                      </b>
                      |
                    </Text>
                  ))}
                </Box>
              )}
            </Box>{' '}
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};
