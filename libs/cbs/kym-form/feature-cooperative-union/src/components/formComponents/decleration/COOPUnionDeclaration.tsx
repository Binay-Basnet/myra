import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/shared/form';
import { Box, Checkbox, Grid, Text, TextFields } from '@coop/shared/ui';

export const DocumentDeclarationInstitutionCOOPUnion = () => {
  return (
    <GroupContainer id="Documents Declaration" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Documents Declaration
      </Text>
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
        <FormFileInput
          name="documents"
          label="AGM Decision Document"
          size="lg"
        />
        <FormFileInput
          name="documents"
          label="Registered Certificate"
          size="lg"
        />
        <FormFileInput name="documents" label="MOA/AOA" size="lg" />
        <FormFileInput name="documents" label="PAN Certificate" size="lg" />
        <FormFileInput name="documents" label="Tax Clearance" size="lg" />
        <FormFileInput name="documents" label="Latest Audit Report" size="lg" />
        <FormFileInput name="documents" label="Logo" size="lg" />
        <FormFileInput
          name="documents"
          label="Minute of Central Rep"
          size="lg"
        />
      </Grid>
      <Box
        display="flex"
        gap="s16"
        alignItems="start"
        id="Account Holder Declaration"
        scrollMarginTop={'200px'}
      >
        <Checkbox fontSize="s3" id="weAgree" mt="2px">
          {''}
        </Checkbox>
        <TextFields variant="formInput">
          I/We agree to the Terms and condition
        </TextFields>
      </Box>
    </GroupContainer>
  );
};
