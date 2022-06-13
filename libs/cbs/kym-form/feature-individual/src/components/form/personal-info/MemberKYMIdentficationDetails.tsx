import React, { useState } from 'react';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';
import { Box, Checkbox, Grid, Text } from '@coop/shared/ui';

const identificationDetails = [
  'Citizenship',
  'Driving License',
  'Passport',
  'Voters Card',
  'National ID',
];

export const MemberKYMIdentificationDetails = ({ control }: any) => {
  const [currentShownDetails, setCurrentDetailsShown] = useState<string[]>([]);

  return (
    <GroupContainer id="Identification Details" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="semibold">
        IDENTIFICATION DETAILS
      </Text>
      <Text fontSize="r1" fontWeight="medium">
        Choose identification details
      </Text>
      <Box display="flex">
        {identificationDetails.map((item, index) => (
          <Checkbox
            id="identificationDetailsPersonal"
            mr={5}
            key={index}
            onChange={() => {
              if (currentShownDetails.includes(item)) {
                setCurrentDetailsShown((prev) =>
                  prev.filter((data) => data !== item)
                );
              } else {
                setCurrentDetailsShown((prev) => [...prev, item]);
              }
            }}
          >
            <Text fontSize="s3">{item}</Text>
          </Checkbox>
        ))}
      </Box>

      <GroupContainer>
        {currentShownDetails.includes('Citizenship') && (
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
        )}
        {currentShownDetails.includes('Driving License') && (
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
        )}

        {currentShownDetails.includes('Passport') && (
          <Box display="flex" flexDirection="column" gap="s24">
            <Text
              fontSize="r1"
              fontWeight="medium"
              color="neutralColorLight.Gray-70"
            >
              Passport
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap="s20">
              <FormInput
                control={control}
                type="number"
                name="passportNumber"
                label="Passport Number"
                placeholder="Passport Number"
              />
              <FormInput
                control={control}
                type="text"
                name="passportPlaceOfIssue"
                label="Place of Issue"
                placeholder="Place of Issue"
              />
              <FormInput
                control={control}
                type="date"
                name="passportIssueDate"
                label="Issue Date"
                placeholder="Issue Date"
              />
            </Grid>
          </Box>
        )}

        {currentShownDetails.includes('Voters Card') && (
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
        )}

        {currentShownDetails.includes('National ID') && (
          <Box display="flex" flexDirection="column" gap="s24">
            <Text
              fontSize="r1"
              fontWeight="medium"
              color="neutralColorLight.Gray-70"
            >
              National Id
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap="s20">
              <FormInput
                control={control}
                type="number"
                name="nationalId"
                label="National Id"
                placeholder="National Id"
              />
            </Grid>
          </Box>
        )}
      </GroupContainer>
    </GroupContainer>
  );
};
