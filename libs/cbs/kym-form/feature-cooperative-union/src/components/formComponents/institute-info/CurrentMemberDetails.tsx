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

export const CurrentMemberDetails = () => {
  return (
    <GroupContainer id="Current Member Details" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Current Members
      </Text>
      <InputGroupContainer>
        <FormInput
          type="number"
          name="noOfMaleMember"
          label="No. of Male members"
          placeholder="Enter no of Male Members"
        />
        <FormInput
          type="number"
          name="noOfFemaleMember"
          label="No. of Female members"
          placeholder="Enter no of Female Members"
        />
        <FormInput
          type="number"
          name="noOfInstitutionalMember"
          label="No. of Institutional members"
          placeholder="Enter no of Institutuional Members"
        />
        <FormInput
          type="number"
          name="totalCurrentMmeber"
          label="Total current members"
          placeholder="Enter total current members"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
