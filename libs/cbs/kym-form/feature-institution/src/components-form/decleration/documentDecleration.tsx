import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';

export const DocumentDeclarationInstitution = () => {
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
          name="cooperativeDocuments"
          label="AGM Decision Document"
          size="lg"
        />
        <FormFileInput
          name="cooperativeDocuments"
          label="Registered Certificate"
          size="lg"
        />
        <FormFileInput name="cooperativeDocuments0" label="MOA/AOA" size="lg" />
        <FormFileInput
          name="cooperativeDocuments"
          label="PAN Certificate"
          size="lg"
        />
        <FormFileInput
          name="cooperativeDocuments"
          label="Tax Clearance"
          size="lg"
        />
        <FormFileInput
          name="cooperativeDocuments"
          label="Latest Audit Report"
          size="lg"
        />
      </Grid>
    </GroupContainer>
  );
};
