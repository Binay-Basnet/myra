import { FormSection } from '@myra-ui';

import { FormFileInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const KYMDocumentDeclaration = () => {
  const { t } = useTranslation();
  return (
    <FormSection header="kymIndDocumentDeclaration" templateColumns={2}>
      <FormFileInput
        name="documents.0.identifiers"
        label={t['kymIndDocumentDeclarationPassportSizePhoto']}
      />
      <FormFileInput
        name="documents.1.identifiers"
        label={t['kymIndDocumentDeclarationSignature']}
      />
      <FormFileInput
        name="documents.2.identifiers"
        label={t['kymIndDocumentDeclarationCitizenshipPhoto']}
      />
      <FormFileInput
        name="documents.3.identifiers"
        label={t['kymIndDocumentDeclarationFingerprintPhoto']}
      />
    </FormSection>
  );
};
