import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect } from '@coop/myra/components';
import { Box, GridItem, Text } from '@coop/shared/ui';

export const BankAccountDetailsInstitution = () => {
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Bank Account Details
      </Text>
      <InputGroupContainer>
        <FormSelect
          name="bank"
          label="Name of Bank"
          placeholder="Select Bank"
          options={[
            { label: 'NIC AISA BANK ', value: 'NICA' },
            { label: 'JYOTI BIKAS BANK LIMITED', value: 'JBBL' },
            { label: 'NIBL BANK ', value: 'NIBL' },
          ]}
        />
        <FormInput
          type="text"
          name="accountNumber"
          label="Account Number"
          placeholder="Enter Account Number"
        />

        <FormInput
          type="text"
          name="accountName"
          label="Account Name"
          placeholder="Enter Account Name"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
