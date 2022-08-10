import { useFormContext } from 'react-hook-form';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DividerContainer, SubHeadingText } from '../formui';

export const Questions = () => {
  const { watch } = useFormContext();
  const depositNature = watch('nature');
  const allowLoan = watch('allowLoan');
  const withdrawRestricted = watch('withdrawRestricted');
  const { t } = useTranslation();

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <DividerContainer>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>
          {t['depositProductAutoOpenwhenmemberjoins']}
        </SubHeadingText>
        <FormSwitchTab name="autoOpen" options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>
          {t['depositProductAlternativeChannels']}
        </SubHeadingText>
        <FormSwitchTab name={'alternativeChannels'} options={yesNo} />
      </Box>
      {depositNature === NatureOfDepositProduct.VoluntaryOrOptional && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>{t['depositProductATMFacility']} </SubHeadingText>
          <FormSwitchTab name={'atmFacility'} options={yesNo} />
        </Box>
      )}
      {depositNature === NatureOfDepositProduct.VoluntaryOrOptional && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>{t['depositProductChequeIssue']}</SubHeadingText>
          <FormSwitchTab name={'chequeIssue'} options={yesNo} />
        </Box>
      )}
      <Box display={'flex'} flexDirection="column" gap="s16">
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>{t['depositProductAllowLoan']} </SubHeadingText>
          <FormSwitchTab name={'allowLoan'} options={yesNo} />
        </Box>

        {allowLoan && (
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
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </InputGroupContainer>
          </Box>
        )}
      </Box>
      {depositNature !== NatureOfDepositProduct.Mandatory && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>
            {t['depositProductSupportMultipleAccount']}
          </SubHeadingText>
          <FormSwitchTab name={'supportMultiple'} options={yesNo} />
        </Box>
      )}
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>{t['depositProductStaffProduct']} </SubHeadingText>
        <FormSwitchTab name={'staffProduct'} options={yesNo} />
      </Box>
      {depositNature === NatureOfDepositProduct.RecurringSaving && (
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
          {withdrawRestricted && (
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
                  name="specifyWithdrawRestriction"
                  label={t['depositProductSpecify']}
                  minH={'100px'}
                />
              </Box>
            </Box>
          )}
        </Box>
      )}
      {depositNature === NatureOfDepositProduct.RecurringSaving && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>
            {t['depositProductWealthBuildingProduct']}
          </SubHeadingText>
          <FormSwitchTab name={'wealthBuildingProduct'} options={yesNo} />
        </Box>
      )}
    </DividerContainer>
  );
};
