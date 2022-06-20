import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/shared/form';
import { GridItem, Text } from '@coop/shared/ui';

export const InstituteBasicInfo = () => {
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
            name="nameOfInstitution"
            label="Name of Institution"
            placeholder="Name of Institution"
          />
        </GridItem>
        <FormSelect
          name="institutionType"
          label="Institution Type"
          placeholder="Select Organization Type"
          options={[
            { label: 'Banking', value: 'Male' },
            { label: 'NGO', value: 'Female' },
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
          name="regdDate"
          label="Registration Date"
          placeholder="DD-MM-YYYY"
        />
        <FormInput
          type="number"
          name="vatOrPan"
          label="VAT/Pan No."
          placeholder="Enter VAT/Pan No"
        />
        <FormInput
          type="text"
          name="oprOfficeAddress"
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
