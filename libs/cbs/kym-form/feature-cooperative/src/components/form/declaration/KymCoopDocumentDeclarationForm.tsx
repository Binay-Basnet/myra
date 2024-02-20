import { FormSection } from '@myra-ui';

import { FormFileInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopDocumentDeclarationForm = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="kymCoopDOCUMENTDECLARATION" templateColumns={2}>
      <FormFileInput
        size="lg"
        label={t['kymCoopAGMDecisionDocument']}
        name="documents.0.identifiers"
      />

      <FormFileInput
        size="lg"
        label={t['kymCoopRegisteredCertificate']}
        name="documents.1.identifiers"
      />
      <FormFileInput size="lg" label={t['kymCoopMoaAoa']} name="documents.2.identifiers" />
      <FormFileInput size="lg" label={t['kymCoopPANCertificate']} name="documents.3.identifiers" />
      <FormFileInput size="lg" label={t['kymCoopTaxClearance']} name="documents.4.identifiers" />
      <FormFileInput
        size="lg"
        label={t['kymCoopLatestAuditReport']}
        name="documents.5.identifiers"
      />
      <FormFileInput size="lg" label={t['kymCoopLogo']} name="documents.6.identifiers" />
      <FormFileInput
        size="lg"
        label={t['kymCoopMinuteofCentralRep']}
        name="documents.7.identifiers"
      />
    </FormSection>
  );
};
