import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  Share_Transaction_Direction,
  useGetShareChargesQuery,
  useGetShareHistoryQuery,
} from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import { FormNumberInput } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { amountConverter, useTranslation } from '@coop/shared/utils';

const SharePurchaseInfo = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch } = methods;

  const noOfShares = watch('shareCount');
  const printingFee = watch('printingFee');
  const adminFee = watch('adminFee');
  const memberId = watch('memberId');

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
    transactionType: Share_Transaction_Direction?.Purchase,
    shareCount: balanceData?.count as number,
  });

  const chargeList = chargesData?.share?.charges;

  useEffect(() => {
    setTotalAmount(
      noOfShares * 100 + Number(adminFee ?? 0) + Number(printingFee ?? 0)
    );
  }, [noOfShares, adminFee, printingFee]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      pb="s24"
      background="white"
      borderTopRadius={5}
    >
      <FormSection header="sharePurchaseShareInformation">
        <GridItem colSpan={3}>
          <FormNumberInput
            id="noOfShares"
            name="shareCount"
            label={t['sharePurchaseNoOfShares']}
          />
        </GridItem>

        <GridItem colSpan={3}>
          {noOfShares ? (
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
                  {t['sharePurchaseShareAmount']}
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
                      defaultValue={item?.charge}
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
                  <FormNumberInput bg="gray.0" name="adminFee" />
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
                  <FormNumberInput bg="gray.0" name="printingFee" />
                </Box>
              </GridItem>
              <GridItem
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text
                  color="neutralLightColor.Gray-80"
                  fontWeight="SemiBold"
                  fontSize="s3"
                >
                  {t['sharePurchaseTotalAmount']}
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
          ) : null}
        </GridItem>
      </FormSection>
    </Box>
  );
};

export default SharePurchaseInfo;
