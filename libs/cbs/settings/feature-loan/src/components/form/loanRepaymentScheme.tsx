import { useFormContext } from 'react-hook-form';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubHeadingText, TopText } from '../formui';

export const LoanRepaymentScheme = () => {
  const { watch } = useFormContext();
  const loanScheme = watch('loanRepaymentScheme');
  const { t } = useTranslation();

  const loanschemeOptions = [
    { label: t['loanProductEPI'], value: 'epi' },
    { label: t['loanProductEMI'], value: 'emi' },
    { label: t['loanProductFlat'], value: 'flat' },
  ];
  const YesNoOptions = [
    { label: t['yes'], value: 'yes' },
    { label: t['no'], value: 'no' },
  ];

  return (
    <BoxContainer>
      <Box
        display={'flex'}
        flexDirection="row"
        justifyContent={'space-between'}
      >
        <TopText>{t['loanProductLoanRepaymentScheme']}</TopText>
        <FormSwitchTab name="loanRepaymentScheme" options={loanschemeOptions} />
      </Box>
      <InputGroupContainer>
        {loanScheme && (loanScheme === 'epi' || loanScheme === 'emi') && (
          <FormSelect
            name="modeOfPayment"
            label={t['loanProductModePayment']}
            placeholder={t['loanProductSelectModePayment']}
            // options={loanschemeOptions}
          />
        )}

        <FormSelect
          name="installmentType"
          label={t['loanProductInstallmentType']}
          placeholder={t['loanProductSelectInstallmentType']}
        />
      </InputGroupContainer>
      <Box
        display={'flex'}
        flexDirection="row"
        justifyContent={'space-between'}
        alignItems="center"
        pt="s16"
      >
        <SubHeadingText>
          {t['loanProductAllowPartialInstallment']}
        </SubHeadingText>
        <FormSwitchTab name="allowPartialInstallment" options={YesNoOptions} />
      </Box>
      <Box
        display={'flex'}
        flexDirection="row"
        justifyContent={'space-between'}
        alignItems="center"
        pt="s16"
      >
        <SubHeadingText>
          {t['loanProductIsMonthlyInterestCompulsory']}
        </SubHeadingText>
        <FormSwitchTab
          name="monthlyInterestCompulsory"
          options={YesNoOptions}
        />
      </Box>
    </BoxContainer>
  );
};
