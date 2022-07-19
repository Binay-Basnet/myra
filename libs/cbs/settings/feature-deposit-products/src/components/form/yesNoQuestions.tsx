import { useFormContext } from 'react-hook-form';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DividerContainer, SubHeadingText } from '../formui';

const yesNo = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
export const Questions = () => {
  const { watch } = useFormContext();
  const depositNature = watch('nameOfDepositProduct');
  const allowLoan = watch('allowLoan');
  const withdrawRestricted = watch('withdrawRestricted');
  const { t } = useTranslation();
  return (
    <DividerContainer>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>
          {t['depositProductAutoOpenwhenmemberjoins']}{' '}
        </SubHeadingText>
        <FormSwitchTab name={'autoOpenWhenJoin'} options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>
          {t['depositProductAlternativeChannels']}{' '}
        </SubHeadingText>
        <FormSwitchTab name={'alternativeChannels'} options={yesNo} />
      </Box>
      {depositNature === 'voluntary' && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>{t['depositProductATMFacility']} </SubHeadingText>
          <FormSwitchTab name={'atmFacility'} options={yesNo} />
        </Box>
      )}
      {depositNature === 'voluntary' && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>Cheque Issue</SubHeadingText>
          <FormSwitchTab name={'chequeIssue'} options={yesNo} />
        </Box>
      )}
      {(depositNature === 'recurringSaving' ||
        depositNature === 'termSaving') && (
        <Box display={'flex'} flexDirection="column" gap="s16">
          <Box
            display="flex"
            flexDirection={'row'}
            justifyContent="space-between"
          >
            <SubHeadingText>{t['depositProductAllowLoan']} </SubHeadingText>
            <FormSwitchTab name={'allowLoan'} options={yesNo} />
          </Box>

          {(depositNature === 'recurringSaving' ||
            depositNature === 'termSaving') &&
            allowLoan &&
            allowLoan === 'yes' && (
              <Box
                display={'flex'}
                justifyContent="space-between"
                p="s16"
                border="1px solid"
                borderColor={'border.layout'}
                borderRadius="6px"
              >
                <InputGroupContainer>
                  <FormInput
                    type="number"
                    textAlign="right"
                    name="percentageOfDeposit"
                    label={t['depositProductPercentageDeposit']}
                    placeholder="0.00"
                    rightElement="%"
                  />
                </InputGroupContainer>
              </Box>
            )}
        </Box>
      )}
      {depositNature !== 'mandatory' && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>
            {t['depositProductSupportMultipleAccount']}
          </SubHeadingText>
          <FormSwitchTab name={'supportMultipleAccount'} options={yesNo} />
        </Box>
      )}
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>{t['depositProductStaffProduct']} </SubHeadingText>
        <FormSwitchTab name={'staffProduct'} options={yesNo} />
      </Box>
      {depositNature === 'recurringSaving' && (
        <Box display={'flex'} flexDirection="column" gap="s16">
          <Box
            display="flex"
            flexDirection={'row'}
            justifyContent="space-between"
          >
            <SubHeadingText>
              {t['depositProductWidthdrawRestricted']}
            </SubHeadingText>
            <FormSwitchTab name={'withdrawRestricted'} options={yesNo} />
          </Box>
          {withdrawRestricted && withdrawRestricted === 'yes' && (
            <Box
              border="1px solid"
              borderColor="border.layout"
              borderRadius="6px"
              p="s16"
              minH="156px"
            >
              <Box>
                <FormInput
                  type="text"
                  name="specifyRestrictedwithdraw"
                  label={t['depositProductSpecify']}
                  minH={'100px'}
                />{' '}
              </Box>
            </Box>
          )}
        </Box>
      )}
      {depositNature === 'recurringSaving' && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>
            {t['depositProductWealthBuildingProduct']}
          </SubHeadingText>
          <FormSwitchTab name={'wealthBuildingProject'} options={yesNo} />
        </Box>
      )}
    </DividerContainer>
  );
};
