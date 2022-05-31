import React from 'react';
import { Box, Checkbox, Grid, Text } from '../../../ui/src';

import { FormInput } from '../../newFormComponents';

const identificationDetails = [
  'Citizenship',
  'Driving License',
  'Passport',
  'Voters Card',
  'National ID',
];

export const MemberIdentificationDetails = ({ control }) => {
  return (
    <>
      <Text fontSize="r1" fontWeight="semibold" mb="s32">
        IDENTIFICATION DETAILS
      </Text>
      <Text fontSize="r1" fontWeight="medium" mb="s32">
        Choose identification details
      </Text>
      <Box display="flex" mb="s32">
        {identificationDetails.map((item, index) => (
          <Checkbox mr={5} key={index}>
            <Text fontSize="s3">{item}</Text>
          </Checkbox>
        ))}
      </Box>

      <Box display="flex" flexDirection="column" gap="s32">
        <Box display="flex" flexDirection="column" gap="s20">
          <Text
            fontSize="r1"
            fontWeight="medium"
            color="neutralColorLight.Gray-70"
          >
            Citizenship
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap="s20">
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
        </Box>
        <Box display="flex" flexDirection="column" gap="s20">
          <Text
            fontSize="r1"
            fontWeight="medium"
            color="neutralColorLight.Gray-70"
          >
            Driving License
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap="s20">
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
        </Box>
        <Box display="flex" flexDirection="column" gap="s20">
          <Text
            fontSize="r1"
            fontWeight="medium"
            color="neutralColorLight.Gray-70"
          >
            Voters Card
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap="s20">
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
        </Box>
      </Box>
    </>
  );
};
