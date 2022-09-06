import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useGetAccountOpenProductDetailsQuery } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const FeesAndCharge = () => {
  const { t } = useTranslation();
  const [triggerQuery, setTriggerQuery] = useState(false);
  const { watch } = useFormContext();
  const products = watch('productId');
  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );

  const ProductData =
    poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;

  const ProductDatalist = ProductData?.serviceCharge;
  let sum = 0;
  ProductDatalist?.map((tot) => {
    return (sum = Number(sum) + Number(tot?.amount));
  });

  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);
  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <Box p="s20" background="neutralColorLight.Gray-0">
        <Box mb="s16">
          <Text
            fontSize="r1"
            color="neutralColorLight.Gray-80"
            fontWeight="SemiBold"
          >
            {t['accFeesChargesSummary']}
          </Text>
          <Text
            fontSize="s2"
            color="neutralColorLight.Gray-80"
            fontWeight="Regular"
          >
            {t['accAllchargesandfees']}
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection={'column'}
          background="background.500"
          borderRadius={'br2'}
          p="s16"
        >
          {ProductDatalist?.map((data) => {
            return (
              <Box
                key={`${data?.ledgerName}${data?.serviceName}`}
                display="flex"
                flexDirection={'row'}
                justifyContent="space-between"
                py="s16"
              >
                <Text fontSize={'s3'} fontWeight="500">
                  {data?.serviceName}
                </Text>

                <Text fontSize={'s3'} fontWeight="500">
                  {data?.amount}
                </Text>
              </Box>
            );
          })}
          <Box
            display="flex"
            flexDirection={'row'}
            justifyContent="space-between"
            py="s16"
          >
            <Text fontSize={'s3'} fontWeight="600">
              Total Amount
            </Text>

            <Text fontSize={'s3'} fontWeight="600">
              {sum}
            </Text>
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
