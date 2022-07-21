import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const BalanceLimit = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();

  const frequencyUnit = watch('frequencyUnit');
  const depositNature = watch('nameOfDepositProduct');

  useEffect(() => {
    resetField('unitDays');
    setRightElement(frequencyUnit);
  }, [frequencyUnit]);

  const { t } = useTranslation();

  const unitOptions = [
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

  return (
    <BoxContainer>
      <TextBoxContainer>
        {depositNature === 'recurringSaving' ? (
          <TopText>{t['depositProductTransactionLimit']} </TopText>
        ) : (
          <TopText>{t['depositProdictBalanceLimit']}</TopText>
        )}
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
        {depositNature !== 'recurringSaving' && (
          <FormInput
            type="number"
            name="average"
            label={t['depositProductAverage']}
            textAlign="right"
            placeholder="0"
          />
        )}
      </InputGroupContainer>
      {/* <Box display="flex" flexDirection="column" gap="s8">
        <Text fontSize={'s3'} fontWeight="Medium">
          Frquency
        </Text>
        <Box
          display={'flex'}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box display={'flex'} flexDirection="column" gap="s4">
            <Text fontSize={'s3'} fontWeight="Medium">
              Unit
            </Text>
            <FormSwitchTab name={'frequencyUnit'} options={unitOptions} />
          </Box>
          <Box w="300px">
            <FormInput
              name="unitDays"
              textAlign={'right'}
              label="Number"
              placeholder="0"
              rightElement={
                <Box mr="s24">
                  <Text fontWeight="Medium" fontSize="r1" color="accent.debit">
                    {rightElement}
                  </Text>
                </Box>
              }
            />
          </Box>
        </Box>
      </Box> */}
    </BoxContainer>
  );
};
