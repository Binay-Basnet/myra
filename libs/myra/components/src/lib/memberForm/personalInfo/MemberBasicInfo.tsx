import React from 'react';
import { FormInput, FormSelect } from '@saccos/myra/components';
import { Grid, Text } from '@saccos/myra/ui';

export const MemberBasicInfo = ({ control }) => {
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        BASIC INFORMATION
      </Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
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
          name="genderId"
          label="Gender"
          placeholder="Select Gender"
          options={[
            { label: 'male', value: 'male' },
            { label: 'female', value: 'female' },
            { label: 'other', value: 'other' },
          ]}
        />
        <FormInput
          control={control}
          type="date"
          name="dateOfBirth"
          label="Date of Birth(BS)"
          placeholder="Enter date of birth"
        />
        <FormSelect
          control={control}
          name="ethnicityId"
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
          name="nationalityId"
          label="Nationality"
          placeholder="Enter Nationality"
        />
        <FormSelect
          control={control}
          name="educationalQualificationId"
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
          name="religionId"
          label="Religion"
          placeholder="Select Religion"
          options={[
            { label: 'Hindu', value: 'hindu' },
            { label: 'Buddhist', value: 'buddhist' },
            { label: 'Muslims', value: 'muslims' },
            { label: 'Christain', value: 'christain' },
          ]}
        />
      </Grid>
    </>
  );
};
