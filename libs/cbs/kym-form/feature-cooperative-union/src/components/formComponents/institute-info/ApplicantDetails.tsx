import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormInput } from '@coop/myra/components';
import { Grid, Text } from '@coop/shared/ui';

export const ApplicantDetails = () => {
  return (
    <>
      <GroupContainer id="Current Member Details" scrollMarginTop={'200px'}>
        <Text
          fontSize="r1"
          fontWeight="semibold"
          color="neutralColorLight.Gray-80"
        >
          Applicant
        </Text>
        <InputGroupContainer>
          <FormInput
            type="text"
            name="applicantName"
            label="Name"
            placeholder="Enter Name"
          />
          <FormInput
            type="text"
            name="applicantDesignation"
            label="Designation"
            placeholder="Enter Designation"
          />
        </InputGroupContainer>
      </GroupContainer>
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <FormFileInput
          size="md"
          label="Signature"
          // control={control}
          name="applicantSign"
        />
        <FormFileInput
          size="md"
          label="Stamp"
          // control={control}
          name="applicantStamp"
        />
      </Grid>
    </>
  );
};
