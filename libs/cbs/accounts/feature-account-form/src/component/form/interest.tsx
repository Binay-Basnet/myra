import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { InterestAuthority, useGetAccountOpenProductDetailsQuery } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormInput, FormRadioGroup } from '@coop/shared/form';
import { Alert, Box, Text } from '@myra-ui';
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
];
export const Interest = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const routerAction = router.query['action'];

  const [triggerQuery, setTriggerQuery] = useState(false);
  const { watch, setValue } = useFormContext();
  const products = watch('productId');

  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );

  const ProductData = poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;

  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);

  const interestAuth = watch('interestAuthority');

  const defaultRate = Number(ProductData?.interest?.defaultRate);
  // useEffect(() => {
  //   setValue('interestRate', valueInput);
  // }, [valueInput, setValue]);

  useEffect(() => {
    if (routerAction === 'add') {
      setValue('interestRate', defaultRate);
    }
  }, [defaultRate]);

  const maxValue =
    interestAuth === InterestAuthority.Board
      ? Number(ProductData?.interest?.boardAuthority) + Number(ProductData?.interest?.defaultRate)
      : Number(ProductData?.interest?.ceoAuthority) + Number(ProductData?.interest?.defaultRate);
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
              isDisabled={!interestAuth}
              rules={{
                max: {
                  value: maxValue,
                  message: 'Interest Rate is invalid',
                },
                min: {
                  value: defaultRate,
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

          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <FormRadioGroup name="interestAuthority" options={radioGroupdata} direction="row" />
          </Box>
          {interestAuth && (
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
