import React from 'react';
import { Box, Checkbox, Grid, Text } from '@saccos/myra/ui';

import { GroupContainer } from '../containers';
import { FormInput } from '../../newFormComponents';

const identificationDetails = [
  'Citizenship',
  'Driving License',
  'Passport',
  'Voters Card',
  'National ID',
];

export const MemberKYMIdentificationDetails = ({ control }: any) => {
  return (
    <GroupContainer>
      <Text fontSize="r1" fontWeight="semibold">
        IDENTIFICATION DETAILS
      </Text>
      <Text fontSize="r1" fontWeight="medium">
        Choose identification details
      </Text>
      <Box display="flex">
        {identificationDetails.map((item, index) => (
          <Checkbox mr={5} key={index}>
            <Text fontSize="s3">{item}</Text>
          </Checkbox>
        ))}
      </Box>

      <GroupContainer>
        <Box display="flex" flexDirection="column" gap="s24">
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
        <Box display="flex" flexDirection="column" gap="s24">
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
        <Box display="flex" flexDirection="column" gap="s24">
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
      </GroupContainer>
    </GroupContainer>
  );
};
