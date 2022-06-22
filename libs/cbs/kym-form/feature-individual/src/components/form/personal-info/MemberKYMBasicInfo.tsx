import React from 'react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useGetIndividualKymOptionQuery } from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';

import { getFieldOption } from '../../../utils/getFieldOption';

export const MemberKYMBasicInfo = () => {
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
        BASIC INFORMATION
      </Text>
      <InputGroupContainer>
        <FormInput
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Enter first name"
        />
        <FormInput
          type="text"
          name="middleName"
          label="Middle Name"
          placeholder="Enter Middle name"
        />
        <FormInput
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Enter Last name"
        />
        <FormSelect
          name="genderId"
          label="Gender"
          placeholder="Select Gender"
          isLoading={genderLoading}
          options={getFieldOption(genderFields)}
        />
        <FormInput
          type="date"
          name="dateOfBirth"
          label="Date of Birth(BS)"
          placeholder="Enter date of birth"
        />
        <FormSelect
          name="ethnicityId"
          label="Ethnicity"
          placeholder="Select Ethnicity"
          isLoading={ethnicityLoading}
          options={getFieldOption(ethnicityFields)}
        />

        <FormInput
          type="text"
          name="nationalityId"
          label="Nationality"
          placeholder="Enter Nationality"
          isDisabled={true}
        />
        <FormSelect
          name={'educationQualificationId'}
          label="Educational Qualification"
          placeholder="Select Educational Qualification"
          isLoading={educationLoading}
          options={getFieldOption(educationFields)}
        />
        <FormSelect
          name="religionId"
          label="Religion"
          placeholder="Select Religion"
          isLoading={religionLoading}
          options={getFieldOption(religionFields)}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
