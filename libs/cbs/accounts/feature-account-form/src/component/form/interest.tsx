import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  NatureOfDepositProduct,
  useGetAccountOpenProductDetailsQuery,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormCheckbox, FormInput } from '@coop/shared/form';
import { Alert, Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const Interest = () => {
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

  const ProductType = ProductData?.nature;

  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);

  const ceoInterest = watch('ceoAuthority');
  const BoardInterest = watch('boardAuthority');

  const valueInput =
    Number(ProductData?.interest?.defaultRate) +
    (ceoInterest ? Number(ProductData?.interest?.ceoAuthority) : 0) +
    (BoardInterest ? Number(ProductData?.interest?.boardAuthority) : 0);
  return (
    <Box display="flex" flexDirection={'column'} gap="s16">
      <Box
        display="flex"
        flexDirection="column"
        w="100%"
        background="neutralColorLight.Gray-0"
      >
        <Text
          fontSize="r1"
          fontWeight="SemiBold"
          color="neutralColorLight.Gray-60"
          mb="s16"
        >
          {t['accInterest']}
        </Text>
        <Box display="grid" gridTemplateColumns="repeat(1, 1fr)" gap="s16">
          <InputGroupContainer>
            <FormInput
              name="interestRate"
              type="number"
              label={t['accountOpenInterestRate']}
              textAlign={'right'}
              isDisabled={true}
              value={valueInput}
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
          </InputGroupContainer>
          <InputGroupContainer>
            <Box
              display={'flex'}
              flexDirection="row"
              justifyContent={'space-between'}
            >
              <FormCheckbox
                name="ceoAuthority"
                label={t['accountOpenCEOAuthority']}
              />
              <FormCheckbox
                name="boardAuthority"
                label={t['accountOpenBoardAuthority']}
              />
            </Box>
          </InputGroupContainer>
          {ProductType === NatureOfDepositProduct.RecurringSaving && (
            <Alert status="info" title="Rates">
              <Box display={'flex'} flexDirection="column" gap="s4">
                <Text fontWeight={'400'} fontSize="r1">
                  Interest Rate: {ProductData?.interest?.minRate} -{' '}
                  {ProductData?.interest?.maxRate}
                </Text>
              </Box>{' '}
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};
