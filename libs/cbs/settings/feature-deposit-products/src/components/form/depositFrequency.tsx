import { Frequency } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubText, TextBoxContainer, TopText } from '../formui';

export const DepositFrequency = () => {
  const { t } = useTranslation();

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

  return (
    <BoxContainer>
      <Box>
        <TextBoxContainer>
          <TopText>{t['depositProductDepositAmountLimit']} </TopText>
        </TextBoxContainer>
        <InputGroupContainer mt="s16">
          <FormInput
            name="depositAmount.minAmount"
            label={t['depositProductMinimumAmount']}
          />
          <FormInput
            name="depositAmount.maxAmount"
            label={t['depositProductMaximumAmount']}
          />
        </InputGroupContainer>
      </Box>

      <TextBoxContainer>
        <TopText> {t['depositProductDepositFrequency']} </TopText>
        <SubText>{t['depositProductSelectdepositfrequency']}</SubText>
      </TextBoxContainer>
      <FormSwitchTab
        defaultValue={Frequency.Daily}
        name={'depositFrequency'}
        options={DepositFrequencyOptions}
      />
    </BoxContainer>
  );
};
