import { LoanProductInstallment } from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const InstallmentFrequency = () => {
  const { t } = useTranslation();

  const installmentFrequency = [
    {
      label: t['daily'],
      value: LoanProductInstallment.Daily,
    },
    {
      label: t['weekly'],
      value: LoanProductInstallment.Weekly,
    },
    {
      label: t['monthly'],
      value: LoanProductInstallment.Monthly,
    },
    {
      label: t['quaterly'],
      value: LoanProductInstallment.Quarterly,
    },
    {
      label: t['halfYearly'],
      value: LoanProductInstallment.HalfYearly,
    },
    {
      label: t['yearly'],
      value: LoanProductInstallment.Yearly,
    },
  ];

  return (
    <FormSection
      header="loanProductInstallmentFrequency"
      subHeader="loanProductSelectinstallmentfrequency"
    >
      <FormSwitchTab name="installmentFrequency" options={installmentFrequency} />
    </FormSection>
  );
};
