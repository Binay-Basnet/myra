import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/myra/components';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';

export const DocumentDeclarationInstitution = () => {
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Documents Declaration
      </Text>
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
        <FormFileInput
          name="cooperativeDocuments0"
          label="AGM Decision Document"
          size="lg"
        />
        <FormFileInput
          name="cooperativeDocuments0"
          label="Registered Certificate"
          size="lg"
        />
        <FormFileInput name="cooperativeDocuments0" label="MOA/AOA" size="lg" />
        <FormFileInput
          name="cooperativeDocuments0"
          label="PAN Certificate"
          size="lg"
        />
        <FormFileInput
          name="cooperativeDocuments0"
          label="Tax Clearance"
          size="lg"
        />
        <FormFileInput
          name="cooperativeDocuments0"
          label="Latest Audit Report"
          size="lg"
        />
      </Grid>
    </GroupContainer>
  );
};
