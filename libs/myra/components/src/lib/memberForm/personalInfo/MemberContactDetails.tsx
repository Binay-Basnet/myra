import React from 'react';
import { Grid, Text } from '@saccos/myra/ui';

import { FormInput } from '../../newFormComponents';

export const MemberContactDetails = ({ control }: any) => {
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
