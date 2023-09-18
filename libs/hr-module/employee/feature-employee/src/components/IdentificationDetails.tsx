import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem, Text } from '@myra-ui';

import { FormCheckboxGroup, FormDatePicker, FormInput } from '@coop/shared/form';

export const IdentificationDetails = () => {
  const { watch } = useFormContext();
  const identificationOptions = [
    { value: 'citizenship', label: 'Citizenship' },
    { value: 'drivingLicense', label: 'Driving License' },
  ];
  const identificationSelectionWatch = watch('identificationSelection');

  return (
    <FormSection
      header="Identification Details"
      subHeader="Choose Identification Details"
      id="Identification Details"
    >
      <GridItem colSpan={3} mt="none">
        <Box display="flex">
          <FormCheckboxGroup
            name="identificationSelection"
            showOther={false}
            list={identificationOptions}
          />
        </Box>
      </GridItem>

      {identificationSelectionWatch?.includes('citizenship') && (
        <>
          {' '}
          <GridItem colSpan={3} mt="s20">
            <Text fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
              Citizenship
            </Text>
          </GridItem>
          <FormInput isRequired type="text" name="citizenship.id" label="Citizenship No" />
          <FormInput
            isRequired
            type="text"
            name="citizenship.placeOfIssue"
            label="Place of Issue"
          />
          <FormDatePicker isRequired name="citizenship.issuedDate" label="Issued Date" maxToday />
        </>
      )}

      {identificationSelectionWatch?.includes('drivingLicense') && (
        <>
          {' '}
          <GridItem colSpan={3} mt="s20">
            <Text fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
              Driving License
            </Text>
          </GridItem>
          <FormInput
            isRequired
            type="text"
            name="drivingLicense.id"
            label="Driving License Number"
          />
          <FormInput
            isRequired
            type="text"
            name="drivingLicense.placeOfIssue"
            label="Place of Issue"
          />
          <FormDatePicker
            isRequired
            name="drivingLicense.issuedDate"
            label="Issued Date"
            maxToday
          />
        </>
      )}
    </FormSection>
  );
};

export default IdentificationDetails;
