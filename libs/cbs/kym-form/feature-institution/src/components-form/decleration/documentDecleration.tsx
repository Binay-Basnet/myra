import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const DocumentDeclarationInstitution = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="Documents Declaration" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsDocumentsDeclaration']}
      </Text>
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
        <FormFileInput
          name="cooperativeDocuments"
          label={t['kymInsAGMDecisionDocument']}
          size="lg"
        />
        <FormFileInput
          name="cooperativeDocuments"
          label={t['kymInsRegisteredCertificate']}
          size="lg"
        />
        <FormFileInput name="cooperativeDocuments0" label="MOA/AOA" size="lg" />
        <FormFileInput
          name="cooperativeDocuments"
          label={t['kymInsPANCertificate']}
          size="lg"
        />
        <FormFileInput
          name="cooperativeDocuments"
          label={t['kymInsTaxClearance']}
          size="lg"
        />
        <FormFileInput
          name="cooperativeDocuments"
          label={t['kymInsLatestAuditReport']}
          size="lg"
        />
      </Grid>
    </GroupContainer>
  );
};
