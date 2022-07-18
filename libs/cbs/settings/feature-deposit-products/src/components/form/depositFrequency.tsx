// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
  TopText,
} from '../formui';

export const DepositFrequency = ({ watch }: any) => {
  const penalty = watch('enablePenalty');
  const rebate = watch('enableRebate');
  const { t } = useTranslation();

  const DepositFrequencyOptions = [
    {
      label: t['daily'],
      value: 'Daily',
    },
    {
      label: t['weekly'],
      value: 'Weekly',
    },
    {
      label: t['monthly'],
      value: 'Monthly',
    },
    {
      label: t['yearly'],
      value: 'Yearly',
    },
  ];

  const enableSwitch = [
    {
      label: t['enable'],
      value: 'enable',
    },
    {
      label: t['disable'],
      value: 'disable',
    },
  ];
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductDepositAmountLimit']} </TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="minimunBalaneAmount"
          label={t['depositProductMinimumAmount']}
          placeholder={t['depositProductEnterMinimumAmount']}
        />
        <FormInput
          name="maximumBalaneAmount"
          label={t['depositProductMaximumAmount']}
          placeholder={t['depositProductEnterMaximumAmount']}
        />
      </InputGroupContainer>

      <TextBoxContainer>
        <TopText> {t['depositProductDepositFrequency']} </TopText>
        <SubText>{t['depositProductSelectdepositfrequency']}</SubText>
      </TextBoxContainer>
      <FormSwitchTab
        name={'depositFrequency'}
        options={DepositFrequencyOptions}
      />
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['depositProductpenalty']} </SubHeadingText>
          <SubText>{t['depositProductEnterPenaltydetails']} </SubText>
        </TextBoxContainer>
        <FormSwitchTab name={'enablePenalty'} options={enableSwitch} />
      </Box>
      {penalty && penalty === 'enable' && (
        <BoxContainer
          p="s16"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <InputGroupContainer>
            <FormInput
              name="dayFromTheEndPenalty"
              type="number"
              label={t['depositProductDayfromenddate']}
              placeholder={t['depositProductDayfromenddate']}
            />
            <FormInput
              name="minimumAmount"
              type="number"
              label={t['depositProductMinimumAmount']}
              placeholder={t['depositProductEnterMinimumAmount']}
            />
            <FormInput
              name="flatRatePenalty"
              type="number"
              label={t['depositProductFlatratePenalty']}
              placeholder={t['depositProductFlatratePenalty']}
            />
            <FormInput
              name="penaltyPercentage"
              type="number"
              label={t['depositProductpenalty']}
              textAlign={'right'}
              placeholder="0.00"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />
            <FormInput
              name="penaltyAmount"
              type="number"
              label={t['depositProductPenaltyAmount']}
              placeholder={t['depositProductPenaltyAmount']}
            />
          </InputGroupContainer>
        </BoxContainer>
      )}
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['depositProductRebate']} </SubHeadingText>
          <SubText>{t['depositProductEnterRebatedetails']} </SubText>
        </TextBoxContainer>
        <FormSwitchTab name={'enableRebate'} options={enableSwitch} />
      </Box>
      {rebate && rebate === 'enable' && (
        <BoxContainer
          p="s16"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <InputGroupContainer>
            <FormInput
              name="dayFromTheEndRebate"
              type="number"
              label={t['depositProductDaysfromenddate']}
              placeholder={t['depositProductDaysfromenddate']}
            />
            <FormInput
              name="rebateAmount"
              type="number"
              label={t['depositProductRebateAmount']}
              placeholder={t['depositProductRebateAmount']}
            />

            <FormInput
              name="percentageRebate"
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
            <FormInput
              name="nosOfInstallment"
              type="number"
              label={t['depositProductNoInstallment']}
              placeholder="0"
              helperText={t['depositProductEnterNumberInstallments']}
              textAlign={'right'}
            />
          </InputGroupContainer>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
