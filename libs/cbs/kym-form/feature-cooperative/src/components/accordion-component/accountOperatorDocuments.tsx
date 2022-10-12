import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { Box, FormSection } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IKYMDocumentDeclarationProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  accountId: string;
}

export const BottomOperatorCoop = ({
  setKymCurrentSection,
  accountId,
}: IKYMDocumentDeclarationProps) => {
  const { t } = useTranslation();
  return (
    <FormSection templateColumns={2}>
      <KYMDocumentField
        mutationId={accountId}
        label={t['kymCoopPhotograph']}
        name="photograph"
        getKymSection={getKymSectionInstitution}
        setKymCurrentSection={setKymCurrentSection}
      />
      <KYMDocumentField
        mutationId={accountId}
        size="lg"
        label={t['kymCoopPhotographOfIdentityProofDocument']}
        name="identityDocumentPhoto"
        getKymSection={getKymSectionInstitution}
        setKymCurrentSection={setKymCurrentSection}
      />
      <Box w="124px">
        <KYMDocumentField
          mutationId={accountId}
          size="md"
          label={t['kymCoopSignature']}
          name="signature"
          getKymSection={getKymSectionInstitution}
          setKymCurrentSection={setKymCurrentSection}
        />
      </Box>
    </FormSection>
  );
};
