import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { IoInformationCircleOutline } from 'react-icons/io5';

import {
  NatureOfDepositProduct,
  useGetAccountOpenProductDetailsQuery,
} from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormCheckbox, FormInput } from '@coop/shared/form';
import { Box, Icon, Text, TextFields } from '@coop/shared/ui';
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
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <Box
        display="flex"
        flexDirection="column"
        w="100%"
        p="s20"
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
            <Box
              display="flex"
              gap="s12"
              px="s16"
              paddingTop="s16"
              bg="primary.0"
              borderRadius="br2"
            >
              <Icon
                as={IoInformationCircleOutline}
                color="neutralColorLight.Gray-80"
              />
              <Box display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column" gap="s8">
                  <TextFields
                    fontSize="s3"
                    fontWeight="SemiBold"
                    color="neutralColorLight.Gray-80"
                  >
                    {t['accountOpenInterestRate']}
                  </TextFields>
                  <Box display="flex" flexDirection="column">
                    <TextFields
                      fontSize="s3"
                      fontWeight="Regular"
                      color="neutralColorLight.Gray-80"
                    >
                      Minimum Interest Rate:{' '}
                      <b>{ProductData?.interest?.minRate}</b>
                      <TextFields
                        fontSize="s3"
                        fontWeight="Regular"
                        color="neutralColorLight.Gray-80"
                        mb="s16"
                      >
                        Maximum Interest Rate:{' '}
                        <b>{ProductData?.interest?.maxRate}</b>
                      </TextFields>
                    </TextFields>
                  </Box>
                </Box>
                {ProductData?.ladderRate && (
                  <Box display="flex" flexDirection="column" gap="s8">
                    <TextFields
                      fontSize="s3"
                      fontWeight="SemiBold"
                      color="neutralColorLight.Gray-80"
                    >
                      {t['accoutnOpenLadderRateInfo']}
                    </TextFields>

                    <Box display="flex" flexDirection="column">
                      {ProductData?.ladderRateData?.map((data) => (
                        <TextFields
                          fontSize="s3"
                          fontWeight="Regular"
                          color="neutralColorLight.Gray-80"
                          key={data?.type}
                        >
                          For More than <b>{data?.amount}</b> Ladder Rate is
                          {data?.rate}
                        </TextFields>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </GroupContainer>
  );
};
