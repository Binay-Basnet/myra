import { useFormContext } from 'react-hook-form';

import {
  Frequency,
  NatureOfDepositProduct,
  PenaltyRateType,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
  TopText,
} from '../formui';

export const DepositFrequency = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const penalty = watch('penalty');
  const rebate = watch('rebate');
  const penaltyType = watch('penaltyData.rateType');
  const depositNature = watch('nature');

  const DepositFrequencyOptions = [
    {
      label: t['daily'],
      value: Frequency.Daily,
    },
    {
      label: t['weekly'],
      value: Frequency.Weekly,
    },
    {
      label: t['monthly'],
      value: Frequency.Monthly,
    },
    {
      label: t['yearly'],
      value: Frequency.Yearly,
    },
  ];

  const enableSwitch = [
    {
      label: t['enable'],
      value: true,
    },
    {
      label: t['disable'],
      value: false,
    },
  ];

  const penaltyTypeList = [
    {
      label: t['depositProductFlatRate'],
      value: PenaltyRateType.FlatRate,
    },
    {
      label: t['depositProductRelativeRate'],
      value: PenaltyRateType.RelativeRate,
    },
  ];

  return (
    <BoxContainer>
      {depositNature === NatureOfDepositProduct.RecurringSaving && (
        <>
          <TextBoxContainer>
            <TopText>{t['depositProductDepositAmountLimit']} </TopText>
          </TextBoxContainer>
          <InputGroupContainer>
            <FormInput
              name="depositAmount.minAmount"
              label={t['depositProductMinimumAmount']}
            />
            <FormInput
              name="depositAmount.maxAmount"
              label={t['depositProductMaximumAmount']}
            />
          </InputGroupContainer>
        </>
      )}

      <TextBoxContainer>
        <TopText> {t['depositProductDepositFrequency']} </TopText>
        <SubText>{t['depositProductSelectdepositfrequency']}</SubText>
      </TextBoxContainer>
      <FormSwitchTab
        defaultValue={Frequency.Daily}
        name={'depositFrequency'}
        options={DepositFrequencyOptions}
      />
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['depositProductpenalty']} </SubHeadingText>
          <SubText>{t['depositProductEnterPenaltydetails']} </SubText>
        </TextBoxContainer>
        <FormSwitchTab
          name="penalty"
          defaultValue={'false'}
          options={enableSwitch}
        />
      </Box>
      {penalty && (
        <BoxContainer
          p="s16"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem>
              <FormInput
                name="penaltyData.dayAfterInstallmentDate"
                type="number"
                label={t['depositProductDayaftertheinstallmentdate']}
              />
            </GridItem>
            <GridItem>
              <FormSwitchTab
                name="penaltyData.rateType"
                options={penaltyTypeList}
                label={t['depositProductPenaltyType']}
              />
            </GridItem>
          </Grid>
          <InputGroupContainer>
            {penaltyType === PenaltyRateType.FlatRate && (
              <FormInput
                name="penaltyData.flatRatePenalty"
                type="number"
                label={t['depositProductFlatratePenalty']}
                textAlign={'right'}
                placeholder="0.00"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            )}
            {penaltyType === PenaltyRateType.RelativeRate && (
              <FormInput
                name="penaltyData.penaltyRate"
                type="number"
                label={t['depositProductPenalty']}
                textAlign={'right'}
                placeholder="0.00"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            )}

            {penaltyType === PenaltyRateType.RelativeRate && (
              <FormInput
                name="penaltyData.penaltyAmount"
                type="number"
                label={t['depositProductPenaltyAmount']}
              />
            )}
          </InputGroupContainer>
        </BoxContainer>
      )}
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['depositProductRebate']} </SubHeadingText>
          <SubText>{t['depositProductEnterRebatedetails']} </SubText>
        </TextBoxContainer>
        <FormSwitchTab
          name={'rebate'}
          options={enableSwitch}
          defaultValue={'false'}
        />
      </Box>
      {rebate && (
        <BoxContainer
          p="s16"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem>
              <FormInput
                name="rebateData.daysBeforeInstallmentDate"
                type="number"
                label={t['depositProductDayaftertheinstallmentdate']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                name="rebateData.noOfInstallment"
                type="number"
                label={t['depositProductNoInstallment']}
                placeholder="0"
                helperText={t['depositProductEnterNumberInstallments']}
                textAlign={'right'}
              />
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem>
              <FormInput
                name="rebateData.rebateAmount"
                type="number"
                label={t['depositProductRebateAmount']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                name="rebateData.percentage"
                type="number"
                label={t['depositProductPercentageDepositedAmount']}
                textAlign={'right'}
                placeholder="0.00"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </GridItem>
          </Grid>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
