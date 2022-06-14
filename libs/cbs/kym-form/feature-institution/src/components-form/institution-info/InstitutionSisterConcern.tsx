import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/myra/components';
import { Box, GridItem, Text } from '@coop/shared/ui';

export const DetailsOfSisterConcern = () => {
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Details of sister concern{' '}
      </Text>
      <InputGroupContainer>
        <GridItem colSpan={2}>
          <FormInput
            // control={control}
            type="text"
            name={'name'}
            label="Name of Institution"
            placeholder="Name of Institution"
          />
        </GridItem>
        <FormSelect
          name="organizationType"
          label="Organization Type"
          placeholder="Select Organization Type"
          options={[
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' },
          ]}
        />
        <FormInput
          type="text"
          name="Nature of Business"
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
          type="text"
          name="vatNo"
          label="VAT/Pan No."
          placeholder="Enter VAT/Pan No"
        />
        <FormInput
          type="text"
          name="operatingofficeAddress"
          label="Operating Office Address"
          placeholder="Enter Address"
        />

        <FormInput
          type="text"
          name="branchesNo"
          label="No of Branches"
          placeholder="Enter No of Branches"
        />

        <FormInput
          type="text"
          name="branchesAddress"
          label="Branch Office Address"
          placeholder="Branch Office Address"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
