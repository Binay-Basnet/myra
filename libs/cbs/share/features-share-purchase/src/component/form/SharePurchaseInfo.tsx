import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';

import { Box, FormSection, GridItem, Text } from '@myra-ui';

import {
  Share_Transaction_Direction,
  useGetSettingsShareGeneralDataQuery,
  useGetShareChargesQuery,
} from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import { FormNumberInput } from '@coop/shared/form';
import {
  amountConverter,
  amountToWordsConverter,
  useDebounce,
  useTranslation,
} from '@coop/shared/utils';

type IPurchaseInfo = {
  totalAmount: number;
};

export const SharePurchaseInfo = ({ totalAmount }: IPurchaseInfo) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch, register, setValue, resetField } = methods;

  const noOfShares = watch('shareCount');

  const { data: shareData } = useGetSettingsShareGeneralDataQuery();

  const { data: chargesData } = useGetShareChargesQuery(
    {
      transactionType: Share_Transaction_Direction?.Purchase,
      shareCount: useDebounce(noOfShares, 800),
    },
    { enabled: !!noOfShares }
  );

  const chargeList = chargesData?.share?.charges;

  // useEffect(() => {
  //   refetch();
  // }, [noOfShares, refetch]);

  useDeepCompareEffect(() => {
    if (chargeList) {
      resetField('extraFee');
      chargeList.forEach((charge, index) => {
        setValue(`extraFee.${index}.Id`, charge?.id);
        setValue(`extraFee.${index}.name`, charge?.name);
        setValue(`extraFee.${index}.value`, charge?.charge);
      });
    }
  }, [noOfShares, chargeList]);

  const multiplicityFactor = shareData?.settings?.general?.share?.general?.multiplicityFactor;

  return (
    <Box display="flex" flexDirection="column" pb="s24" background="white" borderTopRadius={5}>
      <FormSection header="sharePurchaseShareInformation">
        <GridItem colSpan={3}>
          <FormNumberInput
            isRequired
            step={Number(multiplicityFactor)}
            id="noOfShares"
            name="shareCount"
            label={t['sharePurchaseNoOfShares']}
            rules={{
              validate: (value) =>
                Number(value) % Number(multiplicityFactor) === 0 ||
                `Number Of Share Should be multiple of ${multiplicityFactor ?? 10}`,
            }}
          />
        </GridItem>

        <GridItem colSpan={3}>
          {noOfShares ? (
            <FieldCardComponents rows="repeat(4,1fr)">
              <GridItem display="flex" justifyContent="space-between" alignItems="center">
                <Text color="neutralLightColor.Gray-60" fontWeight="Medium" fontSize="s3">
                  {t['sharePurchaseShareAmount']}
                </Text>

                <Text p="s12" color="neutralLightColor.Gray-80" fontWeight="SemiBold" fontSize="r1">
                  {amountConverter(noOfShares * 100)}
                </Text>
              </GridItem>
              {chargeList &&
                chargeList?.map((item, index) => {
                  register(`extraFee.${index}.Id`, {
                    value: item?.id,
                  });
                  register(`extraFee.${index}.name`, {
                    value: item?.name,
                  });
                  register(`extraFee.${index}.value`, {
                    value: Number(item?.charge),
                  });

                  return (
                    <GridItem display="flex" justifyContent="space-between">
                      <Text
                        color="neutralLightColor.Gray-60"
                        fontWeight="Medium"
                        fontSize="s3"
                        display="flex"
                        alignItems="center"
                      >
                        {item?.name}
                      </Text>
                      <Box width="300px">
                        <FormNumberInput name={`extraFee.${index}.value`} />
                      </Box>
                    </GridItem>
                  );
                })}

              <GridItem display="flex" justifyContent="space-between">
                <Text color="neutralLightColor.Gray-80" fontWeight="SemiBold" fontSize="s3">
                  {t['sharePurchaseTotalAmount']}
                </Text>

                <Box display="flex" flexDirection="column" gap="s8">
                  <Text
                    p="s12"
                    color="neutralLightColor.Gray-80"
                    fontWeight="SemiBold"
                    fontSize="r1"
                    textAlign="right"
                  >
                    {t['rs']} {amountConverter(totalAmount)}
                  </Text>
                  <Text p="s12" color="neutralLightColor.Gray-80" fontSize="r1" fontStyle="italic">
                    {amountToWordsConverter(totalAmount)}
                  </Text>
                </Box>
              </GridItem>
            </FieldCardComponents>
          ) : null}
        </GridItem>
      </FormSection>
    </Box>
  );
};
