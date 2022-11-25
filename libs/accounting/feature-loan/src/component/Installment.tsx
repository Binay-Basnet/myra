import { InstallmentFrequency, LoanRepaymentScheme } from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const Installment = () => {
  const { t } = useTranslation();

  const installmentList = [
    { label: 'EMI', value: LoanRepaymentScheme.Emi },
    { label: 'EPI', value: LoanRepaymentScheme.Epi },
    { label: 'Flat', value: LoanRepaymentScheme.Flat },
  ];

  const installmentFreqList = [
    { label: t['daily'], value: InstallmentFrequency.Daily },
    { label: t['weekly'], value: InstallmentFrequency.Weekly },
    { label: t['monthly'], value: InstallmentFrequency.Monthly },
    { label: t['quaterly'], value: InstallmentFrequency.Quarterly },
    { label: t['halfYearly'], value: InstallmentFrequency.HalfYearly },
    { label: t['yearly'], value: InstallmentFrequency.Yearly },
  ];

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormSwitchTab name="installmentType" label="Installment Type" options={installmentList} />
      </GridItem>

      <GridItem>
        <FormSwitchTab
          name="installmentFrequency"
          label="Installment Frequency"
          options={installmentFreqList}
        />
      </GridItem>
    </FormSection>
  );
};
