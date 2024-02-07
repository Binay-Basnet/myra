import { Box, FormSection, Text } from '@myra-ui';

import { FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const Citizenship = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Text fontSize="r1" p="s20" pb="0" fontWeight="medium" color="neutralColorLight.Gray-70">
        {t['kymIndCitizenship']}
      </Text>

      <FormSection>
        <FormInput
          isRequired
          type="text"
          name="identification.0.identificationNo"
          label={t['kymIndCitizenshipNo']}
        />

        <FormInput
          isRequired
          type="text"
          name="identification.0.place"
          label={t['kymIndCitizenshipIssuePlace']}
        />

        <FormDatePicker
          isRequired
          name="identification.0.date"
          label={t['kymIndCitizenshipIssueDate']}
          maxToday
        />
      </FormSection>
    </Box>
  );
};
