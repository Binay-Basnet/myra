// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DividerContainer, SubHeadingText } from '../formui';

export const Questions = ({ watch }: any) => {
  const { t } = useTranslation();
  const collateral = watch('collateral');

  const yesNo = [
    { label: t['yes'], value: 'yes' },
    { label: t['no'], value: 'no' },
  ];

  return (
    <DividerContainer>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>{t['loanProductInsurance']} </SubHeadingText>
        <FormSwitchTab name={'autoOpenWhenJoin'} options={yesNo} />
      </Box>
      <Box display={'flex'} flexDirection="column" gap="s16">
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>{t['loanProductCollateral']} </SubHeadingText>
          <FormSwitchTab name={'collateral'} options={yesNo} />
        </Box>
        {collateral && collateral === 'yes' && (
          <Box
            p="s16"
            border={'1px solid'}
            borderColor="border.layout"
            borderRadius={'6px'}
          >
            <InputGroupContainer>
              <FormInput
                type="text"
                name="disburementOfFMV"
                label={t['loanProductDisburementofFMV']}
                placeholder={t['loanProductDisburementofFMV']}
              />
              <FormInput
                type="text"
                name="disburementOfDMV"
                label={t['loanProductDisburementDMV']}
                placeholder={t['loanProductDisburementofFMV']}
              />
            </InputGroupContainer>
          </Box>
        )}{' '}
      </Box>

      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>{t['loanProductRebate']} </SubHeadingText>
        <FormSwitchTab name={'rebate'} options={yesNo} />
      </Box>

      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>{t['loanProductStaffProduct']} </SubHeadingText>
        <FormSwitchTab name={'staffProduct'} options={yesNo} />
      </Box>

      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>
          {t['loanProductSupportMultipleAccount']}t
        </SubHeadingText>
        <FormSwitchTab name={'supportMultipleAcc'} options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>
          {t['loanProductLoanScheduleChangeOverride']}
        </SubHeadingText>
        <FormSwitchTab name={'loanScheduleChangeOverride'} options={yesNo} />
      </Box>
    </DividerContainer>
  );
};
