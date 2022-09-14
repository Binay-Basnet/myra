import { Frequency } from '@coop/cbs/data-access';
import { FormSwitchTab } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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
    <FormSection
      header="depositProductDepositFrequency"
      subHeader="depositProductSelectdepositfrequency"
    >
      <FormSwitchTab
        defaultValue={Frequency.Daily}
        name="depositFrequency"
        options={DepositFrequencyOptions}
      />
    </FormSection>
  );
};
