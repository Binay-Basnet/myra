import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/myra/components';
import { Box, GridItem, Text } from '@coop/shared/ui';

export const BasicDetailsInstitution = () => {
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Basic Information
      </Text>
      <InputGroupContainer>
        <GridItem colSpan={2}>
          <FormInput
            // control={control}
            type="text"
            name={'institutionName'}
            label="Name of Institution"
            placeholder="Name of Institution"
          />
        </GridItem>
        <FormSelect
          name="institutionType"
          label="Organization Type"
          placeholder="Select Organization Type"
          options={[
            { label: 'Banking', value: 'Male' },
            { label: 'Ngo', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ]}
        />
        <FormInput
          type="text"
          name="natureOfBusiness"
          label="Nature of Business"
          placeholder="Nature of Business"
        />

        <FormInput
          type="date"
          name="registrationDate"
          label="Registration Date"
          placeholder="DD-MM-YYYY"
        />
        <FormInput
          type="number"
          name="vatOrPanNo"
          label="VAT/Pan No."
          placeholder="Enter VAT/Pan No"
        />
        <FormInput
          type="text"
          name="operatingOfficeAddress"
          label="Operating Office Address"
          placeholder="Enter Address"
        />

        <FormInput
          type="text"
          name="noOfBranches"
          label="No of Branches"
          placeholder="Enter No of Branches"
        />

        <FormInput
          type="text"
          name="branchOfficeAddress"
          label="Branch Office Address"
          placeholder="Branch Office Address"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
