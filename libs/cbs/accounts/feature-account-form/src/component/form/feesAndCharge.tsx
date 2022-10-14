import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  DepositLoanAccountInput,
  ServiceTypeFormState,
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

  const [productData, setProductData] = useState<ServiceTypeFormState[]>([]);

  const [triggerQuery, setTriggerQuery] = useState(false);
  const { watch, register, unregister } = useFormContext<DepositLoanAccountInput>();
  const products = watch('productId');
  const { data, isLoading } = useGetAccountOpenProductDetailsQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );

  // const ProductData =
  //   poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;

  // const ProductDatalist = ProductData?.serviceCharge;
  // let sum = 0;
  // ProductDatalist?.map((tot) => {
  //   return (sum = Number(sum) + Number(tot?.amount));
  // });

  const isEbankingEnabled = watch('eBanking');
  const isMobileBanking = watch('mobileBanking');
  const isATMenabled = watch('atmFacility');
  const isSmsBanking = watch('smsBanking');
  const serviceCharge = watch('serviceCharge');
  const isChequeEnabled = watch('chequeFacility');
  const altCharges =
    data?.settings?.general?.depositProduct?.formState?.data?.alternativeChannelCharge;
  const chequeCharge = data?.settings?.general?.depositProduct?.formState?.data?.chequeCharge;
  const aTMCharge = data?.settings?.general?.depositProduct?.formState?.data?.atmCharge;

  const mobileBankingCharges = altCharges?.find((d) => d?.serviceName === 'Mobile Banking');
  const ebankingCharges = altCharges?.find((d) => d?.serviceName === 'Ebanking');
  const smsCharges = altCharges?.find((d) => d?.serviceName === 'Sms banking');
  const chequeObject = chequeCharge?.find((d) => d?.serviceName === 'Cheque issue charge');
  const atmObject = aTMCharge?.find((d) => d?.serviceName === 'Atm charge');
  const ebankingAmount = ebankingCharges?.amount;
  // const ebankingLedger = ebankingCharges?.ledgerName;
  const mobileBankingAmount = mobileBankingCharges?.amount;
  // const mobileBankingLedger = mobileBankingCharges?.ledgerName;
  const smsBankingAmount = smsCharges?.amount;
  const atmAmount = atmObject?.amount;
  const chequeAmont = chequeObject?.amount;
  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);

  useEffect(() => {
    const firstArray =
      (data?.settings.general?.depositProduct?.formState?.data
        ?.serviceCharge as ServiceTypeFormState[]) ?? [];

    setProductData([...firstArray]);
  }, [isLoading]);

  useEffect(() => {
    if (productData && typeof isEbankingEnabled === 'boolean') {
      if (isEbankingEnabled) {
        setProductData((previous) =>
          previous
            ? [...previous, { amount: ebankingAmount, serviceName: 'Ebanking' }]
            : [{ amount: ebankingAmount, serviceName: 'Ebanking' }]
        );
      } else {
        const index = productData.findIndex((product) => product.serviceName === 'Ebanking');

        unregister(`serviceCharge.${index}.name`);
        unregister(`serviceCharge.${index}.amount`);

        setProductData((previous) =>
          previous.filter((product) => product.serviceName !== 'Ebanking')
        );
      }
    }
  }, [isEbankingEnabled]);

  useEffect(() => {
    if (productData && typeof isMobileBanking === 'boolean') {
      if (isMobileBanking) {
        setProductData((previous) =>
          previous
            ? [...previous, { amount: mobileBankingAmount, serviceName: 'Mobile Banking' }]
            : [{ amount: mobileBankingAmount, serviceName: 'Mobile Banking' }]
        );
      } else {
        const index = productData.findIndex((product) => product.serviceName === 'Mobile Banking');

        unregister(`serviceCharge.${index}.name`);
        unregister(`serviceCharge.${index}.amount`);

        setProductData((previous) =>
          previous.filter((product) => product.serviceName !== 'Mobile Banking')
        );
      }
    }
  }, [isMobileBanking]);

  useEffect(() => {
    if (productData && typeof isATMenabled === 'boolean') {
      if (isATMenabled) {
        setProductData((previous) =>
          previous
            ? [...previous, { amount: atmAmount, serviceName: 'ATM-Facility' }]
            : [{ amount: atmAmount, serviceName: 'ATM-Facility' }]
        );
      } else {
        const index = productData.findIndex((product) => product.serviceName === 'ATM-Facility');

        unregister(`serviceCharge.${index}.name`);
        unregister(`serviceCharge.${index}.amount`);

        setProductData((previous) =>
          previous.filter((product) => product.serviceName !== 'ATM-Facility')
        );
      }
    }
  }, [isATMenabled]);
  useEffect(() => {
    if (productData && typeof isChequeEnabled === 'boolean') {
      if (isChequeEnabled) {
        setProductData((previous) =>
          previous
            ? [...previous, { amount: chequeAmont, serviceName: 'Cheque issue charge' }]
            : [{ amount: chequeAmont, serviceName: 'Cheque issue charge' }]
        );
      } else {
        const index = productData.findIndex(
          (product) => product.serviceName === 'Cheque issue charge'
        );

        unregister(`serviceCharge.${index}.name`);
        unregister(`serviceCharge.${index}.amount`);

        setProductData((previous) =>
          previous.filter((product) => product.serviceName !== 'Cheque issue charge')
        );
      }
    }
  }, [isChequeEnabled]);
  useEffect(() => {
    if (productData && typeof isSmsBanking === 'boolean') {
      if (isSmsBanking) {
        setProductData((previous) =>
          previous
            ? [...previous, { amount: smsBankingAmount, serviceName: 'Sms banking' }]
            : [{ amount: smsBankingAmount, serviceName: 'Sms banking' }]
        );
      } else {
        const index = productData.findIndex((product) => product.serviceName === 'Sms banking');

        unregister(`serviceCharge.${index}.name`);
        unregister(`serviceCharge.${index}.amount`);

        setProductData((previous) =>
          previous.filter((product) => product.serviceName !== 'Sms banking')
        );
      }
    }
  }, [isSmsBanking]);

  useEffect(() => {
    setTotalCharge(
      serviceCharge
        ? serviceCharge?.reduce((a, b) => a + Number(b?.amount), 0)
        : productData?.reduce((a, b) => a + Number(b.amount), 0)
    );
  }, [JSON.stringify(serviceCharge), JSON.stringify(productData)]);

  return (
    <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
      <Box p="s20" background="neutralColorLight.Gray-0">
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
          {productData?.map((val, index) => {
            register(`serviceCharge.${index}.name`, {
              value: val?.serviceName,
            });

            register(`serviceCharge.${index}.amount`, {
              value: val?.amount,
            });

            // register(`serviceCharge.${index}.ledgerCode`, {
            //   value: data?.ledgerName,
            // });

            return (
              <Box
                key={`${val?.ledgerName}${val?.serviceName}`}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                py="s16"
              >
                <Box>
                  <Text fontSize="s3" fontWeight="Medium">
                    {val?.serviceName}
                  </Text>
                </Box>
                <Box w="300px">
                  <FormInput
                    textAlign="right"
                    name={`serviceCharge.${index}.amount`}
                    defaultValue={val?.amount}
                    type="number"
                  />
                </Box>
              </Box>
            );
          })}
          <Box display="flex" flexDirection="row" justifyContent="space-between" py="s16">
            <Text fontSize="s3" fontWeight="600">
              Total Amount
            </Text>

            <Text fontSize="s3" fontWeight="600">
              {serviceCharge
                ? serviceCharge?.reduce((a, b) => a + Number(b?.amount), 0)
                : productData?.reduce((a, b) => a + Number(b.amount), 0)}
            </Text>
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
