import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { Box, FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionInstitution } from '@coop/shared/utils';

interface IKYMDocumentDeclarationProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  directorId: string;
}

export const Bottomdirectorcoop = ({
  setKymCurrentSection,
  directorId,
}: IKYMDocumentDeclarationProps) => {
  const { t } = useTranslation();
  return (
    <FormSection gridLayout={true} templateColumns={2}>
      <KYMDocumentField
        mutationId={directorId}
        label={t['kymCoopPhotograph']}
        // control={control}
        name={`photograph`}
        getKymSection={getKymSectionInstitution}
        setKymCurrentSection={setKymCurrentSection}
      />
      <KYMDocumentField
        mutationId={directorId}
        size="lg"
        label={t['kymCoopPhotographOfIdentityProofDocument']}
        // control={control}
        name={`identityDocumentPhoto`}
        getKymSection={getKymSectionInstitution}
        setKymCurrentSection={setKymCurrentSection}
      />
      <Box w="124px">
        <KYMDocumentField
          mutationId={directorId}
          size="md"
          label={t['kymCoopSignature']}
          // control={control}
          name={`signature`}
          getKymSection={getKymSectionInstitution}
          setKymCurrentSection={setKymCurrentSection}
        />
      </Box>
    </FormSection>
  );
};
