import { Box, FormSection, Text } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const VoterCard = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Text p="s20" pb="0" fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
        {t['kymIndVoterCard']}
      </Text>

      <FormSection>
        <FormInput
          isRequired
          type="text"
          name="identification.4.identificationNo"
          label={t['kymIndVoterCardNo']}
        />
        <FormInput
          isRequired
          type="text"
          name="identification.4.place"
          label={t['kymIndVoterCardPollingStation']}
        />
      </FormSection>
    </Box>
  );
};
