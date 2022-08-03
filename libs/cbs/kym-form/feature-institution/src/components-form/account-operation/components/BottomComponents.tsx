import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { Box, Grid, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';
interface IProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}
export const BottomDocument = ({ setKymCurrentSection }: IProps) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection={'column'} gap="s4">
      <Text fontSize={'s3'} fontWeight="500">
        {t['kymInsSpecimenSignature']}
      </Text>
      <Box w="124px" display="flex" flexDirection={'column'} gap="s4">
        <KYMDocumentField
<<<<<<< HEAD
          name="specimenSignature"
          size="md"
=======
          label="Fingerprint Photo"
          name="specimenSignature"
>>>>>>> b2bc565a1fb9f0f5b30402960dc62270711b3d6e
          setKymCurrentSection={setKymCurrentSection}
          getKymSection={getKymSectionInstitution}
        />
      </Box>
    </Box>
  );
};
