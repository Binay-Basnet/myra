import React from 'react';
import { useTranslation } from '@coop/shared/utils';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useGetIndividualKymOptionQuery } from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';

import { getFieldOption } from '../../../utils/getFieldOption';

export const MemberKYMBasicInfo = () => {
  const { t } = useTranslation();
  const { data: genderFields, isLoading: genderLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'gender',
    });

  const { data: ethnicityFields, isLoading: ethnicityLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'ethnicity',
    });

  const { data: educationFields, isLoading: educationLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'education_qualification',
    });

  const { data: religionFields, isLoading: religionLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'religion',
    });

  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
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

        <FormInput
          type="text"
          name="nationalityId"
          label={t['kymIndNationality']}
          placeholder={t['kymIndEnterNationality']}
          isDisabled={true}
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
