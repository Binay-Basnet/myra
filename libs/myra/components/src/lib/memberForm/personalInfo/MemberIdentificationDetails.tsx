import React from 'react';
import { Box, Checkbox, Grid, Text } from '@saccos/myra/ui';

import { FormInput } from '../../newFormComponents';

const identificationDetails = [
  'Citizenship',
  'Driving License',
  'Passport',
  'Voters Card',
  'National ID',
];

export const MemberIdentificationDetails = ({ control }: any) => {
  return (
    <>
      <Text fontSize="r1" fontWeight="SemiBold">
        IDENTIFICATION DETAILS
      </Text>
      <br />
      <Text fontSize="r1" fontWeight="InterMedium">
        Choose identification details
      </Text>
      <br />
      <Box display="flex">
        {identificationDetails.map((item, index) => (
          <Checkbox mr={5} key={index}>
            <Text fontSize="s3">{item}</Text>
          </Checkbox>
        ))}
      </Box>
      <br />
      <Text fontSize="r1" fontWeight="InterMedium">
        Citizenship
      </Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormInput
          control={control}
          type="number"
          name="citizenshipNo"
          label="Citizenship No"
          placeholder="Citizenship No"
        />
        <FormInput
          control={control}
          type="text"
          name="citizenshipPlaceOfIssue"
          label="Place Of Issue"
          placeholder="Place of Issue"
        />
        <FormInput
          control={control}
          type="date"
          name="citizenshipIssueDate"
          label="Issue date"
          placeholder="DD-MM-YYYY"
        />
      </Grid>
      <br />
      <Text fontSize="r1" fontWeight="InterMedium">
        Driving License
      </Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormInput
          control={control}
          type="number"
          name="divingLicenseNo"
          label="Driving License No"
          placeholder="Driving License No"
        />
        <FormInput
          control={control}
          type="text"
          name="divingLicensePlaceOfIssue"
          label="Place of Issue"
          placeholder="Place of Issue"
        />
        <FormInput
          control={control}
          type="date"
          name="divingLicenseIssuedDate"
          label="Issue Date"
          placeholder="Issue Date"
        />
      </Grid>
      <br />
      <Text fontSize="r1">Voters Card</Text>
      <br />
      <Grid templateColumns="repeat(3, 1fr)" gap={'3em'}>
        <FormInput
          control={control}
          type="number"
          name="voterCardNo"
          label="Voter Card No"
          placeholder="Voter Card No"
        />
        <FormInput
          control={control}
          type="text"
          name="pollingStation"
          label="Polling Station"
          placeholder="Polling Station"
        />
      </Grid>
    </>
  );
};
