import { Box, FormSection, Text } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const NationalID = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Text p="s20" pb="0" fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
        {t['kymIndNationalID']}
      </Text>

      <FormSection>
        <FormInput
          isRequired
          type="text"
          name="identification.2.identificationNo"
          label={t['kymIndNationalIDNo']}
        />
      </FormSection>
    </Box>
  );
};
