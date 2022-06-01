import React from 'react';
import { Control } from 'react-hook-form';
import { Grid, Text } from '@saccos/myra/ui';

import { FormInput } from '../../newFormComponents';

interface IMemberContactDetails {
  control: Control<any>;
}

export const MemberContactDetails = ({ control }: IMemberContactDetails) => {
  return (
    <>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
        mb="s32"
      >
        CONTACT DETAILS
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap="s20">
        <FormInput
          control={control}
          type="text"
          name="mobileNo"
          label="Mobile No"
          placeholder="Enter Mobile No"
        />
        <FormInput
          control={control}
          type="text"
          name="phoneNo"
          label="Phone No"
          placeholder="Enter Phone No"
        />
        <FormInput
          control={control}
          type="text"
          name="email"
          label="Email"
          placeholder="Enter email"
        />
      </Grid>
    </>
  );
};
