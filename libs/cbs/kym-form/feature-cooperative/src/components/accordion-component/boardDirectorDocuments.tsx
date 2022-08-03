import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { Box, Grid } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionInstitution } from '@coop/shared/utils';

interface IKYMDocumentDeclarationProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}
export const Bottomdirectorcoop = ({
  setKymCurrentSection,
}: IKYMDocumentDeclarationProps) => {
  const { t } = useTranslation();
  return (
    <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
      <KYMDocumentField
        label={t['kymCoopPhotograph']}
        // control={control}
        name={`photograph`}
        getKymSection={getKymSectionInstitution}
        setKymCurrentSection={setKymCurrentSection}
      />
      <KYMDocumentField
        size="lg"
        label={t['kymCoopPhotographOfIdentityProofDocument']}
        // control={control}
        name={`identityDocumentPhoto`}
        getKymSection={getKymSectionInstitution}
        setKymCurrentSection={setKymCurrentSection}
      />

      <Box w="124px">
        <KYMDocumentField
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
