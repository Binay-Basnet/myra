import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';

import {
  Share_Transaction_Direction,
  useGetShareChargesQuery,
  useGetShareHistoryQuery,
} from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import { FormCheckbox, FormNumberInput } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type IReturnInfo = {
  totalAmount: number;
};

export const ShareReturnInfo = ({ totalAmount }: IReturnInfo) => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch, register, setValue } = methods;

  const memberId = watch('memberId');
  const noOfShares = watch('noOfReturnedShares');
  const allShares = watch('selectAllShares');

  const { data: shareHistoryTableData } = useGetShareHistoryQuery(
    {
      memberId,
    },
    {
      staleTime: 0,
    }
  );

  const balanceData = shareHistoryTableData?.share?.history?.balance;

  const { data: chargesData, refetch } = useGetShareChargesQuery({
    transactionType: Share_Transaction_Direction?.Return,
    shareCount: noOfShares,
  });

  const chargeList = chargesData?.share?.charges;

  const shareResult = () => {
    if (balanceData) {
      if (allShares) {
        return 0;
      }
      return Number(balanceData?.count) - Number(noOfShares);
    }
    return 0;
  };

  useEffect(() => {
    refetch();
  }, [noOfShares, refetch]);

  useDeepCompareEffect(() => {
    if (chargeList) {
      chargeList.forEach((charge, index) => {
        setValue(`extraFee.${index}.Id`, charge?.id);
        setValue(`extraFee.${index}.value`, Number(charge?.charge));
      });
    }
  }, [chargeList]);

  return (
    <Box display="flex" flexDirection="column" pb="28px" background="gray.0">
      <FormSection header="shareReturnShareInformation">
        <GridItem colSpan={3}>
          <FormNumberInput
            id="noOfShares"
            name="noOfReturnedShares"
            label={t['shareReturnNoOfShares']}
            isDisabled={allShares}
          />
        </GridItem>
        <GridItem colSpan={3}>
          <FormCheckbox name="selectAllShares" label={t['shareReturnSelectAllShares']} />
        </GridItem>

        {noOfShares ? (
          <GridItem colSpan={3}>
            <Box display="flex" borderRadius="br2" gap="s60" p="s16" bg="background.500">
              <Box>
                <Text fontWeight="Regular" fontSize="s2">
                  {t['shareReturnRemainingShare']}
                </Text>
                <Text fontWeight="SemiBold" fontSize="r1">
                  {shareResult()}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="Regular" fontSize="s2">
                  {t['shareReturnRemainingShareValue']}
                </Text>
                <Text fontWeight="SemiBold" fontSize="r1">
                  {shareResult() * 100}
                </Text>
              </Box>
            </Box>
          </GridItem>
        ) : null}

        {noOfShares ? (
          <GridItem colSpan={3}>
            <FieldCardComponents rows="repeat(4,1fr)">
              <GridItem display="flex" justifyContent="space-between" alignItems="center">
                <Text color="neutralLightColor.Gray-60" fontWeight="Medium" fontSize="s3">
                  {t['shareReturnWithdrawAmount']}
                </Text>

                <Text p="s12" color="neutralLightColor.Gray-80" fontWeight="SemiBold" fontSize="r1">
                  {amountConverter(noOfShares * 100)}
                </Text>
              </GridItem>

              {chargeList?.map((item, index) => {
                register(`extraFee.${index}.Id`, {
                  value: item?.id,
                });

                register(`extraFee.${index}.value`, {
                  value: item?.charge,
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
                      <FormNumberInput
                        name={`extraFee.${index}.value`}
                        defaultValue={Number(item?.charge)}
                      />
                    </Box>
                  </GridItem>
                );
              })}

              <GridItem display="flex" justifyContent="space-between" alignItems="center">
                <Text color="neutralLightColor.Gray-80" fontWeight="SemiBold" fontSize="s3">
                  {t['shareReturnTotalAmount']}
                </Text>

                <Text p="s12" color="neutralLightColor.Gray-80" fontWeight="SemiBold" fontSize="r1">
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
