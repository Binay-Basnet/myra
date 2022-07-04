import React from 'react';
import isEmpty from 'lodash/isEmpty';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

export const MemberKYMBasicInfo = () => {
  const { t } = useTranslation();
  const { data: genderFields, isLoading: genderLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.Gender },
    });

  const { data: ethnicityFields, isLoading: ethnicityLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.Ethnicity },
    });

  const { data: educationFields, isLoading: educationLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.EducationQualification },
    });

  const { data: religionFields, isLoading: religionLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.Religion },
    });

  const { data: nationalityFields, isLoading: nationalityLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.Nationality },
    });

  return (
    <GroupContainer id="kymAccIndBasicInformation" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymIndBASICINFORMATION']}
      </Text>
      <InputGroupContainer>
        <FormInput
          type="text"
          name="firstName"
          label={t['kymIndFirstName']}
          placeholder={t['kymIndEnterFirstName']}
        />
        <FormInput
          type="text"
          name="middleName"
          label={t['kymIndMiddleName']}
          placeholder={t['kymIndEnterMiddlename']}
        />
        <FormInput
          type="text"
          name="lastName"
          label={t['kymIndLastName']}
          placeholder={t['kymIndEnterLastname']}
        />
        <FormSelect
          name="genderId"
          label={t['kymIndGender']}
          placeholder={t['kymIndSelectGender']}
          isLoading={genderLoading}
          options={getFieldOption(genderFields)}
        />
        <FormInput
          type="date"
          name="dateOfBirth"
          label={t['kymIndDateofBirthBS']}
          placeholder={t['kymIndEnterdateofbirth']}
        />
        <FormSelect
          name="ethnicityId"
          label={t['kymIndEthnicity']}
          placeholder={t['kymIndSelectEthnicity']}
          isLoading={ethnicityLoading}
          options={getFieldOption(ethnicityFields)}
        />

        <FormSelect
          name="nationalityId"
          isDisabled
          label={t['kymIndNationality']}
          placeholder={t['kymIndEnterNationality']}
          isLoading={nationalityLoading}
          options={getFieldOption(nationalityFields)}
        />

        <FormSelect
          name={'educationQualificationId'}
          label={t['kymIndEducationalQualification']}
          placeholder={t['kymIndSelectEducationalQualification']}
          isLoading={educationLoading}
          options={getFieldOption(educationFields)}
        />
        <FormSelect
          name="religionId"
          label={t['kymIndReligion']}
          placeholder={t['kymIndSelectReligion']}
          isLoading={religionLoading}
          options={getFieldOption(religionFields)}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
