import { FormSection } from '@myra-ui';

import {
  BloodGroup,
  FormFieldSearchTerm,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormCheckbox, FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from './EducationalDetails';

export const PersonalInformation = () => {
  const { t } = useTranslation();

  const { data: genderFields, isLoading: genderLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Gender,
  });
  const { data: maritalStatusData, isLoading: maritalStatusLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.MaritalStatus,
    });

  const { data: ethnicityData, isLoading: ethnicityLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Ethnicity,
  });

  const bloodGroupOptions = [
    { label: 'A-', value: BloodGroup?.ANegative },
    { label: 'A+', value: BloodGroup?.APositive },
    { label: 'AB-', value: BloodGroup?.AbNegative },
    { label: 'AB+', value: BloodGroup?.AbPositive },
    { label: 'B-', value: BloodGroup?.BNegative },
    { label: 'B+', value: BloodGroup?.BPositive },
    { label: 'O-', value: BloodGroup?.ONegative },
    { label: 'O+', value: BloodGroup?.OPositive },
  ];

  return (
    <FormSection id="Personal Information" header="Personal Information">
      <FormInput isRequired type="text" name="firstName" label={t['kymIndFirstName']} />
      <FormInput type="text" name="middleName" label={t['kymIndMiddleName']} />
      <FormInput isRequired type="text" name="lastName" label={t['kymIndLastName']} />
      <FormDatePicker
        isRequired
        name="dateOfBirth"
        label={t['kymIndDateofBirthBS']}
        maxDate={new Date()}
      />
      <FormInput type="number" name="age" label="Age" />
      <FormSelect
        isRequired
        name="gender"
        label={t['kymIndGender']}
        options={getFieldOption(genderFields)}
        isLoading={genderLoading}
      />

      <FormSelect
        isRequired
        name="maritalStatus"
        label="Marital Status"
        options={getFieldOption(maritalStatusData)}
        isLoading={maritalStatusLoading}
      />
      <FormSelect
        isRequired
        name="ethnicity"
        label="Ethnicity"
        options={getFieldOption(ethnicityData)}
        isLoading={ethnicityLoading}
      />
      <FormSelect isRequired name="bloodGroup" label="Blood Group" options={bloodGroupOptions} />
      <FormCheckbox name="Handicapped" label="Handicapped" />
    </FormSection>
  );
};
