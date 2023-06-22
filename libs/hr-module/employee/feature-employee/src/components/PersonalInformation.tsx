import { FormSection } from '@myra-ui';

import { GenderInputType, MaritalStatusInputType } from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const PersonalInformation = () => {
  const { t } = useTranslation();

  const genderOptions = [
    { label: 'Male', value: GenderInputType?.Male },
    { label: 'Female', value: GenderInputType?.Female },
    { label: 'Other', value: GenderInputType?.Other },
  ];

  const maritalStatusOptions = [
    { label: 'Divorced', value: MaritalStatusInputType?.Divorced },
    { label: 'Married', value: MaritalStatusInputType?.Married },
    { label: 'Unmarried', value: MaritalStatusInputType?.Unmrarried },
  ];

  return (
    <FormSection id="Personal Information" header="Personal Information">
      <FormInput isRequired type="text" name="firstName" label={t['kymIndFirstName']} />
      <FormInput type="text" name="middleName" label={t['kymIndMiddleName']} />
      <FormInput isRequired type="text" name="lastName" label={t['kymIndLastName']} />
      <FormSelect isRequired name="gender" label={t['kymIndGender']} options={genderOptions} />
      <FormDatePicker
        isRequired
        name="dateOfBirth"
        label={t['kymIndDateofBirthBS']}
        maxDate={new Date()}
      />
      <FormSelect
        isRequired
        name="maritalStatus"
        label="Marital Status"
        options={maritalStatusOptions}
      />
    </FormSection>
  );
};
