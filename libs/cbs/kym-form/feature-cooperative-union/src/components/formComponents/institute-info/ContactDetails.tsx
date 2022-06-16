import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormEmailInput,
  FormInput,
  FormPhoneNumber,
} from '@coop/myra/components';
import { Box, Text } from '@coop/shared/ui';

export const ContactDetails = () => {
  return (
    <GroupContainer id="Contact Details" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Contact Details
      </Text>
      <InputGroupContainer>
        <FormPhoneNumber
          // control={control}

          name="phone"
          label="Phone"
          placeholder="Enter Phone Number"
        />

        <FormInput
          type="number"
          name="fax"
          label="Fax"
          placeholder="Enter Fax"
        />

        <FormEmailInput
          name="contactEmail"
          label="Email"
          placeholder="Enter Email Address"
        />

        <FormInput
          type="text"
          name="website"
          label="Website Link (if any)"
          placeholder="Enter Website URL"
        />

        <FormInput
          type="number"
          name="postBoxNo"
          label="Post Box. No. "
          placeholder="Enter Post Box No"
        />
        <Box></Box>
        <Box mt="44px">
          <FormInput
            type="number"
            name="noOfEmployees"
            label="Number of Employees"
            placeholder="Enter Number of Employees"
          />
        </Box>
        <Box mt="44px">
          <FormInput
            type="date"
            name="lastAgmDate"
            label="AGM Details (Date of Last AGM)"
            placeholder="DD-MM-YYYY"
          />
        </Box>
      </InputGroupContainer>
    </GroupContainer>
  );
};
