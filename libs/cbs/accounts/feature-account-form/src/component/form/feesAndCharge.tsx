import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import {
  DepositLoanAccountInput,
  useGetAccountOpenProductDetailsQuery,
} from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IFeesAndCharge {
  setTotalCharge: Dispatch<SetStateAction<number>>;
}

export const FeesAndCharge = ({ setTotalCharge }: IFeesAndCharge) => {
  const { t } = useTranslation();

  const [triggerQuery, setTriggerQuery] = useState(false);
  const { watch, control, resetField } = useFormContext<DepositLoanAccountInput>();

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'serviceCharge',
  });

  const products = watch('productId');
  const { data } = useGetAccountOpenProductDetailsQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );

  const isEbankingEnabled = watch('eBanking');
  const isMobileBankingEnabled = watch('mobileBanking');
  const isATMenabled = watch('atmFacility');
  const isSmsBankingEnabled = watch('smsBanking');
  const serviceCharge = watch('serviceCharge');
  const isChequeEnabled = watch('chequeFacility');

  const altCharges =
    data?.settings?.general?.depositProduct?.formState?.data?.alternativeChannelCharge;
  const chequeCharge = data?.settings?.general?.depositProduct?.formState?.data?.chequeCharge;
  const aTMCharge = data?.settings?.general?.depositProduct?.formState?.data?.atmCharge;
  const extraCharge = data?.settings?.general?.depositProduct?.formState?.data?.serviceCharge;

  const chargeChecks = [
    ...(extraCharge?.map((charge) => ({
      name: charge?.serviceName,
      amount: charge?.amount,
      isEnabled: true,
      shouldFocus: false,
    })) ?? []),

    {
      name: 'Mobile Banking',
      amount: altCharges?.find((d) => d?.serviceName === 'Mobile Banking')?.amount,
      isEnabled: isMobileBankingEnabled || false,
      shouldFocus: true,
    },
    {
      name: 'Ebanking',
      amount: altCharges?.find((d) => d?.serviceName === 'Ebanking')?.amount,
      isEnabled: isEbankingEnabled || false,
      shouldFocus: true,
    },
    {
      name: 'Sms banking',
      amount: altCharges?.find((d) => d?.serviceName === 'Sms banking')?.amount,
      isEnabled: isSmsBankingEnabled || false,
      shouldFocus: true,
    },
    {
      name: 'Cheque issue charge',
      amount: chequeCharge?.find((d) => d?.serviceName === 'Cheque issue charge')?.amount,
      isEnabled: isChequeEnabled || false,
      shouldFocus: true,
    },
    {
      name: 'Atm charge',
      amount: aTMCharge?.find((d) => d?.serviceName === 'Atm charge')?.amount,
      isEnabled: isATMenabled || false,
      shouldFocus: true,
    },
  ];

  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
      resetField('serviceCharge');
    }
  }, [products]);

  const checkArray = chargeChecks.map((check) => check.isEnabled);

  useEffect(() => {
    chargeChecks.forEach((charge) => {
      const alreadyExists = fields?.find((f) => f?.name === charge.name);
      if (alreadyExists && charge.isEnabled) return;
      if (charge.isEnabled) {
        append(
          { name: charge.name, amount: charge.amount },
          {
            shouldFocus: charge.shouldFocus,
          }
        );
      } else {
        const index = fields?.findIndex((f) => f?.name === charge.name);
        if (index !== -1) {
          remove(index);
        }
      }
    });
  }, [JSON.stringify(checkArray)]);

  useEffect(() => {
    setTotalCharge(serviceCharge?.reduce((a, b) => a + Number(b?.amount), 0) ?? 0);
  }, [JSON.stringify(serviceCharge)]);

  return (
    <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
      <Box background="neutralColorLight.Gray-0">
        <Box mb="s16">
          <Text fontSize="r1" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            {t['accFeesChargesSummary']}
          </Text>
          <Text fontSize="s2" color="neutralColorLight.Gray-80" fontWeight="Regular">
            {t['accAllchargesandfees']}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          background="border.layout"
          borderRadius="br2"
          p="s16"
        >
          {fields?.map((val, index) => (
            <Box
              key={val.id}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              py="s16"
            >
              <Box>
                <Text fontSize="s3" fontWeight="Medium">
                  {val?.name}
                </Text>
              </Box>
              <Box w="300px">
                <FormInput textAlign="right" name={`serviceCharge.${index}.amount`} type="number" />
              </Box>
            </Box>
          ))}
          <Box display="flex" flexDirection="row" justifyContent="space-between" py="s16">
            <Text fontSize="s3" fontWeight="600">
              Total Amount
            </Text>

            <Text fontSize="s3" fontWeight="600">
              {serviceCharge?.reduce((a, b) => a + Number(b?.amount), 0)}
            </Text>
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
