import { Box, FormSection, Text } from '@myra-ui';

import { FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const Passport = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Text p="s20" pb="0" fontSize="r1" fontWeight="medium" color="neutralColorLight.Gray-70">
        {t['kymIndPassport']}
      </Text>

      <FormSection>
        <FormInput
          isRequired
          type="text"
          name="identification.3.identificationNo"
          label={t['kymIndPassportNo']}
        />

        <FormInput
          isRequired
          type="text"
          name="identification.3.place"
          label={t['kymIndPassportIssuePlace']}
        />

        <FormDatePicker
          isRequired
          name="identification.3.date"
          label={t['kymIndPassportIssueDate']}
          maxToday
        />
      </FormSection>
    </Box>
  );
};
