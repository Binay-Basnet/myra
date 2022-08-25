import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { Box, Grid } from '@coop/shared/ui';
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
    <Grid p="s20" templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
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
    </Grid>
  );
};
