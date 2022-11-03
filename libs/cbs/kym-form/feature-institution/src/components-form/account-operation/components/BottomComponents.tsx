import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { Box, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
  accountId: string;
}

export const BottomDocument = ({ setKymCurrentSection, accountId }: IProps) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="s3" fontWeight="500">
        {t['kymInsSpecimenSignature']}
      </Text>
      <Box w="124px" display="flex" flexDirection="column" gap="s4">
        <KYMDocumentField
          size="md"
          mutationId={accountId}
          name="specimenSignature"
          setKymCurrentSection={setKymCurrentSection}
          getKymSection={getKymSectionInstitution}
        />
      </Box>
    </Box>
  );
};
