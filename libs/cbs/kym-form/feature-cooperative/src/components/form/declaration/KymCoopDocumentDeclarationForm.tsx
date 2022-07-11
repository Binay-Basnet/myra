import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput } from '@coop/shared/form';
import { Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopDocumentDeclarationForm = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="Document Declaration">
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopDOCUMENTDECLARATION']}
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <FormFileInput
          size="lg"
          label={t['kymCoopAGMDecisionDocument']}
          name="passportSizePhoto"
        />
        <FormFileInput
          size="lg"
          label={t['kymCoopRegisteredCertificate']}
          name="signaturePhoto"
        />
        <FormFileInput size="lg" label="MOA/AOA" name="citizenshipPhoto" />
        <FormFileInput
          size="lg"
          label={t['kymCoopPANCertificate']}
          name="fingerprintPhoto"
        />

        <FormFileInput
          size="lg"
          label={t['kymCoopTaxClearance']}
          name="citizenshipPhoto"
        />

        <FormFileInput
          size="lg"
          label={t['kymCoopLatestAuditReport']}
          name="citizenshipPhoto"
        />

        <FormFileInput
          size="lg"
          label={t['kymCoopLogo']}
          name="citizenshipPhoto"
        />

        <FormFileInput
          size="lg"
          label={t['kymCoopMinuteofCentralRep']}
          name="citizenshipPhoto"
        />
      </Grid>
    </GroupContainer>
  );
};
