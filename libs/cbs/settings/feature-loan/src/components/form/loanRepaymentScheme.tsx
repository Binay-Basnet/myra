import { useFormContext } from 'react-hook-form';

import {
  LoanPaymentInstallmentType,
  LoanPaymentMode,
  LoanRepaymentScheme,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubHeadingText, TopText } from '../formui';

export const LoanRepaymentSchemes = () => {
  const { watch } = useFormContext();
  const loanScheme = watch('repaymentScheme');
  const { t } = useTranslation();

  const loanschemeOptions = [
    { label: t['loanProductEPI'], value: LoanRepaymentScheme.Epi },
    { label: t['loanProductEMI'], value: LoanRepaymentScheme.Emi },
    { label: t['loanProductFlat'], value: LoanRepaymentScheme.Flat },
  ];
  const YesNoOptions = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  const modeOfPaymentList = [
    { label: t['loanProductInstallment'], value: LoanPaymentMode.Installment },
  ];

  const installmentTypeList = [
    { label: t['monthly'], value: LoanPaymentInstallmentType.Monthly },
    { label: t['quaterly'], value: LoanPaymentInstallmentType.Quarterly },
  ];

  return (
    <BoxContainer>
      <Box
        display={'flex'}
        flexDirection="row"
        justifyContent={'space-between'}
      >
        <TopText>{t['loanProductLoanRepaymentScheme']}</TopText>
        <FormSwitchTab name="repaymentScheme" options={loanschemeOptions} />
      </Box>

      {loanScheme &&
        (loanScheme === LoanRepaymentScheme.Epi ||
          loanScheme === LoanRepaymentScheme.Emi) && (
          <InputGroupContainer>
            <FormSelect
              name="modeOfPayment"
              label={t['loanProductModePayment']}
              placeholder={t['loanProductSelectModePayment']}
              options={modeOfPaymentList}
            />
            <FormSelect
              name="installmentType"
              label={t['loanProductInstallmentType']}
              placeholder={t['loanProductSelectInstallmentType']}
              options={installmentTypeList}
            />
          </InputGroupContainer>
        )}

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
          name="isMonthlyInstallmentCompulsory"
          options={YesNoOptions}
        />
      </Box>
    </BoxContainer>
  );
};
