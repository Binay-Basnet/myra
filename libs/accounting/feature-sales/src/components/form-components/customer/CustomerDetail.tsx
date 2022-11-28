import { Dispatch, SetStateAction } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { FormAddress, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { Box, Button, FormSection, GridItem, Icon } from '@myra-ui';

interface ICustomerDetailProps {
  setShowAdditionalDetails: Dispatch<SetStateAction<boolean>>;
}

export const CustomerDetail = ({ setShowAdditionalDetails }: ICustomerDetailProps) => (
  <Box display="flex" flexDirection="column" gap="s16">
    <FormSection>
      <GridItem colSpan={2}>
        <FormInput name="name" label="Name" />
      </GridItem>

      <FormInput name="code" label="Code" />

      <FormPhoneNumber name="phoneNumber" label="Phone Number" />

      <FormInput name="pan" label="PAN" />
    </FormSection>

    <FormAddress name="address" sectionId="address" sectionHeader="Address" />
    <Button
      id="accountOperatorButton"
      alignSelf="start"
      leftIcon={<Icon size="md" as={AiOutlinePlus} />}
      onClick={() => setShowAdditionalDetails(true)}
      variant="ghost"
      ml="s20"
    >
      Add more details
    </Button>
  </Box>
);
