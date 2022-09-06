import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Share_Transaction_Direction,
  useGetShareChargesQuery,
  useGetShareHistoryQuery,
} from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import { FormCheckbox, FormInput, FormNumberInput } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { amountConverter, useTranslation } from '@coop/shared/utils';

const ShareReturnInfo = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch, getValues, reset } = methods;

  const memberId = watch('memberId');
  const noOfShares = watch('noOfReturnedShares');
  const allShares = watch('selectAllShares');
  const printingFees = watch('printingFee');
  const adminFees = watch('adminFee');

  const [totalAmount, setTotalAmount] = useState(0);

  const { data: shareHistoryTableData } = useGetShareHistoryQuery(
    {
      memberId,
    },
    {
      staleTime: 0,
    }
  );

  const balanceData = shareHistoryTableData?.share?.history?.balance;

  const { data: chargesData } = useGetShareChargesQuery({
    transactionType: Share_Transaction_Direction?.Return,
    shareCount: balanceData?.count as number,
  });

  const chargeList = chargesData?.share?.charges;

  useEffect(() => {
    setTotalAmount(
      noOfShares * 100 - (Number(adminFees ?? 0) + Number(printingFees ?? 0))
    );
  }, [noOfShares, adminFees, printingFees]);

  useEffect(() => {
    if (balanceData) {
      if (allShares) {
        reset({
          ...getValues(),
          noOfReturnedShares: balanceData?.count ?? null,
        });
      } else {
        reset({
          ...getValues(),
          noOfReturnedShares: null,
        });
      }
    }
  }, [allShares, balanceData, getValues, reset]);

  return (
    <Box display="flex" flexDirection="column" pb="28px" background="gray.0">
      <FormSection header="shareReturnShareInformation">
        <GridItem colSpan={3}>
          <FormInput
            type="text"
            textAlign="right"
            id="noOfShares"
            name="noOfReturnedShares"
            label={t['shareReturnNoOfShares']}
            isDisabled={allShares}
          />
        </GridItem>
        <GridItem colSpan={3}>
          <FormCheckbox
            name="selectAllShares"
            label={t['shareReturnSelectAllShares']}
          />
        </GridItem>

        {noOfShares ? (
          <GridItem colSpan={3}>
            <Box
              display="flex"
              borderRadius="br2"
              gap="s60"
              p="s16"
              bg="background.500"
            >
              <Box>
                <Text fontWeight="400" fontSize="s2">
                  {t['shareReturnRemainingShare']}
                </Text>
                <Text fontWeight="600" fontSize="r1">
                  {balanceData
                    ? allShares
                      ? 0
                      : Number(balanceData?.count) - Number(noOfShares)
                    : 0}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="400" fontSize="s2">
                  {t['shareReturnRemainingShareValue']}
                </Text>
                <Text fontWeight="600" fontSize="r1">
                  {balanceData
                    ? allShares
                      ? 0
                      : (Number(balanceData?.count) - Number(noOfShares)) * 100
                    : 0}
                </Text>
              </Box>
            </Box>
          </GridItem>
        ) : null}

        {noOfShares ? (
          <GridItem colSpan={3}>
            <FieldCardComponents rows={'repeat(4,1fr)'}>
              <GridItem
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  color="neutralLightColor.Gray-60"
                  fontWeight="Medium"
                  fontSize="s3"
                >
                  {t['shareReturnWithdrawAmount']}
                </Text>

                <Text
                  p="s12"
                  color="neutralLightColor.Gray-80"
                  fontWeight="SemiBold"
                  fontSize="r1"
                >
                  {amountConverter(noOfShares * 100)}
                </Text>
              </GridItem>

              {chargeList?.map((item) => (
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
                    <FormNumberInput
                      name="adminFee"
                      bg="gray.0"
                      // defaultValue={item?.charge}
                    />
                  </Box>
                </GridItem>
              ))}

              <GridItem display="flex" justifyContent="space-between">
                <Text
                  color="neutralLightColor.Gray-60"
                  fontWeight="Medium"
                  fontSize="s3"
                  display="flex"
                  alignItems="center"
                >
                  {t['sharePurchaseAdministrationFees']}
                </Text>
                <Box width="300px">
                  <FormNumberInput name="adminFee" bg="gray.0" />
                </Box>
              </GridItem>

              <GridItem
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  color="neutralLightColor.Gray-60"
                  fontWeight="Medium"
                  fontSize="s3"
                >
                  {t['sharePurchasePrintingFees']}
                </Text>
                <Box width="300px">
                  <FormNumberInput name="printingFee" bg="gray.0" />
                </Box>
              </GridItem>

              <GridItem
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  color="neutralLightColor.Gray-80"
                  fontWeight="600"
                  fontSize="s3"
                >
                  {t['shareReturnTotalAmount']}
                </Text>

                <Text
                  p="s12"
                  color="neutralLightColor.Gray-80"
                  fontWeight="SemiBold"
                  fontSize="r1"
                >
                  {t['rs']} {amountConverter(totalAmount)}
                </Text>
              </GridItem>
            </FieldCardComponents>
          </GridItem>
        ) : null}
      </FormSection>
    </Box>
  );
};

export default ShareReturnInfo;
