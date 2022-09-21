import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ServiceTypeFormState, useGetAccountOpenProductDetailsQuery } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const FeesAndCharge = () => {
  const { t } = useTranslation();

  const [productData, setProductData] = useState<ServiceTypeFormState[]>([]);

  const [triggerQuery, setTriggerQuery] = useState(false);
  const { watch, register, unregister } = useFormContext();
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
  const serviceCharge = watch('serviceCharge');

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
            ? [...previous, { amount: 0, serviceName: 'E-Banking' }]
            : [{ amount: 0, serviceName: 'E-Banking' }]
        );
      } else {
        const index = productData.findIndex((product) => product.serviceName === 'E-Banking');

        unregister(`serviceCharge.${index}.name`);
        unregister(`serviceCharge.${index}.amount`);

        setProductData((previous) =>
          previous.filter((product) => product.serviceName !== 'E-Banking')
        );
      }
    }
  }, [isEbankingEnabled]);

  useEffect(() => {
    if (productData && typeof isMobileBanking === 'boolean') {
      if (isMobileBanking) {
        setProductData((previous) =>
          previous
            ? [...previous, { amount: 0, serviceName: 'Mobile-Banking' }]
            : [{ amount: 0, serviceName: 'Mobile-Banking' }]
        );
      } else {
        const index = productData.findIndex((product) => product.serviceName === 'Mobile-Banking');

        unregister(`serviceCharge.${index}.name`);
        unregister(`serviceCharge.${index}.amount`);

        setProductData((previous) =>
          previous.filter((product) => product.serviceName !== 'Mobile-Banking')
        );
      }
    }
  }, [isMobileBanking]);

  useEffect(() => {
    if (productData && typeof isATMenabled === 'boolean') {
      if (isMobileBanking) {
        setProductData((previous) =>
          previous
            ? [...previous, { amount: 0, serviceName: 'ATM-Facility' }]
            : [{ amount: 0, serviceName: 'ATM-Facility' }]
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
  }, [isMobileBanking]);

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
          background="background.Medium"
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
                ? serviceCharge?.reduce((a, b) => a + Number(b.amount), 0)
                : productData?.reduce((a, b) => a + Number(b.amount), 0)}
            </Text>
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
