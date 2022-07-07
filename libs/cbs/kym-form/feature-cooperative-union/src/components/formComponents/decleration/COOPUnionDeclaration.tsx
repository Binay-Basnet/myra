import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/shared/form';
import { Box, Checkbox, Grid, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const DocumentDeclarationInstitutionCOOPUnion = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      id="kymCoopUnionAccDocumentsDeclaration"
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopUnionDecDocumentsDeclaration']}
      </Text>
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
        <FormFileInput
          name="documents"
          label={t['kymCoopUnionDecAGMDecisionDocument']}
          size="lg"
        />
        <FormFileInput
          name="documents"
          label={t['kymCoopUnionDecRegisteredCertificate']}
          size="lg"
        />
        <FormFileInput
          name="documents"
          label={t['kymCoopUnionDecMOAAOA']}
          size="lg"
        />
        <FormFileInput
          name="documents"
          label={t['kymCoopUnionDecPANCertificate']}
          size="lg"
        />
        <FormFileInput
          name="documents"
          label={t['kymCoopUnionDecTaxClearance']}
          size="lg"
        />
        <FormFileInput
          name="documents"
          label={t['kymCoopUnionDecLatestAuditReport']}
          size="lg"
        />
        <FormFileInput name="documents" label="Logo" size="lg" />
        <FormFileInput
          name="documents"
          label={t['kymCoopUnionDecMinuteofCentralRep']}
          size="lg"
        />
      </Grid>
      <Box
        display="flex"
        gap="s16"
        alignItems="start"
        id="kymCoopUnionAccAccountHolderDeclaration"
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
