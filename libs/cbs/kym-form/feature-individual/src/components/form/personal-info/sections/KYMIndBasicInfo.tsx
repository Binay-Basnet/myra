import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection } from '@myra-ui';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import { KYMSection } from '@coop/cbs/kym-form/formElements';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../../utils/getFieldOption';

export const KYMIndBasicInfo = () => {
  const { setValue } = useFormContext<KymIndMemberInput>();
  const { t } = useTranslation();

  const { data: genderFields, isLoading: genderLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Gender,
  });

  const { data: ethnicityFields, isLoading: ethnicityLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Ethnicity,
  });

  const { data: educationFields, isLoading: educationLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.EducationQualification,
  });

  const { data: religionFields, isLoading: religionLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Religion,
  });

  const { data: nationalityFields, isLoading: nationalityLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Nationality,
    });

  useEffect(() => {
    setValue('nationalityId', nationalityFields?.form?.options?.predefined?.data?.[0]?.id);
  }, [nationalityLoading]);

  return (
    <FormSection id={KYMSection.INDIVIDUAL_BASIC_INFORMATION} header="kymIndBasicInformation">
      <FormInput isRequired type="text" name="firstName" label={t['kymIndFirstName']} />
      <FormInput type="text" name="middleName" label={t['kymIndMiddleName']} />
      <FormInput isRequired type="text" name="lastName" label={t['kymIndLastName']} />
      <FormSelect
        isRequired
        name="genderId"
        label={t['kymIndGender']}
        isLoading={genderLoading}
        options={getFieldOption(genderFields)}
      />
      <FormDatePicker
        isRequired
        name="dateOfBirth"
        label={t['kymIndDateofBirthBS']}
        maxDate={new Date()}
      />
      <FormSelect
        isRequired
        name="ethnicityId"
        label={t['kymIndEthnicity']}
        isLoading={ethnicityLoading}
        options={getFieldOption(ethnicityFields)}
      />

      <FormSelect
        name="nationalityId"
        isDisabled
        label={t['kymIndNationality']}
        isLoading={nationalityLoading}
        options={getFieldOption(nationalityFields)}
      />

      <FormSelect
        isRequired
        name="educationQualificationId"
        label={t['kymIndEducationalQualification']}
        isLoading={educationLoading}
        options={getFieldOption(educationFields)}
      />
      <FormSelect
        isRequired
        name="religionId"
        label={t['kymIndReligion']}
        isLoading={religionLoading}
        options={getFieldOption(religionFields)}
      />

      <FormInput name="panNo" label={t['kymIndPanNo']} />
    </FormSection>
  );
};
