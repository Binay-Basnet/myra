import { useMemo } from 'react';

import { FormSection } from '@myra-ui';

import { FormFieldSearchTerm, useGetIndividualKymOptionsQuery } from '@coop/cbs/data-access';
import { localizedText } from '@coop/cbs/utils';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const PersonalInformation = () => {
  const { t } = useTranslation();

  const { data: genderFields, isLoading: genderLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Gender,
  });
  const genderOptions = useMemo(
    () =>
      genderFields?.form?.options?.predefined?.data?.map((account) => ({
        label: localizedText(account?.name) as string,
        value: account?.id as string,
      })),
    [genderFields]
  );
  return (
    <FormSection id="Personal Information" header="Personal Information">
      <FormInput isRequired type="text" name="firstName" label={t['kymIndFirstName']} />
      <FormInput type="text" name="middleName" label={t['kymIndMiddleName']} />
      <FormInput isRequired type="text" name="lastName" label={t['kymIndLastName']} />
      <FormSelect
        isRequired
        isLoading={genderLoading}
        name="gender"
        label={t['kymIndGender']}
        options={genderOptions}
      />
      <FormDatePicker
        isRequired
        name="dateOfBirth"
        label={t['kymIndDateofBirthBS']}
        maxDate={new Date()}
      />
    </FormSection>
  );
};
