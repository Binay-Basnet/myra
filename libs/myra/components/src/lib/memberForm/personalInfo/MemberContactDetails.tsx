import React from 'react';
import { FormInput } from '@saccos/myra/components';
import { Grid, Text } from '@saccos/myra/ui';

export const MemberContactDetails = ({ control }) => {
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        CONTACT DETAILS
      </Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormInput
          control={control}
          type="text"
          name="mobileNumber"
          label="Mobile No"
          placeholder="Enter Mobile No"
        />
        <FormInput
          control={control}
          type="text"
          name="phoneNumber"
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
