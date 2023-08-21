import { Box, Text } from '@myra-ui';

import { FormFileInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

interface IProps {
  index: number;
}

export const BottomDocument = ({ index }: IProps) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="s3" fontWeight="500">
        {t['kymInsSpecimenSignature']}
      </Text>
      <Box w="124px" display="flex" flexDirection="column" gap="s4">
        <FormFileInput size="md" name={`accountOperator.${index}.documents.0.identifiers`} />
      </Box>
    </Box>
  );
};
