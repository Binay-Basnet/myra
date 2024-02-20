import { Box, FormSection, Text } from '@myra-ui';

import { FormCheckbox, FormFileInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const DocumentDeclarationInstitutionCOOPUnion = () => {
  const { t } = useTranslation();

  // const methods = useForm<CoopUnionInstitutionInformationInput>();

  // useCoopUnionInstitution({ methods });

  return (
    <FormSection
      templateColumns={2}
      id="kymCoopUnionAccDocumentsDeclaration"
      header="kymCoopUnionDecDocumentsDeclaration"
    >
      <FormFileInput
        name="documents.2.identifiers"
        label={t['kymCoopUnionDecAGMDecisionDocument']}
      />
      <FormFileInput
        name="documents.3.identifiers"
        label={t['kymCoopUnionDecRegisteredCertificate']}
      />
      <FormFileInput name="documents.4.identifiers" label={t['kymCoopUnionDecMOAAOA']} />
      <FormFileInput name="documents.5.identifiers" label={t['kymCoopUnionDecPANCertificate']} />
      <FormFileInput name="documents.6.identifiers" label={t['kymCoopUnionDecTaxClearance']} />
      <FormFileInput name="documents.7.identifiers" label={t['kymCoopUnionDecLatestAuditReport']} />
      <FormFileInput name="documents.8.identifiers" label={t['kymCoopUnionDecLogo']} />
      <FormFileInput
        name="documents.9.identifiers"
        label={t['kymCoopUnionDecMinuteofCentralRep']}
      />

      <Box
        display="flex"
        gap="s16"
        alignItems="start"
        id="kymCoopUnionAccAccountHolderDeclaration"
        scrollMarginTop="200px"
      >
        <Box p="s20" display="flex" gap="s16" alignItems="center">
          <FormCheckbox name="declarationAgreement" fontSize="s3" />
          <Text variant="formInput" mt="-6px">
            {t['kymIndAgree']}&nbsp;
            <Text as="span" variant="link">
              {t['kymIndAgreeLink']}
            </Text>
          </Text>
        </Box>
      </Box>
    </FormSection>
  );
};
