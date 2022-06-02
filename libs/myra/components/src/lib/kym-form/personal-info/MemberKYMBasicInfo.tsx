import React from 'react';
import { Control } from 'react-hook-form';
import { Text } from '@saccos/myra/ui';

import { GroupContainer, InputGroupContainer } from '../containers';
import { FormInput, FormSelect } from '../../newFormComponents';

interface IMemberKYMBasicInfo {
  control: Control<any>;
}

export const MemberKYMBasicInfo = ({ control }: IMemberKYMBasicInfo) => {
  return (
    <GroupContainer>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        BASIC INFORMATION
      </Text>
      <InputGroupContainer>
        <FormInput
          control={control}
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Enter first name"
        />
        <FormInput
          control={control}
          type="text"
          name="middleName"
          label="Middle Name"
          placeholder="Enter Middle name"
        />
        <FormInput
          control={control}
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Enter Last name"
        />
        <FormSelect
          control={control}
          name="gender"
          label="Gender"
          placeholder="Select Gender"
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ]}
        />
        <FormInput
          control={control}
          type="date"
          name="dateOfBirthBs"
          label="Date of Birth(BS)"
          placeholder="Enter date of birth"
        />
        <FormSelect
          control={control}
          name="ethnicity"
          label="Ethnicity"
          placeholder="Select Ethnicity"
          options={[
            { label: 'Bramins', value: 'bramins' },
            { label: 'Chetris', value: 'chetris' },
            { label: 'Newar', value: 'newar' },
          ]}
        />

        <FormInput
          control={control}
          type="text"
          name="nationality"
          label="Nationality"
          placeholder="Enter Nationality"
        />
        <FormSelect
          control={control}
          name="educationalQualification"
          label="Educational Qualification"
          placeholder="Select Educational Qualification"
          options={[
            { label: 'SEE', value: 'see' },
            { label: '+2', value: 'twelve' },
            { label: 'Graduate', value: 'graduate' },
            { label: 'Post Graduate', value: 'postGraduate' },
            { label: 'Doctorate', value: 'doctorate' },
          ]}
        />
        <FormSelect
          control={control}
          name="religion"
          label="Religion"
          placeholder="Select Religion"
          options={[
            { label: 'Hindu', value: 'hindu' },
            { label: 'Buddhist', value: 'buddhist' },
            { label: 'Muslims', value: 'muslims' },
            { label: 'Christain', value: 'christain' },
          ]}
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
