import { FaMap } from 'react-icons/fa';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/myra/components';
import { Box, Button, Icon, Text } from '@coop/shared/ui';

export const RegisteredDetailsInstitution = () => {
  return (
    <GroupContainer id="Registered Details" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Registered details
      </Text>
      <InputGroupContainer>
        <FormInput
          // control={control}
          type="text"
          name={'registeredAddress'}
          label="Enter Registered Address"
          placeholder="Enter Registered Address"
        />

        <FormInput
          type="text"
          name="registeredAddressIfChanged"
          label="Registered Address (if changed)"
          placeholder="Registered Address"
        />
        <Box></Box>

        <FormInput
          type="number"
          name="registeredNumber"
          label="Registered Number"
          placeholder="Enter Registered Number"
        />
        <FormInput
          type="text"
          name="issuingOffice"
          label="Issuing Office"
          placeholder="Enter Issuing Office"
        />
        <Box></Box>
        <Box>
          <Button alignSelf="start" leftIcon={<Icon size="md" as={FaMap} />}>
            Pin on Map
          </Button>
        </Box>
      </InputGroupContainer>
    </GroupContainer>
  );
};
