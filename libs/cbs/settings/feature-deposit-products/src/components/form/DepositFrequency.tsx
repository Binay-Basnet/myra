import { useFormContext } from 'react-hook-form';

import { FormSection } from '@myra-ui';

import {
  DepositProductInput,
  Frequency,
  KymMemberTypesEnum,
  ServiceType,
} from '@coop/cbs/data-access';
import { FormCheckbox, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type SelectOption = {
  label: string;
  value: string;
}[];

type DepositForm = Omit<
  DepositProductInput,
  | 'genderId'
  | 'typeOfMember'
  | 'maritalStatusId'
  | 'educationQualification'
  | 'occupation'
  | 'ethnicity'
  | 'natureOFBusinessCoop'
  | 'natureOfBusinessInstitution'
> & {
  typeOfMember: KymMemberTypesEnum | undefined | string;
  genderId: SelectOption;
  maritalStatusId: SelectOption;
  educationQualification: SelectOption;
  occupation: SelectOption;
  ethnicity: SelectOption;
  natureOFBusinessCoop: SelectOption;
  natureOfBusinessInstitution: SelectOption;
  chequeCharge: ServiceType[];
  atmCharge: ServiceType[];
  isFrequencyMandatory: boolean;
};

export const DepositFrequency = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext<DepositForm>();

  const depositNature = watch('nature');

  const isFrequencyMandatory = watch('isFrequencyMandatory');

  const isMandatorySaving = watch('isMandatorySaving');

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
      templateColumns={1}
    >
      {depositNature === 'RECURRING_SAVING' && (
        <FormCheckbox label="Is Frequency Regular" name="isFrequencyMandatory" />
      )}
      {((depositNature === 'RECURRING_SAVING' && isFrequencyMandatory) ||
        (depositNature === 'SAVING' && isMandatorySaving)) && (
        <FormSwitchTab name="depositFrequency" options={DepositFrequencyOptions} />
      )}
    </FormSection>
  );
};
